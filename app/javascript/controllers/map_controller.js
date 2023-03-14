import { Controller } from "@hotwired/stimulus"
import mapboxgl from "mapbox-gl"


// Connects to data-controller="map"
export default class extends Controller {
  connect() {
    this.publicToken = "pk.eyJ1IjoicGllcnJlamViYXJhIiwiYSI6ImNsZHloNXl5bTA3MWIzdnM1amNqbmFkanUifQ.k9o5mCT3bt0X6C-b6JPskA";
    this.initializeMap()
  }
  initializeMap() {
    mapboxgl.accessToken = this.publicToken
    this.mapbox = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://style/mapbox/streets-v11",
      center: [40.413750,-3.669880],
      zoom: 10,
    })

    this.geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {enableHighAccuracy: true},
      trackUserLocation: true,
      showUserHeading: true,
    })

    this.mapbox.addControl(this.geolocate)

  }
}
