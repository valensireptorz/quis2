const express = require('express');
const router = express.Router();
const modelKapal = require('../model/Model_Kapal');

router.get('/', async (req, res, next) => {
  try {
    let rows = await modelKapal.getAllDPI();
    res.render('dpi/index', { data: rows });
  } catch (error) {
    next(error);
  }
});

router.get('/create', async (req, res, next) => {
  try {
    res.render('dpi/create', {
      nama_dpi: "",
      luas: ""
    });
  } catch (error) {
    next(error);
  }
});

router.post('/store', async (req, res, next) => {
  try {
    const { nama_dpi, luas } = req.body;
    const data = { nama_dpi, luas };

    await modelKapal.storeDPI(data);

    req.flash('success', 'Berhasil menyimpan data');
    res.redirect('/kapal/dpi');
  } catch (error) {
    req.flash('error', 'Gagal menyimpan data');
    res.redirect('/kapal/dpi');
  }
});

module.exports = router;
