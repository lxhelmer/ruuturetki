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
  tooltipTexts,
}: {
  locations: (L.LatLngExpression | undefined)[];
  delay?: number;
  tooltipTexts?: string[];
}) {
  const map = useMap();

  // Delete possible undefined guessed location from the list
  const latlngs = locations.filter((element) => element !== undefined);

  // Fit map view to bounds if more than 1 location
  if (latlngs.length > 1) {
    setTimeout(() => {
      map.fitBounds(L.latLngBounds(latlngs), { padding: [50, 50] });
    }, delay);
  }

  return (
    <>
      {latlngs.map((position, index) => (
        <Marker position={position} key={index} icon={markerIcon}>
          <Tooltip permanent>
            {
              // Show provided tooltips or generate numbering
              tooltipTexts ? tooltipTexts[index] : index + 1
            }
          </Tooltip>
        </Marker>
      ))}
    </>
  );
}
