import L from "leaflet";
import { Marker, Tooltip, useMap } from "react-leaflet";
import { markerIconBlue, markerIconOrange } from "./MarkerIcon";

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
      map.fitBounds(L.latLngBounds(latlngs), { padding: [40, 40] });
    }, delay);
  }

  // Show tooltip on hover in REM and permanently when showing 5 locations
  const permanent = latlngs.length !== 2;

  // Use these icons when there are only two markers, otherwise use the blue icon
  const icons = [markerIconBlue, markerIconOrange];

  return (
    <>
      {latlngs.map((position, index) => (
        <Marker
          position={position}
          key={index}
          icon={latlngs.length === 2 ? icons[index] : markerIconBlue}
        >
          <Tooltip permanent={permanent}>
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
