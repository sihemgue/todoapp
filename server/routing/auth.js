const router = require('express').Router();

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');

const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/todoslist', (err, client) => {
        if (err) return console.log(err);
        console.log('connection OKKKK ')
        let db = client.db('todoslist');
        closure(db);

    })
}
// Error handling
const sendError = (err, res, code) => {
  response.status = code;
  response.message = typeof err == 'object' ? err.message : err;
  response.data = [];
  res.status(code).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};
router.post('/register', function (req, res) {
  let qry = {
    "email": req.body.email
  };
  connection(db => {
    db.collection('Users').findOne(qry).then(result => {
      console.log(req.body.email);
      if (result) {
        response.status = 401;
        response.message = "account already exists";
        response.data = jwt.sign(result, 'james_bond');
      } else {
        db.collection('Users').insertOne(req.body)
        response.status = 200;
        response.message = "register succes";
        response.data = jwt.sign(req.body, 'james_bond');
      }
      res.json(response)
    }).catch(err => {
      sendError(err, res, 409);
    })
  })
})

router.post('/login', function (req, res) {
  let qry =  {"email":req.body.email, "password": req.body.password};
  connection(db=>{
      db.collection('Users').findOne(qry).then(result=>{
          if (result){
          let token = jwt.sign({id:result._id},'secret',);
          response.data= {token:token};
          response.message='ok';
          response.status = 200;
          res.json(response);
        } else {
          sendError('Login Invalide',res,401);
        }
      }).catch(err=>{
          sendError(err,res,501);
      })
  })


})
module.exports = router;
