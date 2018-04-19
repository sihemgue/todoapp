const express = require('express');
const app = express();
const port = 3000;
const bodyparser = require('body-parser');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

const api = require('./server/routing/api')
const auth = require('./server/routing/auth')
app.use('/api',api);
app.use('/auth',auth);

app.listen(port, err=>{
    if (err) throw err;
    console.log(`the server is running on port ${port}`)
});
