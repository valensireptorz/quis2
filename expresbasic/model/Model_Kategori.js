const connection = require('../config/database');

class Model_Kategori {

    static async getAll() {
        return new Promise((resolve, reject) => {
          connection.query('SELECT * FROM kategori ORDER BY id_kategori DESC', (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
      }
    
      static async store(data) {
        return new Promise((resolve, reject) => {
          connection.query('INSERT INTO kategori SET ?', data, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }
      
      static async getId(id) {
        return new Promise((resolve, reject) => {
          connection.query('SELECT * FROM kategori WHERE id_kategori = ' + id, (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
      }
    
      static async update(id, data) {
        return new Promise((resolve, reject) => {
          connection.query('UPDATE kategori SET ? WHERE id_kategori = ' + id, data, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }
    
      static async delete(id) {
        return new Promise((resolve, reject) => {
          connection.query('DELETE FROM kategori WHERE id_kategori =' + id, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }
}


module.exports = Model_Kategori;