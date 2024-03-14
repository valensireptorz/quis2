const connection = require('../config/database');

const Model_Pendidikan = {
  getAll: async function() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Pendidikan', (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  getById: async function(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Pendidikan WHERE id_pendidikan = ?', [id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  store: async function(data) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO Pendidikan SET ?', data, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  update: async function(id, data) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE Pendidikan SET ? WHERE id_pendidikan = ?', [data, id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  delete: async function(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM Pendidikan WHERE id_pendidikan = ?', [id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }
};

module.exports = Model_Pendidikan;
