import L from "leaflet";
import { Marker, Tooltip, useMap } from "react-leaflet";
import markerIcon from "./MarkerIcon";

/**
 * Returns markers for the provided latlng locations
 * and fits the map view to the markers after the delay.
 * Must be called inside Leaflet Mapcontainer component.
 * Delay defaults to 1.5 seconds.
 */
export default function MapMarkers({
  locations,
  delay = 1500,
}: {
  locations: L.LatLngExpression[];
  delay?: number;
}) {
  const map = useMap();
  setTimeout(() => {
    map.fitBounds(L.latLngBounds(locations), { padding: [50, 50] });
  }, delay);

  return (
    <>
      {locations.map((position, index) => (
        <Marker position={position} key={index} icon={markerIcon}>
          <Tooltip permanent>{index + 1}</Tooltip>
        </Marker>
      ))}
    </>
  );
}
