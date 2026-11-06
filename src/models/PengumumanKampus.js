import mongoose from 'mongoose';

const PengumumanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title wajib diisi'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'content wajib diisi'],
      trim: true,
    },
    published_date: {
      type: Date,
      required: [true, 'published_date diisi'],
    },
    is_active: {
        type: String,
        trim:true
    }
  },
  { timestamps: true }
);


const Pengumuman = mongoose.model('Pengumuman', PengumumanSchema, 'pengumuman');
export default Pengumuman;