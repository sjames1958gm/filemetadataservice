const express = require('express');
const path = require('path');
const app = express();

require('dotenv').config();

const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const type = upload.single('recfile');

app.use(express.static(path.join(__dirname, 'public')));

app.post('/getfiledata', type, (req, res) => {
    console.log(req.file);
    const { originalName, mimetype, encoding, size } = req.file;
    res.json({ originalName, mimetype, encoding, size });
});


app.listen(process.env.PORT, () => { console.log(`listening on ${process.env.PORT}`)});