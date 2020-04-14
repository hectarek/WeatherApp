window.addEventListener('load', ()=>{
    let long;
    let lat;

    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector('.degrees-section');
    const temperatureSpan = document.querySelector('.temperature span')
    let bodyColor = document.querySelector('body')

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'

            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`

            fetch(api)
                .then(response => {
                    return response.json();
             })
                .then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;
               
                // Set DOM elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                //Formula for Celsius
                let celcius = (temperature - 32) * (5/9)

                //Set Icon
                setIcons(icon, document.querySelector('.icon'))

                //On click, changes to C and back.
                temperatureSection.addEventListener('click', ()=>{
                    if (temperatureSpan.textContent === '°F') {
                        temperatureSpan.textContent = '°C';
                        temperatureDegree.textContent = celcius.toFixed(2)
                    } else {
                        temperatureSpan.textContent = "°F";
                        temperatureDegree.textContent = temperature;
                    }
                })

                //Change background depending on the temp
                if (temperature >= 70) {
                    bodyColor.style.background = "linear-gradient(rgb(255, 240, 117), rgb(223, 72, 30))"
                } else if (temperature <= 50){
                    bodyColor.style.background = "linear-gradient(rgb(47, 150, 163), rgb(48, 62, 143))"
                } else {
                    bodyColor.style.background = "linear-gradient(rgb(236, 236, 236), rgb(86, 86, 86))"
                }

            });
        })

    } else {
        h1.textContent = "Hey, this is not working becasue of: "
    }

    //Change Icon for the current weather.
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

})

