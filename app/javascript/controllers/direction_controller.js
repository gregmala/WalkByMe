import { Controller } from "@hotwired/stimulus"
import mapboxgl from "mapbox-gl";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

export default class extends Controller {

  connect() {
    mapboxgl.accessToken = "pk.eyJ1IjoicGllcnJlamViYXJhIiwiYSI6ImNsZHloNXl5bTA3MWIzdnM1amNqbmFkanUifQ.k9o5mCT3bt0X6C-b6JPskA";

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74, 40.7128],
      zoom: 12,
    });

    this.initializeMap();
  }

  initializeMap() {
    this.directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
      flyTo: false,
    });

    this.map.addControl(this.directions, "top-left");

    this.directions.on("route", (e) => {
      const route = e.route[0];
      console.log(`Distance: ${route.distance} meters`);
      console.log(`Duration: ${route.duration} seconds`);
    });
  }

  disconnect() {
    this.map.removeControl(this.directions);
    this.map.remove();
  }

  connectDirection(e) {
    e.preventDefault();
    const origin = [-74.006, 40.7128];
    const destination = [-73.985, 40.7589];
    this.directions.setOrigin(origin);
    this.directions.setDestination(destination);
    this.directions.query();
  }
}
