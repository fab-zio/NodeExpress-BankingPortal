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
app.use(express.urlencoded({ extended: true })); //middleware
const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf8'); // read the content and store it in accountData
const accounts = JSON.parse(accountData);
// console.log(accounts);

const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'utf8');
const users = JSON.parse(userData);
// console.log(users);
//ROUTES
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
});
app.get('/profile', (req, res) => {
    res.render('profile', { user: users[0] })
});
app.get('/transfer', (req, res) => {
    res.render('transfer') // provide access to the transfer form
});
app.post('/transfer', (req, res) => {
    // accounts["savings"].balance
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount, 10);
    const accountsJSON = JSON.stringify(accounts, null, 4)
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8')
    res.render('transfer', { message: 'Transfer completed' })
});
app.get('/payment', (req, res) => {
    res.render('payment', { account: accounts.credit })
});
app.post('/payment', (req, res) => {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount, 10);
    const accountsJSON = JSON.stringify(accounts, null, 4)
    fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, 'utf8')
    res.render('payment', { message: 'Payment successful', account: accounts.credit })

});
app.listen(3000, () => console.log('PS project running on port 3000'));