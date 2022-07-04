const mongoose = require("mongoose");

const mhsSchema = new mongoose.Schema({
  nim: {
    require: true,
    type: String,
  },
  nama: String,
  angkatan: String,
  prodi: String,
});

module.exports = mongoose.model("Mahasiswa", mhsSchema);
