
const API_KEY = "5190672c2133015e104260d0bbaf055d";
function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      const { main, name, weather, sys } = data;
      console.log(data);
      const temp = document.querySelector(".weather");
      //const span = document.createElement("span");
      temp.innerHTML = `Weather in ${name}(${
        sys.country
      }) <img class="w_img" src="https://openweathermap.org/img/wn/${
        weather[0].icon
      }@2x.png"/> ${main.temp}°C`;
      //temp.appendChild(span);
    });
}
function loadCoords() {
  const coords = localStorage.coords;
  if (!coords) {
    getCoords();
  } else {
    const parse = JSON.parse(coords);
    getWeather(parse.lat, parse.log);
  }
}
function saveCoords(coords) {
  localStorage.coords = JSON.stringify(coords);
}
function getCoords() {
  const geo = navigator.geolocation;
  if (geo) {
    geo.getCurrentPosition(function(cur) {
      const coordsObj = {
        lat: cur.coords.latitude,
        log: cur.coords.longitude
      };
      saveCoords(coordsObj);
      getWeather(coordsObj.lat, coordsObj.log);
    });
  } else {
    alert("Geo is not supported...");
  }
}
loadCoords();
