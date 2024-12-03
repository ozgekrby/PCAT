const express = require('express');
const fileUpload = require('express-fileupload');
var methodOverride = require('method-override')
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const Photo = require('./models/Photo');
const app = express();
mongoose.connect('mongodb://localhost/pcat-test-db');
app.set('view engine', 'ejs');
app.use(fileUpload());
app.use(methodOverride('_method',{
  methods:["POST","GET"]
}))
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos,
  });
});
app.get('/photos/:id', async (req, res) => {
  //console.log(req.params.id);
  //res.render('about');
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
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
  //console.log(req.files.image);
  //await Photo.create(req.body);
  //res.redirect('/');
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name;
  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadeImage.name,
    });
    res.redirect('/');
  });
});
app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
});
app.put('/photos/:id',async (req, res) => {
  const photo = await Photo.findOne({_id:req.params.id});
  photo.title=req.body.title;
  photo.description = req.body.description
  photo.save()
  res.redirect(`/photos/${req.params.id}`)
});
app.delete('/photos/:id',async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/public' + photo.image;
  if(fs.existsSync(deletedImage)){ fs.unlinkSync(deletedImage) }
  await Photo.findByIdAndDelete(req.params.id);
  res.redirect('/');
});
const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
