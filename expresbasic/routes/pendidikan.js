const express = require('express');
const router = express.Router();
const modelPendidikan = require('../model/Model_Pendidikan');

router.get('/', async (req, res, next) => {
  try {
    let rows = await modelPendidikan.getAll();
    res.render('pendidikan/index', { data: rows });
  } catch (error) {
    next(error);
  }
});

router.get("/create", function (req, res, next) {
  res.render("pendidikan/create", {
    nama_instansi: "",
    jurusan: "",
    tahun_masuk: "",
    tahun_lulus: "",
    nomor_ijazah: "",
    id_pendidikan: ""
  });
});

router.post('/store', async (req, res, next) => {
  try {
    const { nama_instansi, jurusan, tahun_masuk, tahun_lulus, nomor_ijazah, id_pendidikan } = req.body;
    const data = { nama_instansi, jurusan, tahun_masuk, tahun_lulus, nomor_ijazah, id_pendidikan };

    await modelPendidikan.store(data);
    
    req.flash('success', 'Berhasil menyimpan data');
    res.redirect('/pendidikan');
  } catch (error) {
    req.flash('error', 'Gagal menyimpan data');
    res.redirect('/pendidikan');
  }
});

router.get('/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const rows = await modelPendidikan.getById(id);

    res.render('pendidikan/edit', {
      id: rows[0].id_pendidikan,
      nama_instansi: rows[0].nama_instansi,
      jurusan: rows[0].jurusan,
      tahun_masuk: rows[0].tahun_masuk,
      tahun_lulus: rows[0].tahun_lulus,
      nomor_ijazah: rows[0].nomor_ijazah,
      id_pendidikan: rows[0].id_pendidikan
    });
  } catch (error) {
    next(error);
  }
});

router.post('/update/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { nama_instansi, jurusan, tahun_masuk, tahun_lulus, nomor_ijazah, id_pendidikan } = req.body;
    const data = { nama_instansi, jurusan, tahun_masuk, tahun_lulus, nomor_ijazah, id_pendidikan };

    await modelPendidikan.update(id, data);

    req.flash('success', 'Berhasil menyimpan data');
    res.redirect('/pendidikan');
  } catch (error) {
    req.flash('error', 'Gagal menyimpan data');
    res.redirect('/pendidikan');
  }
});

router.get('/delete/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await modelPendidikan.delete(id);

    req.flash('success', 'Berhasil menghapus data');
    res.redirect('/pendidikan');
  } catch (error) {
    req.flash('error', 'Gagal menghapus data');
    res.redirect('/pendidikan');
  }
});

module.exports = router;
