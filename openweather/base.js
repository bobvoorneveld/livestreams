(function() {
    // On load
    getCurrentPostion();

    // Listeners
    $("#search-form").on("submit", (event) => {
        event.preventDefault();

        let queryString = $("#search-input").val();
        getWeatherInfoForQueryString(queryString);
    });

    // Private functions
    function getWeatherInfoForQueryString(cityName) {
        $.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`, parseGeoData);            
    }

    function getWeatherInfoByLatLon(lat, lon) {
        $.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`, parseGeoData);            
    }

    function parseGeoData(data) {
        console.log(data);

        setLocationName(data);
        setTemperature(data);
    }

    function setLocationName(data) {
        $("#weather-location").html(data.name);
        $("#search-input").val(data.name);
    }

    function setTemperature(data) {
        let celcius = data.main.temp - 273.15;
        celcius = Math.round(celcius * 10) / 10;
        $("#temperature").html(`${celcius} C`);
    }

    function getCurrentPostion() {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    }

    function geoSuccess(data) {
        console.log('geo success');
        console.log(data);
        getWeatherInfoByLatLon(data.coords.latitude, data.coords.longitude);
    }

    function geoError(error) {
        console.log('geo error');
        console.log(error);
    }
})();
