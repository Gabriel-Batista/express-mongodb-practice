// simple bears API to learn express

//Call the packages we need
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose")
let Bear = require('./app/model/bear')
let app = express();

//Connect database
mongoose.connect('mongodb://localhost:27017/bears')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configure port
let port = 3000;

let router = express.Router();

router.get('/', (req, res) => {
  res.json({message: "this worked."})
})

app.use('/api', router)

app.listen(port, () => console.log('Server listening on port 3000'));