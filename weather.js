function subMit() { 
    let city = document.getElementById("citY").value.trim();
    if (city === '') {
        city = 'delhi'; 
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=78e7e43bb31b090bb5ba44efc9cb3758`)
        .then((apiData) => {
            return apiData.json();
        })
        .then((daTa) => {
            console.log(daTa);
            const name = daTa.name;
            const temp = daTa.main.temp;
            const humid = daTa.main.humidity;
            const wind = daTa.wind.speed;
            const weat = daTa.weather[0].main;
        
            document.getElementById("fir").innerHTML = "Place: " + name;
            document.getElementById("sec").innerHTML = "Temperature: " + Math.round(temp - 273.15) + "'C";
            document.getElementById("thi").innerHTML = "Humidity: " + humid + "%";
            document.getElementById("for").innerHTML = "Wind Speed: " + wind + "Km/h";
            document.getElementById("six").innerHTML = "Weather: " + weat;
            
        })
        .catch((error) => {
            console.log("Error fetching weather data:", error);
        });

    let map = document.getElementById("gmap_canvas");
    map.src = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}

document.getElementById("Btn").addEventListener("click", subMit);

window.addEventListener("load", () => {
    document.getElementById("citY").value = '';
    subMit(); 
});
