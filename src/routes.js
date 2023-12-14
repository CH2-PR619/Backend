/* eslint-disable linebreak-style *//* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable import/newline-after-import */
const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/uploads', upload.single('images'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(500).json({
        status: 'fail',
        message: 'Gambar gagal dikirim ke Model',
      });
    }

    // Mengonversi buffer file ke base64
    const base64Image = req.file.buffer.toString('base64');

    // Mengirim data ke Flask
    await axios.post('http://localhost:5000/predicts', {
      image: base64Image,
    });

    res.status(200).json({
      status: 'success',
      message: 'Gambar berhasil dikirim ke Model',
      data: req.file.originalname,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'fail',
      message: 'Terjadi kesalahan saat mengirim gambar ke Flask',
    });
  }
});

router.get('/predicts', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/predicts');
    const { data } = response;
    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'fail',
      message: 'Terjadi kesalahan saat mendapatkan prediksi dari Flask',
    });
  }
});

module.exports = router;
