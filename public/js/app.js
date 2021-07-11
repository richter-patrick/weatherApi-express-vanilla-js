//Keys and values
const apiKey = '81dd8cc551fcd06439eb103f1b136e79';
let zip = null;
let zipValue = null;
let weatherUrl = null;


//Data that will be initialized later and 
//and send with the post request
let temp = '';
let date = '';
let userResponse = '';

// Using Async in favor of chained promises
// https://blog.devgenius.io/how-do-differences-in-promise-chains-and-async-await-affect-your-code-logic-b85aeb566ebb
document.getElementById("btnSendDataToBackend").addEventListener("click", getWeatherData);

async function getWeatherData() {
  cleanup();

  // triggerHideAndSeek;
  // const getWeatherData = async() => {
  zip = document.getElementById("zip");
  zipValue = zip.value;
  weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${zipValue}&appid=${apiKey}&units=metric`
  console.log(weatherUrl);
  console.log(zipValue);
  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();
      generatedData = {
        temp: data.main.temp,
        date: data.dt,
        userResponse: zip.value
    }
    console.log('getWeatherData', data);
  }
  catch (error) {
    console.log('Error happened', error);
  }
  finally {
    postDataToBackend(generatedData);
  }
}

async function postDataToBackend(data) {
  //New Post request
  backendData = null;
  const response = await fetch('/add', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  backendData = await response.clone().json();
  try {
    const newData = await response.json();
    // console.log('assd',newData);
    return newData;
  } catch (error) {
    console.log('Error hapened', error);
  }
  finally {
    updateUiAfterDataReceivedFromBackend(backendData);
  }
}

//update shall retrieve data from our server/app? 
//select necessary parts in dom and update ui for
// - Temperature
// - Date
// - User input
async function updateUiAfterDataReceivedFromBackend(data) {
  const backendTemp = data.transformed[0].temp;
  const backendDate = data.transformed[0].date;
  const backendUserResponseZip = data.transformed[0].userResponse;

  if(data) {
    document.getElementById("userResponseData").style.display = "block";
    setTimeout(function(){
      document.getElementById('transformZip').innerHTML = backendUserResponseZip;
    },1000)
    
    setTimeout(function() {
      document.getElementById("transformDate").innerHTML = backendDate;
    },1500)
    setTimeout(function() {
      document.getElementById("tranformTemp").innerHTML = `${backendTemp}&deg;`;
    },2000)
  }
  
}

const getData = async (url) => {
  const res = await fetch(url)
  try {
    const data = await res.json();
    console.log('getData function', data);
    return data;
  } catch (error) {
    console.log("getData error, ", error);
  }
}


//helper method
const cleanup = () => {
  document.getElementById('transformZip').innerHTML = '???';
  document.getElementById('transformDate').innerHTML = '???';
  document.getElementById('tranformTemp').innerHTML = '???';
}
