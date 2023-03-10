// import { Controller } from "@hotwired/stimulus"
// import mapboxgl from "mapbox-gl"
// import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

// // Connects to data-controller="mapdirection"
// class MapDirectionController extends Controller {

//   connect() {
//     this.initializeMap()
//   }

//   initializeMap() {
//     const publicToken = "pk.eyJ1IjoicGllcnJlamViYXJhIiwiYSI6ImNsZHloNXl5bTA3MWIzdnM1amNqbmFkanUifQ.k9o5mCT3bt0X6C-b6JPskA"

//     mapboxgl.accessToken = publicToken

//     // create a new map object
//     this.mapbox = new mapboxgl.Map({
//       container: this.element,
//       style: "mapbox://style/mapbox/streets-v11",
//       center: [-74, 40.7128],
//       zoom: 12,
//       projection: "globe"
//     })

//     // create the geolocate control and add it to the map
//     this.geolocate = new mapboxgl.GeolocateControl({
//       positionOptions: {enableHighAccuracy: true},
//       trackUserLocation: true,
//       showUserHeading: true,
//     })

//     this.mapbox.addControl(this.geolocate)

//     // initialize the directions control
//     this.directions = new MapboxDirections({
//       accessToken: mapboxgl.accessToken,
//       unit: "metric",
//       profile: "mapbox/driving",
//       flyTo: false,
//       controls: {
//         instructions: false,
//         inputs: false,
//         profileSwitcher: false,
//       },
//       interactive: false,
//     })

//     // add the directions control to the map
//     this.mapbox.addControl(this.directions, "top-left")

//     // set the origin of the directions control to the user's location
//     this.geolocate.on("geolocate", (e) => {
//       const origin = [e.coords.longitude, e.coords.latitude]
//       this.directions.setOrigin(origin)
//     })
//   }
// }

// export default class extends MapDirectionController {
//   static targets = ["directionsForm"]

//   connect() {
//     super.connect()
//     this.initializeDirectionForm()
//   }

//   initializeDirectionForm() {
//     // set the destination of the directions control to the value of the destination input
//     const destinationInput = this.directionsFormTarget.querySelector("[name='destination']")
//     this.directions.setDestination(destinationInput.value)

//     // submit the form when the directions are re-routed
//     this.directions.on("route", () => {
//       this.directionsFormTarget.submit()
//     })
//   }

//   connectDirection(event) {
//     event.preventDefault()

//     // update the destination of the directions control and re-route
//     const destinationInput = event.currentTarget.querySelector("[name='destination']")
//     const destination = destinationInput.value
//     this.directions.setDestination(destination)
//     this.directions.query()
//   }
// }
