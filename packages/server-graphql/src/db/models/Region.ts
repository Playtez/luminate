import mongoose from 'mongoose'

const Region = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    country: {
      type: mongoose.Types.ObjectId,
      ref: 'country',
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('region', Region)