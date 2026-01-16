import { Modal } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GameSettings } from "../../types";

function PlayModal({
  show,
  handleClosePlay,
  setGameSettings,
  gameSettings,
}: {
  show: boolean;
  handleClosePlay: () => void;
  setGameSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
  gameSettings: GameSettings;
}) {
  const navigate = useNavigate();

  return (
    <>
      <Modal
        show={show}
        onHide={handleClosePlay}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Time to get mapping!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="gamemode-selection">
            <Form>
              <Form.Check
                inline
                label="no moving"
                type="switch"
                onClick={() => {
                  console.log("Moving allowed?", !gameSettings.dragging);
                  setGameSettings({
                    ...gameSettings,
                    dragging: !gameSettings.dragging,
                  });
                }}
              />
              <Form.Check
                inline
                label="timed"
                type="switch"
                onClick={() => {
                  console.log("Timed mode?", !gameSettings.timed);
                  setGameSettings({
                    ...gameSettings,
                    timed: gameSettings.timed ? false : 15, // Switch between options false and 10
                  });
                }}
              />
            </Form>
          </div>
          <div id="year-selection">
            <Button
              className="y-button"
              variant="secondary"
              onClick={() => {
                setGameSettings({
                  ...gameSettings,
                  map: "avoindata:Ortoilmakuva_1943",
                  city: "Helsinki",
                  wmsurl: "https://kartta.hel.fi/ws/geoserver/avoindata/wms?",
                  attribution:
                    '&copy; <a href=https://hri.fi/data/fi/dataset/helsingin-ortoilmakuvat target="_blank">Helsingin kaupunki, kaupunkimittauspalvelut 2025</a>',
                  year: 1943,
                });
                navigate("/game");
              }}
            >
              1940's
            </Button>
            <Button
              className="y-button"
              variant="secondary"
              onClick={() => {
                setGameSettings({
                  ...gameSettings,
                  map: "avoindata:Ortoilmakuva_1969",
                  city: "Helsinki",
                  wmsurl: "https://kartta.hel.fi/ws/geoserver/avoindata/wms?",
                  attribution:
                    '&copy; <a href=https://hri.fi/data/fi/dataset/helsingin-ortoilmakuvat target="_blank">Helsingin kaupunki, kaupunkimittauspalvelut 2025</a>',
                  year: 1969,
                });
                navigate("/game");
              }}
            >
              1960's
            </Button>
            <Button
              className="y-button"
              variant="secondary"
              onClick={() => {
                setGameSettings({
                  ...gameSettings,
                  map: "avoindata:Ortoilmakuva_1997",
                  city: "Helsinki",
                  wmsurl: "https://kartta.hel.fi/ws/geoserver/avoindata/wms?",
                  attribution:
                    '&copy; <a href=https://hri.fi/data/fi/dataset/helsingin-ortoilmakuvat target="_blank">Helsingin kaupunki, kaupunkimittauspalvelut 2025</a>',
                  year: 1997,
                });
                navigate("/game");
              }}
            >
              1990's
            </Button>
            <Button
              className="y-button"
              variant="secondary"
              onClick={() => {
                setGameSettings({
                  ...gameSettings,
                  map: "avoindata:Ortoilmakuva_2024_5cm",
                  city: "Helsinki",
                  wmsurl: "https://kartta.hel.fi/ws/geoserver/avoindata/wms?",
                  attribution:
                    '&copy; <a href=https://hri.fi/data/fi/dataset/helsingin-ortoilmakuvat target="_blank">Helsingin kaupunki, kaupunkimittauspalvelut 2025</a>',
                  year: 2024,
                });
                navigate("/game");
              }}
            >
              2020's
            </Button>
          </div>
          <div id="turku">
            <Button
              className="y-button"
              variant="secondary"
              onClick={() => {
                setGameSettings({
                  ...gameSettings,
                  map: "Ilmakuva 2022 True ortho",
                  city: "Turku",
                  wmsurl: "https://opaskartta.turku.fi/TeklaOGCWeb/WMS.ashx",
                  attribution:
                    '&copy; <a href=https://www.avoindata.fi/data/fi/dataset/turun-seudun-ilmakuva target="_blank">Turun Kaupunkiympäristö</a>',
                  year: 2022,
                });
                navigate("/game");
              }}
            >
              2020's
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PlayModal;
