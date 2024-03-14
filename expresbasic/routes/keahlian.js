const express = require('express'); 
const router = express.Router();
const KeahlianModel = require('../model/Model_Keahlian');

router.get('/', async (req, res, next) => {
    try {
        let rows = await KeahlianModel.getAll();
        res.render('keahlian/index', { data: rows });
    } catch (error) {
        next(error);
    }
});

router.get("/create", (req, res) => {
    res.render("keahlian/create");
});

router.post("/store", async (req, res, next) => {
    try {
        const keahlianData = req.body;
        await KeahlianModel.store(keahlianData);
        req.flash("success", "Berhasil menyimpan data Keahlian");
        res.redirect("/keahlian");
    } catch (error) {
        req.flash("error", "Gagal menyimpan data Keahlian");
        res.redirect("/keahlian");
    }
});

router.get("/edit/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const keahlian = await KeahlianModel.getById(id);
        
        if (keahlian) {
            res.render("keahlian/edit", {
                id: id,
                nama_keahlian: keahlian.nama_keahlian, 
                tingkat_keahlian: keahlian.tingkat_keahlian, 
                id_mahasiswa: keahlian.id_mahasiswa
            });
        } else {
            req.flash("error", "Data Keahlian tidak ditemukan");
            res.redirect("/keahlian");
        }
    } catch (error) {
        next(error);
    }
});

router.post("/update/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const keahlianData = req.body;
        await KeahlianModel.update(id, keahlianData);
        req.flash("success", "Berhasil menyimpan data Keahlian");
        res.redirect("/keahlian");
    } catch (error) {
        req.flash("error", "Gagal menyimpan data Keahlian");
        res.redirect("/keahlian");
    }
});

router.get("/delete/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        await KeahlianModel.delete(id);
        req.flash("success", "Berhasil menghapus data Keahlian");
        res.redirect("/keahlian");
    } catch (error) {
        req.flash("error", "Gagal menghapus data Keahlian");
        res.redirect("/keahlian");
    }
});

module.exports = router;
