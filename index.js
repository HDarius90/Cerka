const express = require('express');
const app = express();
const path = require('path');
const data = require('./data.json');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid');

//creating uniq id-s for referals
for (let student of data.class) {
    for (let ref of student.officeReferals) {
        ref.id = uuid();
    }
}




app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json()) // for parsing application/json
app.use(methodOverride('_method'))
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
    const student = data.class.find(st => st.name === name);

    res.render('pages/show', { student });
})

app.get('/newgrade', (req, res) => {
    res.render('pages/newgrade', { data });
})

app.post('/grade/newgrade', (req, res) => {
    const { name, subject, grade } = req.body;
    const student = data.class.find(st => st.name === name);
    try {
        student.grades[subject].push(parseInt(grade));
    } catch (error) {
        res.redirect('/grades');
        console.log(error);
    }
    res.redirect('/');
})

app.get('/reqref', (req, res) => {
    res.render('pages/reqref');
})

app.get('/referals', (req, res) => {
    const { name } = req.query;
    const student = data.class.find(st => st.name === name);
    if (!student) {
        res.redirect('/reqref');
    }
    res.render('pages/referals', { student })

})

app.patch('/referals', (req, res) => {
    const { refID, name } = req.body;
    const student = data.class.find(st => st.name === name);
    const seenRef = student.officeReferals.find(ref => ref.id === refID);
    seenRef.seenByParent = true;
    res.redirect('/reqref');
})

app.get('/absence', (req, res) => {
    res.render('pages/absence', { data });
})

app.delete('/absence/:name', (req, res) => {
    const {name} = req.params;
    const student = data.class.find(st => st.name === name);
    student.unjustifiedAbsence = 0;
    res.redirect('/');

})

app.listen(3000, () => {
    console.log('ON PORT 3000')
})
