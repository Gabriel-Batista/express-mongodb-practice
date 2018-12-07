// simple bears API to learn express

//Call the packages we need
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose")
let Bear = require('./app/model/bear')
let app = express();

//Connect database
mongoose.connect("mongodb://localhost:27017/myapp");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configure port
let port = 3000;

let router = express.Router();

router.use((req, res, next) => {
  console.log("something is happening.")
  next() //If you don't add this then the flow stops at this middleware
})

router.get('/', (req, res) => {
  res.json({message: "this worked."})
})

router.route('/bears')
  .post((req, res) => {
    let bear = new Bear()
    bear.name = req.body.name
    
    bear.save(function(err) {
      if (err)  {
        res.send(err)
      }
      res.send({message: "Bear was created."})
    })
  })

  .get((req, res) => {
    Bear.find((err, bears) => {
      if (err)  {
        res.send(err)
      }

      res.json(bears)
    })
  })

router.route('/bears/:bear_id')
  .get((req, res) =>  {
    Bear.findById(req.params.bear_id, (err, bear) =>  {
      if (err)  {
        res.send(err)
      }

      res.json(bear)
    })
  })

  .put((req, res) => {
    Bear.findById(req.params.bear_id, (err, bear) =>  {
      if (err)  {
        res.send(err)
      }
      
      bear.name = req.body.name

      bear.save(err => {
        if (err)  {
          res.send(err)
        }

        res.json({message: "bear was created", bear: bear})
      })
    })
  })

app.use('/api', router)

app.listen(port, () => console.log('Server listening on port 3000'));