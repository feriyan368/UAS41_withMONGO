const mahasiswa = require("../model/mhsEmbedded");

module.exports = {
  getMahasiswa: async (req, res) => {
    try {
      const result = await mahasiswa.find();
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  insert: async (req, res) => {
    const data = new mahasiswa({
      nim: req.body.nim,
      nama: req.body.nama,
      angkatan: req.body.angkatan,
      prodi: req.body.prodi,
    });
    try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ massage: error.massage });
    }
  },

  insertNilai: async (req, res) => {
    const nim = req.params.nim;
    console.log(nim);
    try {
      await mahasiswa.updateOne(
        { nim: nim },
        {
          $push: {
            //mamasukan nilai kedalam array
            nilai: {
              kdMk: req.body.kdMk,
              matakuliah: req.body.matakuliah,
              dosen: req.body.dosen,
              semester: req.body.semester,
              nilai: req.body.nilai,
            },
          },
        }
      );
      res.send("nilai telah disimpan");
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  getNilaiByNim: async (req, res) => {
    const nim = req.params.nim;
    try {
      const result = await mahasiswa.findOne({ nim: nim }, { _id: 0, nilai: 1 });
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getMahasiswaByNim: async (req, res) => {
    const nim = req.params.nim;
    try {
      const result = await mahasiswa.find().where("nim").equals(nim);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    const filter = { nim: req.params.nim };
    const updateData = {
      nama: req.body.nama,
      agkata: req.body.angkatan,
      proodi: req.body.prodi,
    };
    try {
      let result = await mahasiswa.updateOne(filter, updateData);
      res.send("Data telah terupdate");
    } catch (error) {
      res.status(409).json({ massage: error.message });
    }
  },

  delete: async (req, res) => {
    const filter = { nim: req.params.nim };
    try {
      await mahasiswa.deleteOne(filter);
      res.send("data telah terhapus");
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
};
