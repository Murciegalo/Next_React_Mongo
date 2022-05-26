import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    total: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model('Order', OrderSchema);
