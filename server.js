const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://karen:letitsnow@ds257858.mlab.com:57858/lyric-colab', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 4000, () => {
    console.log('listening on 4000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('lyrics').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {lyrics: result})
  })
})

app.post('/lyrics', (req, res) => {
  db.collection('lyrics').save({name: req.body.name, line1: req.body.line1, line2: req.body.line2, line3: req.body.line3, line4: req.body.line4, line5: req.body.line5, thumbUp:0, thumbDown:0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
     res.redirect('/')
  })
})

app.put('/thumbUp', (req, res) => {
  db.collection('lyrics')
  .findOneAndUpdate({name: req.body.name, line1: req.body.line1, line2: req.body.line2, line3: req.body.line3, line4: req.body.line4, line5: req.body.line5}, {
    $set: {
      thumbUp:req.body.thumbUp + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
app.put('/thumbDown', (req, res) => {
  db.collection('lyrics')
  .findOneAndUpdate({name: req.body.name, line1: req.body.line1, line2: req.body.line2, line3: req.body.line3, line4: req.body.line4, line5: req.body.line5}, {
    $set: {
      thumbDown:req.body.thumbDown + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/lyrics', (req, res) => {
  db.collection('lyrics').findOneAndDelete({name: req.body.name, line1: req.body.line1, line2: req.body.line2, line3: req.body.line3, line4: req.body.line4, line5: req.body.line5}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Lyrics deleted!')
  })
})
