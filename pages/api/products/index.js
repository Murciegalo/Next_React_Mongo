import dbConnect from '../../../utils/db';
import Product from '../../../model/Product';

export default async function handler(req, res) {
  const { method, cookies } = req;
  const token = cookies.token;

  await dbConnect();

  if (method === 'GET') {
    try {
      const docs = await Product.find();
      return res.status(200).json(docs);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  if (method === 'POST') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).send('Not Authorized');
    }
    try {
      const doc = await Product.create(req.body);
      return res.status(200).json(doc);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // if (method === 'PUT') {
  //   try {
  //     const doc = await Product.findByIdAndUpdate();
  //     return res.status(200).json(doc);
  //   } catch (err) {
  //     return res.status(500).json(err);
  //   }
  // }

  // if (method === 'DELETE') {
  //   try {
  //     const doc = await Product.findByIdAndDelete();
  //     return res.status(200).json(doc);
  //   } catch (err) {
  //     return res.status(500).json(err);
  //   }
  // }
}
