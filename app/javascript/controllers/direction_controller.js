import { Controller } from "@hotwired/stimulus"
import mapboxgl from "mapbox-gl";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

export default class extends Controller {
  static targets = ['link','eta']
  static values = {id: Number}
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
      profile: "mapbox/walking",
      flyTo: false,
    });

    this.map.addControl(this.directions, "top-left");
    this.directions.on("route", (e) => {
      // this.searchBar.style.display = none;
      this.searchBar = document.querySelector(".mapbox-directions-component-keyline > .mapboxgl-ctrl-directions-search");
      searchBar.style.display = "none"
      console.log("aaaa")
      const stepsList = e.route[0].legs[0].steps
      const route = e.route[0];
      const destination = this.directions.getDestination().geometry.coordinates;
      this.recordData({
        estimated_time_for_arrival: Math.round(route.duration / 60),
        destination_latitude: destination[1],
        destination_longitude: destination[0],
      });
      // if (route.duration < 300) {
      //   this.linkTarget.classList.remove("end-link")
      //   this.linkTarget.classList.add("end-link-show")
      // }
      const steps = document.querySelectorAll(".mapbox-directions-step")

      let stepDurations = new Array();
      stepsList.forEach((stepList)=> {
        // console.log(stepList);
        stepDurations.push(stepList.duration);
      })

      // console.log(stepDurations)
      let ETA = Math.round(route.duration )

      steps.forEach((step, index) => {
        step.addEventListener('click', (e) => {
          ETA = Math.round(ETA - Math.round(stepDurations[index]));
          this.etaTarget.innerText = ""
          console.dir(this.etaTarget)
          this.etaTarget.innerText = `${Math.round((ETA/60))}`

          this.recordData1({
            eta: Math.round((ETA/60)),
          });

          if (ETA < 100) {
            this.linkTarget.classList.remove("end-link")
            this.linkTarget.classList.add("end-link-show")
          }
        })
      })



    });
  }

  recordData(data) {
    let csrf_token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch (`/checkins/${this.idValue}`, {
      method: "PATCH",
      headers: {
        "X-CSRF-Token": csrf_token,
        "Content-Type": "application/json",
        Accept: "text/vnd.turbo-stream.html"
      },
      body: JSON.stringify({ checkin: data })
      // console.log(body)
    })
  }

  recordData1(data) {
    let csrf_token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch (`/checkins/${this.idValue}`, {
      method: "PATCH",
      headers: {
        "X-CSRF-Token": csrf_token,
        "Content-Type": "application/json",
        Accept: "text/vnd.turbo-stream.html"
      },
      body: JSON.stringify({ checkin: data })
      // console.log(body)
    })
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
