async function start(){
    mapboxgl.accessToken = 'PLACE YOUR ACCESS TOKEN HERE';

    // This array contains the coordinates for all bus stops between MIT and Harvard
    const vehicles = await getVehicleLocations();
    
    // This is the map instance
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [vehicles[0].longitude, vehicles[0].latitude],
        zoom: 14,
    });
    
    let marker = new mapboxgl.Marker()
    .setLngLat([vehicles[0].longitude, vehicles[0].latitude])
    .addTo(map);
    
    // counter here represents the index of the current bus stop
    // let counter = 0;
    // function move() {
    //     if(counter>=busStops.length) return;
    //     marker.setLngLat(busStops[counter]);
    //     counter++;
    //     setTimeout(move,1000);
    // }

    async function run(){
        // get vehicles data    
        const locations = await getVehicleLocations();
        console.log(new Date());
        console.log(locations);
        marker.setLngLat([locations[0].longitude, locations[0].latitude]);
        
        // timer
        setTimeout(run, 15000);
    }

    // Request bus data from LA Metro
    async function getVehicleLocations(){
        const url = 'https://api.metro.net/agencies/lametro/vehicles/';
        const response = await fetch(url);
        const json     = await response.json();
        return json.items.slice(0, 10);
    }

    run();
}