const connection = require('../config/database');

const Model_Keahlian = {
  getAll: async function() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM keahlian', (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  getById: async function(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM keahlian WHERE PK_id_keahlian = ?', [id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  store: async function(data) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO keahlian SET ?', data, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  update: async function(id, data) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE keahlian SET ? WHERE PK_id_keahlian = ?', [data, id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  delete: async function(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM keahlian WHERE PK_id_keahlian = ?', [id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }
};

module.exports = Model_Keahlian;
