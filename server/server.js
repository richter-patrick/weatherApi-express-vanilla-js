

const express = require('express')
const app = express()
const port = 8080
const path = require('path');

//Express as middleware for json data since bodyparser is depreceated 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Cors for cross origin
const cors = require('cors');
app.use(cors());

//Hold Data
let projectData = [];

const apiKey = '81dd8cc551fcd06439eb103f1b136e79';
//serve html
 app.use(express.static('public'));

//Serve
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})


app.post('/add', function(req,res){
  projectData.push(req.body)
  console.log('pjd',projectData)
  res.json({ transformed: projectData});
  projectData = [];
})

app.listen(port, () => {
  console.log(`Running on Port: ${port}`);
  
})
