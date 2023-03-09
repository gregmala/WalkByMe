import { Controller } from "@hotwired/stimulus"
import mapboxgl from "mapbox-gl"
// import "mapbox-gl/dist/mapbox-gl.css"

// Connects to data-controller="map"
export default class extends Controller {
  connect() {
    this.public_token = "pk.eyJ1IjoicGllcnJlamViYXJhIiwiYSI6ImNsZHloNXl5bTA3MWIzdnM1amNqbmFkanUifQ.k9o5mCT3bt0X6C-b6JPskA"
    this.initializeMap()

  }
  initializeMap() {
    mapboxgl.accessToken = this.public_token
    this.mapbox = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://style/mapbox/streets-v11",
      center: [-74,48],
      zoom: 10,
      projection: "globe"
    })


    this.geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {enableHighAccuracy: true},
      trackUserLocation: true,
      showUserHeading: true,
    })

    this.mapbox.addControl(this.geolocate)



    this.geolocate.on('geolocate', (e) => {
      this.recordData(e)
    })
  }

  recordData(e) {
    let data = {
      checkin: {
        latitude: e.coords.latitude,
        longitude: e.coords.longitude,
        recorded_on: e.timestamp
      }
    }

    let csrf_token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch ("/checkins", {
      method: "POST",
      headers: {
        "X-CSRF-Token": csrf_token,
        "Content-Type": "application/json",
        Accept: "text/vnd.turbo-stream.html"
      },

      body: JSON.stringify(data)
    })
  }
}
