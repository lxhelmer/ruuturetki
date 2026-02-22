import L from "leaflet";
import { MapLayerName } from "../types/types";
import { cityForMapLayer } from "./mapLayerHelpers";

export default function getRandomLatLng(MapLayerName: MapLayerName) {
  const city = cityForMapLayer(MapLayerName);
  let southBoundLat = 0;
  let northBoundLat = 0;
  let eastBoundLon = 0;
  let westBoundLon = 0;
  if (city === "Turku") {
    // Turku bounding box
    const box = {
      SW: { lat: 60.428, lng: 22.228 },
      NE: { lat: 60.468, lng: 22.289 },
    };
    const randomLat = Math.random() * (box.NE.lat - box.SW.lat) + box.SW.lat;
    const randomLon = Math.random() * (box.NE.lng - box.SW.lng) + box.SW.lng;
    return L.latLng(randomLat, randomLon);
  } else /* city === "Helsinki" */ {
    // To prevent black screen specially in 2020's
    // Helsinki is divided into two adjacent bounding boxes.
    // First (left, west) box dimensions: SW=(60.1417, 24.8541); NE(60.2524, 25.0124)
    // Second (right, east) box dimensions: SW=(60.1614, 25.0124); NE(60.2377, 25.2048)
    const firstBox = {
      SW: { lat: 60.1417, lng: 24.8541 },
      NE: { lat: 60.2524, lng: 25.0124 },
    };
    const secondBox = {
      SW: { lat: 60.1614, lng: 25.0124 },
      NE: { lat: 60.2377, lng: 25.2048 },
    };

    // First random longitude is selected. Then latitude is selected from the first
    // or the second bounding box depending on which one includes the longitude.
    westBoundLon = firstBox.SW.lng;
    eastBoundLon = secondBox.NE.lng;
    const randomLon =
      Math.random() * (eastBoundLon - westBoundLon) + westBoundLon;
    // Check which box includes longitude. Then adjust south and north bounds
    // to match that box.
    if (randomLon < 25.0124) {
      // Random lng belongs to the first box, set bounds to the first box bounds
      southBoundLat = firstBox.SW.lat;
      northBoundLat = firstBox.NE.lat;
    } else {
      // Random lng belongs to the second box, set bounds to the second box bounds
      southBoundLat = secondBox.SW.lat;
      northBoundLat = secondBox.NE.lat;
    }
    const randomLat =
      Math.random() * (northBoundLat - southBoundLat) + southBoundLat;
    return L.latLng(randomLat, randomLon);
  }
}
