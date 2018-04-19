const router = require('express').Router();

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/todoslist', (err, client) => {
        if (err) return console.log(err);
        console.log('connection OKKKK ')
        let db = client.db('todoslist');
        closure(db);

    })
}


router.get('/users', function (req, res) {
    connection ( db => {
      db.collection('Users').find().toArray( (err,result)=> {
        res.send(result);
      })
    } )

  })

  router.get('/todos/:id' , function (req, res) {
    let qry = {_id:ObjectID(req.params.id)};
    connection ( db => {

      db.collection('Users').findOne(qry).then (result=> {
        res.send(result.todos)
      })
    } )

  })

  router.post('/todos/:id' , function (req, res) {
    let qry = {_id:ObjectID(req.params.id)};
    console.log(req.body)
    connection ( db => {
      db.collection('Users').updateOne(qry,{ $addToSet:{ 'todos' : req.body }}).then (result=> {
        res.send(result)
              console.log(req.body +' success')
      })
    } )

  })
  router.get('/todos/:id/:index' , function (req, res) {
    let qry = {_id:ObjectID(req.params.id)};
    connection ( db => {

      db.collection('Users').findOne(qry).then (result=> {
        res.send(result.todos[req.params.index])
      })
    } )

  })
  router.put('/todos/:id/:index' , function (req, res) {
    let qry = {_id:ObjectID(req.params.id)};

    console.log(req.body)
    connection ( db => {
      db.collection('Users').update(qry,{ $set: {[ 'todos.' + req.params.index] :req.body}}).then (result=> {
        res.send(result)
              console.log(req.body +' success')
      })
    } )

  })




  module.exports = router;
