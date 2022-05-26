import dbConnect from '../../../utils/db';
import Product from '../../../model/Product';

export default async function handler(req, res) {
  const { method } = req;
  dbConnect();

  if (method === 'GET') {
    return res.status(200).send('hello');
  }

  if (method === 'POST') {
    try {
      const doc = await Product.create(req.body);
      return res.status(200).json(doc);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
