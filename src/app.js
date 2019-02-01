// create an express application tha listen on port 3000 and has a single route
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

const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf8'); // read the content and store it in accountData
const accounts = JSON.parse(accountData);
// console.log(accounts);

const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'utf8');
const users = JSON.parse(userData);
// console.log(users);

app.get('/', (req, res) => {
    res.render('index', { title: 'Account Summary', accounts });
});
app.get('/savings', (req, res) => {
    res.render('account', { account: accounts.savings })
});
app.get('/checking', (req, res) => {
    res.render('account', { account: accounts.checking })
});
app.get('/credit', (req, res) => {
    res.render('account', { account: accounts.credit })
}
);
app.get('/profile', (req, res) => {
    res.render('profile', { user: users[0] })
});

app.listen(3000, () => console.log('PS project running on port 3000'));