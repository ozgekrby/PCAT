const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/pcat-test-db');

const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);
/*Photo.create({
    title: "Photo Title 2",
    description: "Photo description 2 lorem ipsum"
}).then(() => console.log("Photo created!"))
.catch(err => console.error(err));*/
/* Photo.find()
.then((photos) => console.log(photos))
.catch((err) => console.error(err));*/
/*const id = '6749a63e16ec67bbeb80995e';

Photo.findByIdAndUpdate(
  id,
  {
    title: 'Photo title 1 updated',
    description: 'Photo description 1 updated',
  },
  { new: true, runValidators: true }
)
  .then((updatedPhoto) => {
    if (!updatedPhoto) {
      console.log('Döküman bulunamadı');
    } else {
      console.log('Güncellenmiş veri:', updatedPhoto);
    }
  })
  .catch((err) => {
    console.error('Hata:', err.message);
  });*/
const id = '6749a63e16ec67bbeb80995e';

Photo.findByIdAndDelete(id)
  .then(() => {
    console.log('dokuman silindi.');
  })
  .catch((err) => {
    console.error('Hata:', err.message);
  });
