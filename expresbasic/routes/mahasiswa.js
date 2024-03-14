const express = require('express');
const router = express.Router();
const modelMahasiswa = require('../model/Model_Mahasiwa');

router.get('/', async (req, res, next) => {
  try {
    let rows = await modelMahasiswa.getAll();
    res.render('mahasiswa/index', { data: rows });
  } catch (error) {
    next(error);
  }
});

router.get("/create", function (req, res, next) {
  res.render("mahasiswa/create", {
    nrp: "",
    nama_depan: "",
    nama_belakang: "",
    jenis_kelamin: "",
    agama: "",
    umur: "",
    tinggi_badan: "",
    gol_darah: "",
    alamat: "",
    hobi: "",
    email: "",
    no_telpon: ""
  });
});

router.post('/store', async (req, res, next) => {
  try {
    const { nrp, nama_depan, nama_belakang, jenis_kelamin, agama, umur, tinggi_badan, gol_darah, alamat, hobi, email, no_telpon } = req.body;
    const data = { nrp, nama_depan, nama_belakang, jenis_kelamin, agama, umur, tinggi_badan, gol_darah, alamat, hobi, email, no_telpon };

    await modelMahasiswa.store(data);
    
    req.flash('success', 'Berhasil menyimpan data');
    res.redirect('/mahasiswa');
  } catch (error) {
    req.flash('error', 'Gagal menyimpan data');
    res.redirect('/mahasiswa');
  }
});

router.get('/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const rows = await modelMahasiswa.getById(id);

    res.render('mahasiswa/edit', {
      id: rows[0].id_mahasiswa,
      nrp: rows[0].nrp,
      nama_depan: rows[0].nama_depan,
      nama_belakang: rows[0].nama_belakang,
      jenis_kelamin: rows[0].jenis_kelamin,
      agama: rows[0].agama,
      umur: rows[0].umur,
      tinggi_badan: rows[0].tinggi_badan,
      gol_darah: rows[0].gol_darah,
      alamat: rows[0].alamat,
      hobi: rows[0].hobi,
      email: rows[0].email,
      no_telpon: rows[0].no_telpon
    });
  } catch (error) {
    next(error);
  }
});

router.post('/update/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { nrp, nama_depan, nama_belakang, jenis_kelamin, agama, umur, tinggi_badan, gol_darah, alamat, hobi, email, no_telpon } = req.body;
    const data = { nrp, nama_depan, nama_belakang, jenis_kelamin, agama, umur, tinggi_badan, gol_darah, alamat, hobi, email, no_telpon };

    await modelMahasiswa.update(id, data);

    req.flash('success', 'Berhasil menyimpan data');
    res.redirect('/mahasiswa');
  } catch (error) {
    req.flash('error', 'Gagal menyimpan data');
    res.redirect('/mahasiswa');
  }
});

router.get('/delete/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await modelMahasiswa.delete(id);

    req.flash('success', 'Berhasil menghapus data');
    res.redirect('/mahasiswa');
  } catch (error) {
    req.flash('error', 'Gagal menghapus data');
    res.redirect('/mahasiswa');
  }
});

module.exports = router;
