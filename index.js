const express = require('express');
const app = express();
const path = require('path');
const data = require('./data.json');

app.use(express.static(path.join(__dirname, '/public')));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('pages/index', { data });
})

app.get('/grades', (req, res) => {
    res.render('pages/grades', { data });
})

app.get('/newgrade', (req, res) => {
    res.render('pages/newgrade', { data });
})

app.listen(3000, () => {
    console.log('ON PORT 3000')
})
