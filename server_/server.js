const express = require('express')
const app = express()
const port = 8080

//Express as middleware for json data since bodyparser is depreceated 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Cors for cross origin
const cors = require('cors');
app.use(cors());

//Hold Data
const projectData = [];
const dummyData = ['hihi', 'hoho'];

const htmlPath = '../public/';
const apiKey = '81dd8cc551fcd06439eb103f1b136e79';
// const constructedUrl = url+apiKey;
//serve html
 app.use(express.static(htmlPath));


app.get('/', (req,res) => {
  res.sendFile(path.join(htmlPath, '/index.html'));
})

app.get('/data', (req,res) => {
  res.status(200).send(dummyData)
})

app.post('/add', function(req,res){
  let data = req.body;
  projectData.push(req.body)
  console.log('/add server', data);
  console.log('/add server, projectData', projectData);
})

app.listen(port, () => {
  console.log(`Running on Port: ${port}`);
  
})

// TODO
// 1. Getting data from the api works, now I need to chain multiple promises.
// 1.1 Save the important data from weather api into TEMPERATURE,DATE, USER_RESSPONE 
// 1.2 Send the received weather to backend, transform it 
// 1.3 send transformed data back to front end
// 1.4 manipulate data based on data from backend.