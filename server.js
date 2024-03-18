// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Registration = require('./registrationModel');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/registration';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to handle registration POST requests
app.post('/register', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).send('Registration successful!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering candidate.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
