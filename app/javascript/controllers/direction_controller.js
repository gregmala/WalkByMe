import { Controller } from "@hotwired/stimulus"
import mapboxgl from "mapbox-gl";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

export default class extends Controller {
  static targets = ['link','eta','timer']
  static values = {id: Number, user: Object}
  connect() {
    console.log("by")
    mapboxgl.accessToken = "pk.eyJ1IjoicGllcnJlamViYXJhIiwiYSI6ImNsZHloNXl5bTA3MWIzdnM1amNqbmFkanUifQ.k9o5mCT3bt0X6C-b6JPskA";
    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [40.413819386164036, -3.6698255290660855],
      zoom: 12,
    });
    this.initializeMap();
    console.dir(this.timerTarget);

  }

  initializeMap() {
    this.directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/walking",
      flyTo: false,
    });

    const geocodingEndpoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

    // Replace these with your own addresses
    const originAddress = 'Calle del Doctor Esquerdo 70, Madrid, Spain';
    const destinationAddress = 'Calle del Doctor Esquerdo 80, Madrid, Spain';

    // Geocode origin address
    const originGeocodeUrl = `${geocodingEndpoint}${encodeURIComponent(originAddress)}.json?access_token=${mapboxgl.accessToken}`;
    fetch(originGeocodeUrl)
      .then(response => response.json())
      .then(data => {
        const originCoordinates = data.features[0].center;
        // Use the coordinates to set the origin on the map
        this.directions.setOrigin(originCoordinates);
      });

    // Geocode destination address
    const destinationGeocodeUrl = `${geocodingEndpoint}${encodeURIComponent(destinationAddress)}.json?access_token=${mapboxgl.accessToken}`;
    fetch(destinationGeocodeUrl)
      .then(response => response.json())
      .then(data => {
        const destinationCoordinates = data.features[0].center;
        // Use the coordinates to set the destination on the map
        this.directions.setDestination(destinationCoordinates);
      });

    this.map.addControl(this.directions, "bottom-left");
    this.directions.on("route", (e) => {
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
      const stepps = document.querySelectorAll(".mapbox-directions-step")
      // document.querySelector(".mapbox-directions-origin").classList.add("display")
      // document.querySelector(".mapbox-directions-destination").classList.add("display")
      // document.querySelector(".mapbox-directions-component .mapbox-directions-inputs").classList.add("display")
      let stepDurations = new Array();
      stepsList.forEach((stepList)=> {
        stepDurations.push(stepList.duration);
      })

      let remainingTimeInSeconds = route.duration;
      let remainingTimeInMinutes = Math.floor(remainingTimeInSeconds / 60);
      let remainingTimeInSecs = remainingTimeInSeconds % 60;
      this.timerTarget.innerText = `${remainingTimeInMinutes}m ${remainingTimeInSecs}s`;


      let timerInterval = setInterval(() => {
        remainingTimeInSeconds--;
        remainingTimeInMinutes = Math.floor(remainingTimeInSeconds / 60);
        remainingTimeInSecs = Math.round((remainingTimeInSeconds % 60));
        this.timerTarget.innerHTML = `${remainingTimeInMinutes}m ${remainingTimeInSecs}s`;

        if (remainingTimeInSeconds <= 0) {
          clearInterval(timerInterval);
          this.linkTarget.classList.remove("end-link");
          this.linkTarget.classList.add("end-link-show");
          this.timerTarget.innerText = '0m 0s';
          fetch("/danger_text", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
            }
          })
            .then(response => response.json)
            .then(data => console.log(data))
            .catch(error => console.log(error))
        }

        if (remainingTimeInMinutes < 5) {
          const mapTimer = document.querySelector(".timer")
          mapTimer.style.backgroundColor = "red"
        }
      }, 1000);

      // console.log(stepDurations)
      let ETA = Math.round(route.duration);
      stepps.forEach((step, index) => {
        step.addEventListener('click', (e) => {
          console.log(step)
          console.log(index - stepDurations.length);
          ETA = Math.round(ETA - Math.round(stepDurations[index - stepDurations.length]));
          this.etaTarget.innerText = ""
          this.etaTarget.innerText = `${Math.round((ETA/60))}`
          stepps[index+1].scrollIntoView({behavior: "smooth"})
          this.recordData1({
            eta: Math.round((ETA/60)),
          });
          if (ETA < 100) {
            this.linkTarget.classList.remove("end-link")
            this.linkTarget.classList.add("end-link-show")
          }
          const eta = document.querySelector(".map-eta")
          eta.style.display = "flex"
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
