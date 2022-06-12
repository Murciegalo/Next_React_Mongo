import dbConnect from '../../../utils/db';
import Order from '../../../model/Order';

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  await dbConnect();

  if (method === 'GET') {
    try {
      const order = await Order.findById(id);
      return res.status(200).json(order);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  if (method === 'PUT') {
    try {
      const order = await Order.create(req.body);
      return res.status(200).json(order);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  if (method === 'DELETE') {
    try {
      const order = await Order.findByIdAndDelete(id);
      return res.status(200).json(order);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
