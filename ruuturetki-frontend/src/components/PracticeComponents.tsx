import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { MapLayerName } from "../types/types";

function PracticeComponents({
  mapLayer,
  setMapLayer,
  setPracticePos,
  setPracticeZoom,
  ortolayers,
  city,
  setCity,
}: {
  mapLayer: MapLayerName;
  setMapLayer: React.Dispatch<React.SetStateAction<MapLayerName>>;
  setPracticePos: React.Dispatch<React.SetStateAction<L.LatLng>>;
  setPracticeZoom: React.Dispatch<React.SetStateAction<number>>;
  ortolayers: MapLayerName[];
  city: "Helsinki" | "Turku";
  setCity: React.Dispatch<React.SetStateAction<"Helsinki" | "Turku">>;
}) {
  const navigate = useNavigate();

  //
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

  const handleCityChange = (
    event: ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    const city = event.currentTarget.value;
    if (city === "Helsinki") {
      setCity(city);
      setPracticePos(L.latLng([60.170678, 24.941543]));
      setMapLayer("avoindata:Ortoilmakuva_2019_20cm");
    } else if (city === "Turku") {
      setCity(city);
      setPracticePos(L.latLng([60.4518, 22.2666]));
      setMapLayer("Ilmakuva 2022 True ortho");
    } else {
      throw new Error("No such city!");
    }
  };

  return (
    <>
      <div id="controls">
        <Button id="ortolayer-selection" variant="dark" ref={refControl}>
          <Form className="ortolayer-selection">
            <Form.Select
              className="city-selection"
              defaultValue={city}
              onChange={handleCityChange}
            >
              <option value="Helsinki">Helsinki</option>
              <option value="Turku">Turku</option>
            </Form.Select>
            {ortolayers.map((ortolayerName) => (
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
