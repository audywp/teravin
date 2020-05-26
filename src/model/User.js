const db = require('../utils/database')
const mysql = require('mysql')

const queryPromise = (sql, data) => {
  return new Promise((resolve, reject) => {
    const res = db.query(sql, data, (err, results, fields) => {
      if (err) {
        reject(err)
      }
      resolve({ results, fields })
    })
    console.log(res.sql)
  })
}

module.exports = {
  getAllUser: (conditions = {}) => {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'id', value: 1 } // => value 0 untuk descending, dan 1 untuk ascending
    search = search || { key: 'name', value: '' }
    const query = `SELECT * FROM users WHERE ${search.key} LIKE '%${search.value}%'
                    ORDER BY ${sort.key} ${parseInt(sort.value) ? 'ASC' : 'DESC'}
                    LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`

    return new Promise((resolve, reject) => {
      db.query(query, (err, results, fields) => {
        if (err) reject(err)
        else resolve(results)
      })
    })
  },
  countUser: (conditions = {}) => {
    let { search } = conditions
    search = search || { key: 'name', value: '' }
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT (*) AS total FROM users
                      WHERE ${search.key} LIKE '%${search.value}%'`
      console.log(query)
      db.query(query, (err, results, fields) => {
        console.log(results[0].total)
        if (err) reject(err)
        else resolve(results[0].total)
      })
    })
  },
  createDataUser: (name, phone, email, address) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO users (name, phone, email, address)
                      VALUES ('${name}', '${phone}', '${email}', '${address}')`

      db.query(query, (err, results, fields) => {
        if (err) reject(err)
        else resolve(results.insertId)
      })
    })
  },
  UpdateDataUser: (id, name, phone, email, address) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE users SET name='${name}', phone='${phone}', email='${email}', address='${address}', deleted_at = ${null}
                      WHERE id=${id}`

      db.query(query, (err, results, fields) => {
        if (err) {
          reject(err)
        } else {
          if (results.affectedRows) {
            resolve(results.affectedRows)
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  DeleteDataUser: (id) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE users SET name = ${null}, phone = ${null}, email = ${null}, address = ${null}
                      WHERE id=${id}`

      db.query(query, (err, results, fields) => {
        if (err) {
          reject(err)
        } else {
          if (results.affectedRows) {
            resolve(results.affectedRows)
          } else {
            resolve(false)
          }
        }
      })
    })
  }
}