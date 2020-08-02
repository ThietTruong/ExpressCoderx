const express = require('express');
const bodyParser = require('body-parser');
const { render } = require('pug');
const app = express();

const userRoute = require('./routes/user.route');

const port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req,  res)=>{
    res.render('index', {
        name: 'Thiet'
    })
});

app.use('/users', userRoute);
app.use(express.static('public'));

app.listen(port, ()=> console.log(`Example app listening at https://localhost:${port}`));
