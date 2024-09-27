let cityName = "Moscow";
let formInp = document.querySelector(".formInput");
formInp.onsubmit = (event) => {
    event.preventDefault();
    cityName = formInp["search"].value;
    formInp.reset();
    getData();
}

async function getData(){
    try{
        let {data} = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=4d670aeb45d378e810eb7b96ffd673f9");
        console.log(data);
        getWeather(data);
    }
    catch(error){
        console.error(error);
    }
}

getData();

function getWeather(data){
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp - 273) + "&deg";
    document.querySelector(".wth").innerHTML = data.weather["0"].main;
    if(Math.round(data.main.temp - 273) >= 30){
        document.querySelector("body").style.color = "black";
        document.querySelector(".wthImage").src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV6YTJAzG2KIXATWqh6Y1QkpXuRrafuKeCRA&s";
    }
    else if(Math.round(data.main.temp - 273) >= 20){
        document.querySelector("body").style.color = "white";
        document.querySelector(".wthImage").src = "https://in-cyprus.philenews.com/wp-content/uploads/2020/03/weather-93-696x391.jpg";
    }
    else if(Math.round(data.main.temp - 273) >= 10){
        document.querySelector(".wthImage").src = "https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/8/2022/10/CLI371.weather.double_rainbow_cammie_czuchnicki-920x614.jpg";
        document.querySelector("body").style.color = "white";
    }
    else{
        document.querySelector(".wthImage").src = "https://temperatures.com/wp-content/uploads/2024/03/understanding-cold-weather-and-its-impact-1709554457.jpg";
    }
    let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    document.querySelector(".wd").innerHTML = week[new Date().getDay()];  
    document.querySelector(".date").innerHTML = new Date().toDateString().slice(3);  

    document.querySelector(".hum").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".pre").innerHTML = data.main.pressure + " hPa";
    document.querySelector(".place").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="locate">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>` + data.name + ", " + data.sys.country;
}