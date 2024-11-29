const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const ejs = require('ejs');
const Photo = require('./models/Photo');
const app = express();
mongoose.connect('mongodb://localhost/pcat-test-db');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  const photos= await Photo.find({});
  res.render('index',{
    photos
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.get('/photo', (req, res) => {
  res.render('photo');
});
app.post('/photos', async (req, res) => {
 await Photo.create(req.body);
  res.redirect('/');
});
const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
