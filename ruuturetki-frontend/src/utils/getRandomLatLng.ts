import { cityForMapLayer } from "./mapLayerHelpers";
import { MapLayerName } from "../types/types";
import { latLng, LatLngLiteral } from "leaflet";
import { isPointInPolygon } from "geolib";

/**
 * Returns a random location inside the city of the provided map layer name.
 */
export default function getRandomLatLng(mapLayerName: MapLayerName) {
  const city = cityForMapLayer(mapLayerName);
  const polygon = getPolygonForCity(city);
  const point = getRandomPointInPolygon(polygon);
  return point;
}

/**
 * Returns a hand made polygon of the provided city.
 */
function getPolygonForCity(city: string) {
  if (city === "Helsinki") {
    return [
      { lat: 60.1373, lng: 24.8552 },
      { lat: 60.1346, lng: 25.0144 },
      { lat: 60.1612, lng: 25.0165 },
      { lat: 60.1619, lng: 25.182 },
      { lat: 60.2384, lng: 25.193 },
      { lat: 60.2298, lng: 25.1195 },
      { lat: 60.2557, lng: 25.0708 },
      { lat: 60.2731, lng: 25.0625 },
      { lat: 60.2649, lng: 24.965 },
      { lat: 60.2438, lng: 24.8476 },
    ];
  } else if (city === "Turku") {
    return [
      { lat: 60.4392, lng: 22.3465 },
      { lat: 60.3945, lng: 22.2143 },
      { lat: 60.4297, lng: 22.1333 },
      { lat: 60.4551, lng: 22.2019 },
      { lat: 60.5023, lng: 22.271 },
      { lat: 60.4905, lng: 22.3434 },
      { lat: 60.4673, lng: 22.3104 },
    ];
  } else if (city === "Tampere") {
    return [
      { lat: 61.5017, lng: 23.5766 },
      { lat: 61.4891, lng: 23.7139 },
      { lat: 61.4386, lng: 23.7541 },
      { lat: 61.4425, lng: 23.8986 },
      { lat: 61.5023, lng: 23.9436 },
      { lat: 61.5136, lng: 23.8224 },
      { lat: 61.5132, lng: 23.7212 },
      { lat: 61.5357, lng: 23.6758 },
      { lat: 61.5276, lng: 23.5735 },
    ];
  } else {
    throw new Error("Cannot define polygon for the city!");
  }
}

/**
 * Returns a random geographic point inside a polygon.
 */
function getRandomPointInPolygon(polygon: LatLngLiteral[]) {
  // Compute bounding box
  const lats = polygon.map((p) => p.lat);
  const lngs = polygon.map((p) => p.lng);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  // Pick a random location inside the bounding box until it is inside the original polygon
  while (true) {
    const point = {
      lat: Math.random() * (maxLat - minLat) + minLat,
      lng: Math.random() * (maxLng - minLng) + minLng,
    };

    // Exit the loop and return the point when it is inside the original polygon
    if (isPointInPolygon(point, polygon)) {
      return latLng(point);
    }
  }
}
