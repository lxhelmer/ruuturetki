import {
  MapLayerName,
  MapLayerNameHelsinki,
  MapLayerNameTurku,
} from "../types/types";
import { TileLayerProps, WMSTileLayerProps } from "react-leaflet";

const helsinkiMapLayers: Set<MapLayerName> = new Set(
  mapLayersForCity("Helsinki"),
);
const turkuMapLayers: Set<MapLayerName> = new Set(mapLayersForCity("Turku"));

/**
 * Returns maplayers for the provided city name.
 */
export function mapLayersForCity(city: string) {
  if (city === "Helsinki") {
    const mapLayers: MapLayerNameHelsinki[] = [
      "avoindata:Ortoilmakuva_1943",
      "avoindata:Ortoilmakuva_1969",
      "avoindata:Ortoilmakuva_1997",
      "avoindata:Ortoilmakuva_2019_20cm",
      "avoindata:Ortoilmakuva_2024_5cm",
    ];
    return mapLayers;
  } else if (city === "Turku") {
    const maplayers: MapLayerNameTurku[] = [
      "Turku ilmakuva 1939",
      "Turun Osoitekartta 1945",
      "Turku ilmakuva 1958",
      "Turku ilmakuva 1973",
      "Turku ilmakuva 1998",
      "Turku ilmakuva 2010",
      "Ilmakuva 2022 True ortho",
    ];
    return maplayers;
  } else {
    throw new Error("Cannot find maplayers for the city!");
  }
}

/**
 * Returns WMSOptions for the provided map layer name.
 */
export function wmsOptionsForMapLayer(mapLayerName: MapLayerName) {
  if (helsinkiMapLayers.has(mapLayerName)) {
    const wmsOptions: WMSTileLayerProps = {
      layers: mapLayerName,
      url: "https://kartta.hel.fi/ws/geoserver/avoindata/wms?",
      attribution:
        '&copy; <a href=https://hri.fi/data/fi/dataset/helsingin-ortoilmakuvat target="_blank">Helsingin kaupunki, kaupunkimittauspalvelut 2025</a>',
      version: "1.1.1.1",
      format: "image/png",
    };
    return wmsOptions;
  } else if (turkuMapLayers.has(mapLayerName)) {
    const wmsOptions: WMSTileLayerProps = {
      layers: mapLayerName,
      url: "https://turku.asiointi.fi/teklaogcweb/WMS.ashx",
      attribution:
        '&copy; <a href=https://www.avoindata.fi/data/fi/dataset/turun-seudun-ilmakuva target="_blank">Turun Kaupunkiympäristö</a>',
      version: "1.1.1",
      format: "image/png",
    };
    return wmsOptions;
  } else {
    throw new Error("Cannot define WMS Options!");
  }
}

/**
 * Returns city of the provided map layer.
 */
export function cityForMapLayer(mapLayerName: MapLayerName) {
  if (helsinkiMapLayers.has(mapLayerName)) {
    return "Helsinki";
  } else if (turkuMapLayers.has(mapLayerName)) {
    return "Turku";
  } else {
    throw new Error("Cannot define city!");
  }
}

/**
 * Returns default tile layer options.
 */
export function tileLayerOptions(): TileLayerProps {
  return {
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    url: "https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png",
  };
}

/**
 * Returns decade of the provided map layer. For example: 1990's, 2000's, 1930's.
 */
export function decadeForMapLayer(mapLayerName: MapLayerName) {
  return mapLayerName.match(/[0-9][0-9][0-9]/) + "0's";
}
