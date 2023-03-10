// import { Controller } from "@hotwired/stimulus"
// import mapboxgl from "mapbox-gl"
// import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

// export default class extends Controller {
//   connect() {
//     this.public_token = "pk.eyJ1IjoicGllcnJlamViYXJhIiwiYSI6ImNsZHloNXl5bTA3MWIzdnM1amNqbmFkanUifQ.k9o5mCT3bt0X6C-b6JPskA"
//     this.initializeMap()

//   }

//   initializeMap() {
//     mapboxgl.accessToken = this.public_token
//     this.mapbox = new mapboxgl.Map({
//       container: this.element,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [-74,48],
//       zoom: 10,
//       // projection: "globe"
//     })

//     // Add direction controller
//     this.directionController = new MapboxDirections({
//       accessToken: mapboxgl.accessToken,
//       unit: "metric",
//       profile: "mapbox/driving",
//       flyTo: false,
//     });

//     this.mapbox.addControl(this.directionController, "top-left");

//     this.directionController.on("route", (e) => {
//       const route = e.route[0];
//       // console.log(`Distance: ${route.distance} meters`);
//       // console.log(`Duration: ${route.duration} seconds`);
//       this.recordData1(route)
//     });

//     // Add geolocation controller
//     this.geolocate = new mapboxgl.GeolocateControl({
//       positionOptions: {enableHighAccuracy: true},
//       trackUserLocation: true,
//       showUserHeading: true,
//     })

//     this.mapbox.addControl(this.geolocate)

//     this.geolocate.on('geolocate', (e) => {
//       this.recordData(e)
//     })

//   }

//   recordData(e) {
//     let data = {
//       checkin: {
//         latitude: e.coords.latitude,
//         longitude: e.coords.longitude,
//         recorded_on: e.timestamp
//       }
//     }


//     let csrf_token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content')
//     fetch ("/checkins", {
//       method: "POST",
//       headers: {
//         "X-CSRF-Token": csrf_token,
//         "Content-Type": "application/json",
//         Accept: "text/vnd.turbo-stream.html"
//       },

//       body: JSON.stringify(data)
//     })
//   }

//   recordData1(route) {
//     let data = {
//       checkin: {
//         estimated_time_for_arrival: Math.round(route.duration / 60)
//       }
//     }


//     let csrf_token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content')
//     fetch ("/checkins", {
//       method: "POST",
//       headers: {
//         "X-CSRF-Token": csrf_token,
//         "Content-Type": "application/json",
//         Accept: "text/vnd.turbo-stream.html"
//       },

//       body: JSON.stringify(data)
//     })
//   }



//   disconnect() {
//     this.mapbox.removeControl(this.geolocate);
//     this.mapbox.removeControl(this.directionController);
//     this.mapbox.remove();
//   }
// }


import { Controller } from "@hotwired/stimulus"
import mapboxgl from "mapbox-gl"
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

export default class extends Controller {
  connect() {
    this.public_token = "pk.eyJ1IjoicGllcnJlamViYXJhIiwiYSI6ImNsZHloNXl5bTA3MWIzdnM1amNqbmFkanUifQ.k9o5mCT3bt0X6C-b6JPskA"
    this.initializeMap()

  }

  initializeMap() {
    mapboxgl.accessToken = this.public_token
    this.mapbox = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74,48],
      zoom: 10,
    })

    // Add direction controller
    this.directionController = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
      flyTo: false,
    });

    this.mapbox.addControl(this.directionController, "top-left");

    this.directionController.on("route", (e) => {
      const route = e.route[0];
      const destination = this.directionController.getDestination().geometry.coordinates;
      console.log(destination)
      this.recordData({
        latitude: this.geolocate._lastKnownPosition.coords.latitude,
        longitude: this.geolocate._lastKnownPosition.coords.longitude,
        recorded_on: this.geolocate._lastKnownPosition.timestamp,
        estimated_time_for_arrival: Math.round(route.duration / 60),
        destination_latitude: destination[1],
        destination_longitude: destination[0],
      });
    });

    // Add geolocation controller
    this.geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {enableHighAccuracy: true},
      trackUserLocation: true,
      showUserHeading: true,
    })

    this.mapbox.addControl(this.geolocate)

    this.geolocate.on('geolocate', (e) => {
      // do nothing
    })

  }

  recordData(data) {
    let csrf_token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch ("/checkins", {
      method: "POST",
      headers: {
        "X-CSRF-Token": csrf_token,
        "Content-Type": "application/json",
        Accept: "text/vnd.turbo-stream.html"
      },
      body: JSON.stringify({ checkin: data })
    })
  }

  disconnect() {
    this.mapbox.removeControl(this.geolocate);
    this.mapbox.removeControl(this.directionController);
    this.mapbox.remove();
  }
}
