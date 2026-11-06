import { Router } from 'express';
import mongoose from 'mongoose';
import pengumuman from '../models/PengumumanKampus.js';

const router = Router();
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

router.post('/', async (req, res) => {
  try {
    const { title, content, published_date } = req.body;
    const data = await Pengumuman.create({ title, content, published_date });
    res.status(201).json({ success: true, message: 'Pengumuman Kampus berhasil ditambahkan', data });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Pengumuman.find();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'content tidak valid' });
    }
    const data = await Pengumuman.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: 'title tidak ditemukan' });
    }
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'content tidak valid' });
    }
    const { title, content, published_date } = req.body;
    const data = await Pengumuman.findByIdAndUpdate(
      req.params.id,
      { title, content, published_date },
      { new: true, runValidators: true }
    );
    if (!data) {
      return res.status(404).json({ success: false, message: 'Data pengumuman tidak ditemukan' });
    }
    res.status(200).json({ success: true, message: 'Data pengumuman berhasil diperbarui', data });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'title tidak valid' });
    }
    const data = await Pengumuman.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Data pengumuman tidak ditemukan' });
    }
    res.status(200).json({ success: true, message: 'Data pengumuman berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
});

export default router;