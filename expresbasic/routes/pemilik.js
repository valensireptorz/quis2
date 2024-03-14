const express = require('express');
const router = express.Router();
const modelKapal = require('../model/Model_Kapal');

router.get('/', async (req, res, next) => {
  try {
    let rows = await modelKapal.getAllPemilik();
    res.render('pemilik/index', { data: rows });
  } catch (error) {
    next(error);
  }
});

router.get('/create', async (req, res, next) => {
  try {
    res.render('pemilik/create', {
      nama_pemilik: "",
      alamat: "",
      no_hp: ""
    });
  } catch (error) {
    next(error);
  }
});

router.post('/store', async (req, res, next) => {
  try {
    const { nama_pemilik, alamat, no_hp } = req.body;
    const data = { nama_pemilik, alamat, no_hp };

    await modelKapal.storePemilik(data);

    req.flash('success', 'Berhasil menyimpan data');
    res.redirect('/kapal/pemilik');
  } catch (error) {
    req.flash('error', 'Gagal menyimpan data');
    res.redirect('/kapal/pemilik');
  }
});

module.exports = router;
