
const express = require('express');
const bodyParser = require('body-parser');
const tesseract = require('tesseract.js');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.post('/api/recognize', async (req, res) => {
  // Get the data URL of the image from the request body
  console.log(req.headers['content-type']);
  const { image } = req.body;

  // Use Tesseract to perform OCR on the image
  const result = await tesseract.recognize(image);

  // Send the recognized text back to the client
  res.send(result.text);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
