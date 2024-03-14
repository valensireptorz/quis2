const express = require('express');
const router = express.Router();
const Model_AlatTangkap = require('../model/Model_Alat_Tangkap');

router.get('/', async (req, res, next) => {
  try {
    let rows = await Model_AlatTangkap.getAll();
    res.render('alat_tangkap/index', { data: rows });
  } catch (error) {
    next(error);
  }
});

router.get("/create", async (req, res, next) => {
  try {
    // Render create form
    res.render("alat_tangkap/create");
  } catch (error) {
    next(error);
  }
});

router.post('/store', async (req, res, next) => {
  try {
    const data = req.body;
    await Model_AlatTangkap.store(data);
    req.flash('success', 'Berhasil menyimpan data');
    res.redirect('/alat_tangkap');
  } catch (error) {
    req.flash('error', 'Gagal menyimpan data');
    res.redirect('/alat_tangkap');
  }
});

router.get('/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const row = await Model_AlatTangkap.getById(id);
    res.render('alat_tangkap/edit', { data: row });
  } catch (error) {
    next(error);
  }
});

router.post('/update/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await Model_AlatTangkap.update(id, data);
    req.flash('success', 'Berhasil menyimpan data');
    res.redirect('/alat_tangkap');
  } catch (error) {
    req.flash('error', 'Gagal menyimpan data');
    res.redirect('/alat_tangkap');
  }
});

router.get('/delete/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Model_AlatTangkap.delete(id);
    req.flash('success', 'Berhasil menghapus data');
    res.redirect('/alat_tangkap');
  } catch (error) {
    req.flash('error', 'Gagal menghapus data');
    res.redirect('/alat_tangkap');
  }
});

module.exports = router;
