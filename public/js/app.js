//Keys and values
const apiKey = '81dd8cc551fcd06439eb103f1b136e79';
const zip = document.getElementById("zip");
const zipValue = zip.value;
const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${zipValue}&appid=${apiKey}`

//Data that will be initialized later and 
//and send with the post request
let temp = '';
let date = '';
let userResponse = '';

// Using Async in favor of chained promises
// https://blog.devgenius.io/how-do-differences-in-promise-chains-and-async-await-affect-your-code-logic-b85aeb566ebb
async function postData(url, data = []) {
  console.log('My data frontend', url, data)

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log('from try', newData);
    return newData;
  }
  catch (error) {
    console.log('error', error);
  }
  zip.value = "";
}



// document.getElementById("btnSendDataToBackend").addEventListener("click", postData);
document.getElementById("btnSendDataToBackend").addEventListener("click", getWeatherData);

async function getWeatherData() {
  // const getWeatherData = async() => {
  console.log(weatherUrl);
  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();
    // return movies;
    temp = data.main.temp;
    date = data.dt;
    userResponse = zipValue;
    console.log('getWeatherData', data);
  }
  catch (error) {
    console.log('Error happened', error);
  }
  finally {
    anotherAsyncFun();
  }
}

async function anotherAsyncFun(url = '/newPost', data = { temp, date, userResponse }) {

  //New Post request
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(temp, date, userResponse),
    });
  } catch (error) {
    console.log('Error hapened', error);
  }
  finally {
    updateUi();

  }
  //After data is successfully send back,
  //call method to update ui
}

//update shall retrieve data from our server/app? 
//select necessary parts in dom and update ui for
// - Temperature
// - Date
// - User input
async function updateUi() {

}

document.getElementById("btnGenerate").addEventListener("click", generateData)

//TODO - Add handlers 
function generateData(e) {
  getData(url)
}




const getData = async (url) => {
  console.log('hallo');
  const res = await fetch(url)
  try {
    const data = await res.json();
    console.log('getData function', data);
    return data;
  } catch (error) {
    console.log("getData error, ", error);
  }
}


postData('/add', { answer: '28' })
postData('/add', { question: '?' })



