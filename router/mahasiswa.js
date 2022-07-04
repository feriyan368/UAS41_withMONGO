const express = require("express");
const routerMahasiswa = express.Router();

const controllerMahasiswa = require("../controller/mahasiswa");

routerMahasiswa.route("/Mahasiswa")
.get(controllerMahasiswa.getMahasiswa)
.post(controllerMahasiswa.insert);

routerMahasiswa.route("/Mahasiswa/:nim")
.put(controllerMahasiswa.update)
.get(controllerMahasiswa.getMahasiswaByNim)
.delete(controllerMahasiswa.delete);

routerMahasiswa.route("/Mahasiswa/nilai/:nim")
.get(controllerMahasiswa.getNilaiByNim)
.put(controllerMahasiswa.insertNilai);

module.exports = routerMahasiswa;
