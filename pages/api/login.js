import cookie from 'cookie';

const handler = (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    console.log('USER', process.env.USERNAME);
    console.log('USER', process.env.PASSWORD);
    console.log('body', req.body);
    if (username == process.env.USERNAME && password == process.env.PASSWORD) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', process.env.TOKEN, {
          maxAge: 60 * 60,
          sameSite: 'strict',
          path: '/',
          // httpOnly: true Not in DEV
        })
      );
      return res.status(200).json({ msg: 'Login Successfull' });
    } else {
      return res.status(400).json({ msg: 'Wrong Credentials' });
    }
  }
};

export default handler;
