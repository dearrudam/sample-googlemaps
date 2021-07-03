/*
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable no-undef, @typescript-eslint/no-unused-vars, no-unused-vars */
import "./style.css";
import recycling_truck from './images/recycling-truck.ico';
//function that gets the location and returns it


function error() {
  alert('Sorry, no position available.');
}

const options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
};


let marker: google.maps.Marker;
let centerLocation: google.maps.LatLng;

function addMarker(latLng: google.maps.LatLng) {
  if ((window as any).map) {
    const map = (window as any).map as google.maps.Map;
    const bounds = google.maps.geometry.spherical.computeDistanceBetween(centerLocation, latLng);
    if (bounds <= 100) {
      if (marker) {
        marker.setMap(null);
      }

      const image = 
      {
        url: "https://maps.google.com/mapfiles/kml/shapes/truck.png",
        // This marker is 20 pixels wide by 32 pixels high.
        // size: new google.maps.Size(24, 24),
        // The origin for this image is (0, 0).
      //  origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        // anchor: new google.maps.Point(0, 32),
      };

      marker = new google.maps.Marker({
        map,
        icon: image,
        animation: google.maps.Animation.BOUNCE,
        position: latLng,
      });
    }
  }
};

// let circle: google.maps.Circle;
//request for location
// Initialize and add the map
function initMap(): void {

  if (navigator.geolocation) {
    const watchID = navigator.geolocation.watchPosition(
      (position) => {
        centerLocation = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        console.log(centerLocation);

        const map = (window as any).map = new google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            zoom: 20,
            center: centerLocation,
          }
        );

        (window as any).map = map;

        // This event listener will call addMarker() when the map is clicked.
        map.addListener("click", (event) => {
          console.log(event);
          addMarker(event.latLng);
        });


        // The marker, positioned at Uluru
        const marker = new google.maps.Marker({
          position: centerLocation,
          map: map,
        });

        /* const rectangle = new google.maps.Rectangle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map,
          bounds: {
            north: myposition.lat + 0.0005,
            south: myposition.lat - 0.0005,
            east: myposition.lng + 0.0005,
            west: myposition.lng - 0.0005,
          },
        }); */

        // circle = new google.maps.Circle({
        //   strokeColor: "#FF0000",
        //   strokeOpacity: 0.8,
        //   strokeWeight: 2,
        //   fillColor: "#FF0000",
        //   fillOpacity: 0.2,
        //   map,
        //   center: centerLocation,
        //   radius: Math.sqrt(1) * 100,
        // });
        // window['circle'] = circle;

        // console.log(circle.getBounds());

      }, error, options);
  } else {
    console.log("Geo Location not supported by browser");
  }


}
export { initMap };
