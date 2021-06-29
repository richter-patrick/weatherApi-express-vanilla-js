//Keys and values
const apiKey = '81dd8cc551fcd06439eb103f1b136e79';
const zip = document.getElementById("zip");
const zipValue = zip.value;
const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${zipValue}&appid=${apiKey}`



const postData = async(url, data = []) => {
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
  } catch(error) {
    console.log('error', error);
  }
  zip.value = "";
}

// document.getElementById("btnSendDataToBackend").addEventListener("click", postData);
document.getElementById("btnSendDataToBackend").addEventListener("click", getWeatherData);

async function getWeatherData() {
  console.log(weatherUrl);  
  const response = await fetch(weatherUrl);
    const data = await response.json();
      // return movies;
      console.log('getWeatherData',data );
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


 postData('/add', {answer:'28'})
 postData('/add', {question:'?'})



 