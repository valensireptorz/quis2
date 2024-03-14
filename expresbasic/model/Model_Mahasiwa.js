const connection = require('../config/database');

const Model_Mahasiswa = {
  getAll: async function() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Mahasiswa', (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  getById: async function(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Mahasiswa WHERE id_mahasiswa = ?', [id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  store: async function(data) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO Mahasiswa SET ?', data, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  update: async function(id, data) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE Mahasiswa SET ? WHERE id_mahasiswa = ?', [data, id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  delete: async function(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM Mahasiswa WHERE id_mahasiswa = ?', [id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }
};

module.exports = Model_Mahasiswa;
