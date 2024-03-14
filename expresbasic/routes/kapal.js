const express = require('express');
const router = express.Router();
const modelKapal = require('../model/Model_Kapal');

router.get('/', async (req, res, next) => {
  try {
    let rows = await modelKapal.getAll();
    res.render('kapal/index', { data: rows });
  } catch (error) {
    next(error);
  }
});

router.get("/create", async (req, res, next) => {
  try {
    let dpiList = await modelKapal.getAllDPI();
    let pemilikList = await modelKapal.getAllPemilik();
    let alatTangkapList = await modelKapal.getAllAlatTangkap();
    
    res.render("kapal/create", {
      dpiList: dpiList,
      pemilikList: pemilikList,
      alatTangkapList: alatTangkapList,
      nama_kapal: "",
      id_pemilik: "",
      id_dpi: "",
      id_alat_tangkap: ""
    });
  } catch (error) {
    next(error);
  }
});

router.post('/store', async (req, res, next) => {
  try {
    const { nama_kapal, id_pemilik, id_dpi, id_alat_tangkap } = req.body;
    const data = { nama_kapal, id_pemilik, id_dpi, id_alat_tangkap };

    await modelKapal.store(data);
    
    req.flash('success', 'Berhasil menyimpan data');
    res.redirect('/kapal');
  } catch (error) {
    req.flash('error', 'Gagal menyimpan data');
    res.redirect('/kapal');
  }
});

router.get('/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const rows = await modelKapal.getById(id);
    let dpiList = await modelKapal.getAllDPI();
    let pemilikList = await modelKapal.getAllPemilik();
    let alatTangkapList = await modelKapal.getAllAlatTangkap();

    res.render('kapal/edit', {
      id: rows[0].id_kapal,
      nama_kapal: rows[0].nama_kapal,
      id_pemilik: rows[0].id_pemilik,
      id_dpi: rows[0].id_dpi,
      id_alat_tangkap: rows[0].id_alat_tangkap,
      dpiList: dpiList,
      pemilikList: pemilikList,
      alatTangkapList: alatTangkapList
    });
  } catch (error) {
    next(error);
  }
});

router.post('/update/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { nama_kapal, id_pemilik, id_dpi, id_alat_tangkap } = req.body;
    const data = { nama_kapal, id_pemilik, id_dpi, id_alat_tangkap };

    await modelKapal.update(id, data);

    req.flash('success', 'Berhasil menyimpan data');
    res.redirect('/kapal');
  } catch (error) {
    req.flash('error', 'Gagal menyimpan data');
    res.redirect('/kapal');
  }
});

router.get('/delete/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await modelKapal.delete(id);

    req.flash('success', 'Berhasil menghapus data');
    res.redirect('/kapal');
  } catch (error) {
    req.flash('error', 'Gagal menghapus data');
    res.redirect('/kapal');
  }
});

module.exports = router;
