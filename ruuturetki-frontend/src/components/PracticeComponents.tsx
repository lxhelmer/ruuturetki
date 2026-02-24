import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { MapLayerName, SelectEvent } from "../types/types";
import {
  cityForMapLayer,
  getCityCenter,
  mapLayersForCity,
} from "../utils/mapLayerHelpers";

function PracticeComponents({
  mapLayer,
  setMapLayer,
  setPracticePos,
  setPracticeZoom,
}: {
  mapLayer: MapLayerName;
  setMapLayer: React.Dispatch<React.SetStateAction<MapLayerName>>;
  setPracticePos: React.Dispatch<React.SetStateAction<L.LatLng>>;
  setPracticeZoom: React.Dispatch<React.SetStateAction<number>>;
}) {
  const navigate = useNavigate();

  const currentCity = cityForMapLayer(mapLayer);
  const currentCityLayers = mapLayersForCity(currentCity);

  // Update map view to the state variables when moved
  const map = useMap();
  const onMove = () => {
    setPracticePos(map.getCenter());
    setPracticeZoom(map.getZoom());
  };
  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  // Trick for disabling map click event handling when control buttons are clicked
  const refControl = useRef(null);
  const refExit = useRef(null);
  useEffect(() => {
    if (refControl.current) {
      L.DomEvent.disableClickPropagation(refControl.current);
    }
    if (refExit.current) {
      L.DomEvent.disableClickPropagation(refExit.current);
    }
  }, []);

  const handleCityChange = (event: SelectEvent) => {
    // Center map view to the new city and change map layer
    const newCity = event.currentTarget.value;
    const newCenter = L.latLng(getCityCenter(newCity));
    const layerNames = mapLayersForCity(newCity);
    const newLayer = layerNames[layerNames.length - 1]; // Choose the last (=newest) map layer
    setPracticePos(newCenter);
    setMapLayer(newLayer);
  };

  return (
    <>
      <div id="controls">
        <Button id="ortolayer-selection" variant="dark" ref={refControl}>
          <Form className="ortolayer-selection">
            <Form.Select
              className="city-selection"
              defaultValue={currentCity}
              onChange={handleCityChange}
            >
              <option value="Helsinki">Helsinki</option>
              <option value="Turku">Turku</option>
              <option value="Tampere">Tampere</option>
            </Form.Select>
            {/* Get the names of all maplayers in the current map layers city */}
            {/* and display them as check buttons */}
            {currentCityLayers.map((ortolayerName) => (
              <div
                className="year-selection"
                onClick={() => setMapLayer(ortolayerName)}
              >
                <Form.Check
                  label={
                    // Displayed button name for example "1940's" or "2010's"
                    ortolayerName.match(/[0-9][0-9][0-9]/) + "0's"
                  }
                  type="radio"
                  defaultChecked={mapLayer === ortolayerName}
                />
              </div>
            ))}
          </Form>
        </Button>
        <Button
          id="home-button"
          variant="dark"
          onClick={() => navigate("/")}
          ref={refExit}
        >
          Exit
        </Button>
      </div>
    </>
  );
}

export default PracticeComponents;
