/*
  Router for my API. There is no database; it just stores a single array inside
  this file.

  Base URL
  Dev mode: localhost:3000/api
  (Note: won't work in dev mode if using the LAN access URL or if using ngrok proxy)

  Two endpoints
    GET /tidbits
    POST /tidbits
*/

const express = require('express');

// router object is like a mini-express-app; acts like middleware itself, but
// can also perform middleware/routing functions
const router = express.Router();

// Only need json body parser for requests that hit the /api path, so include it
// here instead of directly on main app
router.use(express.json());

const tidbits = [];

// const artificialDelay = ms => new Promise(resolve => {
//   setTimeout(() => resolve(), ms);
// });
// const shouldArtificiallyErrorOut = () => Math.random() < .5;

router.get('/tidbits', async (_request, response) => {
  // await artificialDelay(1000);
  // if (shouldArtificiallyErrorOut()) {
  //   return response.status(500).end();
  // }
  response.json({ tidbits });
});

router.post('/tidbits', async (request, response) => {
  // await artificialDelay(1000);
  // if (shouldArtificiallyErrorOut()) {
  //   return response.status(500).end();
  // }
  const { tidbit } = request.body;
  if (typeof tidbit === 'string') {
    tidbits.unshift(tidbit);
    return response.json({ tidbit });
  }
  return response
    .status(400)
    .send('Expecting request body to be { "tidbit": /string/ }');
});

module.exports = router;
