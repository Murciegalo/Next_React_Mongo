import dbConnect from '../../../utils/db';
import Order from '../../../model/Order';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === 'GET') {
    try {
      const docs = await Order.find();
      return res.status(200).json(docs);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  if (method === 'POST') {
    try {
      const doc = await Order.create(req.body);
      return res.status(200).json(doc);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
