const express = require('express')
const app = express()
const port =  4000 || process.env
const bodyParser = require('body-parser')
const cors = require('cors')
var pgp = require('pg-promise')(/* options */)
var db = pgp('postgres://jzbyrxzl:UXBxM-JOk4-O-GN0FaSMH-glMMkn2lQK@raja.db.elephantsql.com:5432/jzbyrxzl')

app.use(bodyParser.json())
app.use(cors())

app.get('/', async (req, res) => { 
  console.log('getted')
 await db.multi('select * from high_scores order by score desc limit 10')
  .then(data => res.send(data))
  .catch(error => res.send(error))
})

app.post('/',  async (req,res) => {
  console.log('posted')
 await db.one('INSERT INTO high_scores (score, name, taunt) VALUES ($1, $2, $3) RETURNING *',[req.body.score, req.body.name, req.body.taunt], name => name)
  .then(data => res.send(data))
  .catch(err => res.send(err))
})

app.listen(port, () => console.log(`Listening on port ${port}!`))