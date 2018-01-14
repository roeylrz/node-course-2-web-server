const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {//To use MIDLEWARE
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
})
// app.use((req, res, render) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));//USE - To use MIDLEWARE

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());
//app.disable('etag');//My Add because of 304 warning
app.get('/', (req, res) => {//To create handler for http request. agr 1- the url, arg 2 - the function to run
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});