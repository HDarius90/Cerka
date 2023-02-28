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
app.get('/grade/:name', (req, res) => {
    const { name } = req.params;
    const student = data.class.find( st => st.name === name);
    
    res.render('pages/show', { student });
})

app.get('/newgrade', (req, res) => {
    res.render('pages/newgrade', { data });
})

app.post('/grade/newgrade', (req, res) => {
    console.log(req.body);
    res.redirect('/grades');
})

app.listen(3000, () => {
    console.log('ON PORT 3000')
})
