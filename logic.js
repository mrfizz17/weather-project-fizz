
const test = async (cityIn)=>{
    let city = cityIn;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=25c6057e535bde5f3e58022ccd2b18c5&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
        alert("City not found");
        return;
    }

    console.log(data);
    await FetchForecast(city)
    showData(data);

}

const FetchForecast = async (city)=>{
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=25c6057e535bde5f3e58022ccd2b18c5&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data)

    

    let actualData= data.list.filter(item =>{
        return item.dt_txt.includes('12:00:00')
    })

    document.querySelector('.show-forecast').innerHTML='';

    actualData.forEach((item)=>{
        const div=document.createElement('div');
        const p1=document.createElement('p');
        const p2=document.createElement('p');

        p1.innerText=formatDate(item.dt)

        p2.innerText=`${Math.round(item.main.temp)}°C`;
        div.appendChild(p1);
        div.appendChild(p2);
        // console.log(item);
        // console.log(div);

        div.classList.add('div');
         

        document.querySelector('.show-forecast').appendChild(div);


    })
}

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);

  
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const year = String(date.getFullYear()).slice(-2);
    return `${day} ${month}, ${year}`
    // console.log( `${day} ${month}, ${year}`);
  
}

function showData(data){
    const city = data.name;
    const country = data.sys.country;
    const temp=Math.round(data.main.temp);
    const feellike=Math.round(data.main.feels_like)
    const cloudDesc=data.weather[0].description;
   

    const windkph = data.wind.speed * 3.6; 
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const visibility = data.visibility/1000;

   

    const dt = data.dt*1000;

    const date = new Date(dt);

    


    const sunset =data.sys.sunset;

    const SunsetTime = new Date(sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    });

    console.log(SunsetTime);


    const sunrise =data.sys.sunrise;

    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    });

    console.log(sunriseTime);

    

    document.querySelector('.show-city').innerText=`${city}
    ${country}`;
    document.querySelector('.show-tempurature').innerText=`${temp}°C`;
    document.querySelector('.show-cloud-description').innerText=`${cloudDesc}`;



    document.querySelector('.info-wind').innerText=`Wind
    ${Math.round(windkph)} kph`;

    document.querySelector('.info-humidity').innerText=`Humidity
    ${humidity}%`;

    document.querySelector('.info-visibility').innerText=`Visibility
    ${visibility}km`;

    document.querySelector('.info-pressure').innerText=`Pressure
    ${pressure} hPa`;

    document.querySelector('.info-sunrise').innerText=`Sunrise
    ${sunriseTime}`;

    document.querySelector('.info-sunset').innerText=`Sunset
    ${SunsetTime}`;
    






}

test('Dhaka');


window.addEventListener('keydown',(event)=>{
    
    if(event.key==='Enter'){
        event.preventDefault();
        triggerSubmit();
    }
})


document.querySelector('.submit-btn').addEventListener('click',()=>{
    triggerSubmit();
})




const triggerSubmit = ()=>{
    
    const inputVal= document.querySelector('.city-input').value;

    if(inputVal===''){
        alert('Enter city First');
        return;
    }


  
    test(inputVal);

}



