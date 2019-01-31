// create an express apllication tha listen on port 3000 and has a single route
// Library to require
const fs = require('fs'); // allow us to read and write files
const path = require('path'); // allow us to configure absolute path
const express = require('express'); // thi is the core library

const app = express();

//configure the views directory

app.set('views', path.join(__dirname, 'views'));//Join several segments into one path
app.set('view engine', 'ejs');


//tell express how to find our ... directory and how to serve those files
// express stati to point at public where I have my css
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index', { title: 'Index' }));

app.listen(3000, () => console.log('PS project running on port 3000'));