/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable import/newline-after-import */
const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../Machine Learning/data/testing');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
// app.use('/uploads', express.static('uploads'));

router.post('/uploads', upload.single('images'), (req, res) => {
  console.log(JSON.stringify(req.file));
  if (!req.file) {
    res.status(500).json({
      status: 'fail',
      message: 'Gambar gagal dikirim ke Model',
    });
  }
  res.status(200).json({
    status: 'success',
    message: 'Gambar berhasil dikirim ke Model',
    data: req.file.path,
  });
});

router.get('/predicts', async (req, res) => {
  const response = await axios.get('http://localhost:5000/predicts');
  const { data } = response;
  res.status(200).json({
    status: 'success',
    data: data.predictions,
  });
});

module.exports = router;
