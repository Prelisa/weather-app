window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription= document.querySelector('.temperature-description');
    let temperaturedegree= document.querySelector('.temperature-degree');
    let locationTimezone= document.querySelector('.location-timezone');
    let degreesection=document.querySelector('.temperature');
    const temperatureSpan=document.querySelector('.temperature span')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition (position=>{

            long =position.coords.longitude;
            lat= position.coords.latitude;
            const proxy='http://cors-anywhere.herokuapp.com/';
            const api=`${proxy}https://api.darksky.net/forecast/302490c981b02e1c94e0ffd53ab55397/${lat},${long}`;
            
            fetch(
                api
            )
                .then(response=>{
                    return response.json();
            })
                .then(data=>{
                
                const {temperature,summary,icon} = data.currently;
                //set DOM Elements from API
                temperaturedegree.textContent= temperature;
                temperatureDescription.textContent= summary;
                locationTimezone.textContent= data.timezone;

                    //fORMULA FOR CELSIUS
                    let celsius=(temperature -32)*(5/9);


                //set Icons
                setIcons(icon, document.querySelector('.icon'));



            //change F to celsius
            degreesection.addEventListener('click',()=>{
                if(temperatureSpan.textContent==="F"){
                    temperatureSpan.textContent="C";
                    temperaturedegree.textContent=Math.floor(celsius);
                }
                else{
                    temperatureSpan.textContent="F";
                    temperaturedegree.textContent=temperature;
                }
            })

            });
        });
       
    }


    function setIcons(icon, iconID){
        const skycons= new Skycons({color: "white"});
        const currentIcon= icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }


});