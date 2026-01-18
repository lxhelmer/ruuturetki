import L from "leaflet";

export default function getRandomLatLng(city: "Helsinki" | "Turku") {
  let southBoundLat = 0;
  let northBoundLat = 0;
  let eastBoundLon = 0;
  let westBoundLon = 0;
  if (city === "Turku") {
    southBoundLat = 60.428;
    northBoundLat = 60.468;
    eastBoundLon = 22.228;
    westBoundLon = 22.289;
  } else if (city === "Helsinki") {
    southBoundLat = 60.19;
    northBoundLat = 60.29;
    eastBoundLon = 25.2;
    westBoundLon = 24.825;
  }
  const randomLat =
    Math.random() * (northBoundLat - southBoundLat) + southBoundLat;
  const randomLon =
    Math.random() * (eastBoundLon - westBoundLon) + westBoundLon;
  return L.latLng(randomLat, randomLon);
}
