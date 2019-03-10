const express = require('express');
const router = express.Router();
const Clarifai = require('clarifai');

const { CLARIFAI_KEY } = require('../../config/keys');

const app = new Clarifai.App({
  apiKey: CLARIFAI_KEY
});

router.get('/test', (req, res) => {
  res.json({ msg: 'image Works' });
});

router.post('/fetch', (req, res) => {
  const imageURL = req.body.imageURL;

  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, imageURL)
    .then(data => res.json(data))
    .catch(error => res.status(404).json(error));
});

module.exports = router;
