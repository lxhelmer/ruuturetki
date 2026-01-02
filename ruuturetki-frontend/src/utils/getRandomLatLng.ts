import L from "leaflet";

export default function getRandomLatLng() {
  const southBoundLat = 60.19;
  const northBoundLat = 60.29;
  const eastBoundLon = 25.2;
  const westBoundLon = 24.825;
  const randomLat =
    Math.random() * (northBoundLat - southBoundLat) + southBoundLat;
  const randomLon =
    Math.random() * (eastBoundLon - westBoundLon) + westBoundLon;
  return L.latLng(randomLat, randomLon);
}
