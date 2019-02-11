// create an express application tha listen on port 3000 and has a single route
// Library to require
const fs = require('fs'); // allow us to read and write files
const path = require('path'); // allow us to configure absolute path
const express = require('express'); // thi is the core library
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');
const app = express();
const { accounts, users, writeJSON } = require('./data');
//configure the views directory

app.set('views', path.join(__dirname, 'views'));//Join several segments into one path
app.set('view engine', 'ejs');


//tell express how to find our ... directory and how to serve those files
// express stati to point at public where I have my css
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); //middleware
app.use("/account", accountRoutes);
app.use("/services", servicesRoutes);
//ROUTES
app.get('/', (req, res) => {
    res.render('index', { title: 'Account Summary', accounts });
});

app.get('/profile', (req, res) => {
    res.render('profile', { user: users[0] })
});


app.listen(3000, () => console.log('PS project running on port 3000'));