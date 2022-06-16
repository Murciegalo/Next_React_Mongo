import dbConnect from '../../../utils/db';
import Order from '../../../model/Order';

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req;

  const token = cookies.token;
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
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).send('Not Authorized');
    }
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(201).json(order);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  if (method === 'DELETE') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).send('Not Authorized');
    }
    try {
      await Order.findByIdAndDelete(id);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
