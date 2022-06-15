import cookie from 'cookie';

const handler = (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (
      username === process.env.USERNAME &&
      password === process.env.PASSWORD
    ) {
      res.setHeaders(
        'Set-Cookie',
        cookie.serialize('token', process.env.TOKEN)
      );
    }
  }
};

export default handler;
