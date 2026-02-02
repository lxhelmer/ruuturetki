import { Modal } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GameSettings } from "../../types/types";

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

  const ortolayersHelsinki: GameSettings["ortolayer"][] = [
    "avoindata:Ortoilmakuva_1943",
    "avoindata:Ortoilmakuva_1969",
    "avoindata:Ortoilmakuva_1997",
    "avoindata:Ortoilmakuva_2024_5cm",
  ];
  const ortolayersTurku: GameSettings["ortolayer"][] = [
    "Turku ilmakuva 1939",
    "Turku ilmakuva 1958",
    "Turku ilmakuva 1973",
    "Turku ilmakuva 1998",
    "Turku ilmakuva 2010",
    "Ilmakuva 2022 True ortho",
  ];

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
        <Modal.Body id="play-modal-body">
          <label htmlFor="game-settings" className="play-modal-label">
            Game settings
          </label>
          <div id="game-settings">
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
          <label htmlFor="helsinki" className="play-modal-label">
            Helsinki
          </label>
          <div id="helsinki">
            {/* Helsinki ortolayer buttons */}
            {ortolayersHelsinki.map((layerName) => (
              <Button
                className="y-button"
                variant="secondary"
                onClick={() => {
                  setGameSettings({
                    ...gameSettings,
                    city: "Helsinki",
                    ortolayer: layerName,
                    wmsurl: "https://kartta.hel.fi/ws/geoserver/avoindata/wms?",
                    attribution:
                      '&copy; <a href=https://hri.fi/data/fi/dataset/helsingin-ortoilmakuvat target="_blank">Helsingin kaupunki, kaupunkimittauspalvelut 2025</a>',
                    wmsversion: "1.1.1.1",
                  });
                  navigate("/game");
                }}
              >
                {/* Displayed button name for example "1940's" or "2010's" */}
                {layerName.match(/[0-9][0-9][0-9]/) + "0's"}
              </Button>
            ))}
          </div>
          <label htmlFor="turku" className="play-modal-label">
            Turku
          </label>
          <div id="turku">
            {/* Turku ortolayer buttons */}
            {ortolayersTurku.map((layerName) => (
              <Button
                className="y-button"
                variant="secondary"
                onClick={() => {
                  setGameSettings({
                    ...gameSettings,
                    city: "Turku",
                    ortolayer: layerName,
                    wmsurl: "https://turku.asiointi.fi/teklaogcweb/WMS.ashx",
                    attribution:
                      '&copy; <a href=https://www.avoindata.fi/data/fi/dataset/turun-seudun-ilmakuva target="_blank">Turun Kaupunkiympäristö</a>',
                    wmsversion: "1.1.1",
                  });
                  navigate("/game");
                }}
              >
                {/* Displayed button name for example "1950's" or "2020's" */}
                {layerName.match(/[0-9][0-9][0-9]/) + "0's"}
              </Button>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PlayModal;
