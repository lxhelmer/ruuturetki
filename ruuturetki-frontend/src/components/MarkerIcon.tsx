import defaultIcon from "leaflet/dist/images/marker-icon.png";
import iconImg2 from "./../../images/marker-icon2.png";
import iconImg3 from "./../../images/marker-icon3.png";
import iconShadowImg from "leaflet/dist/images/marker-shadow.png";
import L, { IconOptions } from "leaflet";

const iconOptions: Omit<IconOptions, "iconUrl"> = {
  shadowUrl: iconShadowImg,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
};

export const markerIconDefault = L.icon({
  iconUrl: defaultIcon,
  ...iconOptions,
});

export const markerIconBlue = L.icon({
  iconUrl: iconImg2,
  ...iconOptions,
});

export const markerIconOrange = L.icon({
  iconUrl: iconImg3,
  ...iconOptions,
});
