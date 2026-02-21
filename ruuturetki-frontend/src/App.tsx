import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { MapContainer, WMSTileLayer, WMSTileLayerProps } from "react-leaflet";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./App.css";
import Game from "./components/Game";
import { DailyChallenge, GameSettings } from "./types/types";
import PlayModal from "./components/modals/PlayModal";
import Practice from "./components/Practice";
import L from "leaflet";
import getRandomLatLng from "./utils/getRandomLatLng";
import HelpModal from "./components/modals/HelpModal";
import Calendar from "./components/modals/Calendar";

function StartMenu({
  setGameSettings,
  gameSettings,
  setChallenge,
  ortolayersHelsinki,
  ortolayersTurku,
}: {
  setGameSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
  gameSettings: GameSettings;
  setChallenge: React.Dispatch<
    React.SetStateAction<DailyChallenge | undefined>
  >;
  ortolayersHelsinki: GameSettings["ortolayer"][];
  ortolayersTurku: GameSettings["ortolayer"][];
}) {
  const [showPlayModal, setPlayModal] = useState(false);
  const [showHelpModal, setHelpModal] = useState(false);
  const [showCalendarModal, setCalendarModal] = useState(false);
  const navigate = useNavigate();

  const handleClosePlay = () => setPlayModal(false);
  const handleShowPlay = () => setPlayModal(true);

  const handleCloseHelp = () => setHelpModal(false);
  const handleShowHelp = () => setHelpModal(true);

  const handleCloseCalendar = () => setCalendarModal(false);
  const handleShowCalendar = () => setCalendarModal(true);

  useEffect(() => {
    // Reset default game settings when play modal is opened.
    if (showPlayModal) {
      console.log("Play modal opened. Resetting game settings.");
      setGameSettings({
        ...gameSettings,
        dragging: true,
        timed: false,
      });
      setChallenge(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPlayModal]);

  // Settings for the background map in the main menu
  const wmsOptions: WMSTileLayerProps = {
    url: "https://kartta.hel.fi/ws/geoserver/avoindata/wms?",
    version: "1.1.1",
    layers: "avoindata:Ortoilmakuva_2024_5cm",
    format: "image/png",
    attribution:
      '&copy; <a href=https://hri.fi/data/fi/dataset/helsingin-ortoilmakuvat target="_blank">Helsingin kaupunki, kaupunkimittauspalvelut 2025</a>',
  };
  const mapOptions: L.MapOptions = {
    center: getRandomLatLng("Helsinki"),
    zoom: 17,
    scrollWheelZoom: false,
    zoomControl: false,
    boxZoom: false,
    doubleClickZoom: false,
    dragging: false,
  };

  return (
    <>
      <PlayModal
        show={showPlayModal}
        handleClosePlay={handleClosePlay}
        setGameSettings={setGameSettings}
        gameSettings={gameSettings}
        ortolayersHelsinki={ortolayersHelsinki}
        ortolayersTurku={ortolayersTurku}
      />
      {showHelpModal && (
        <HelpModal show={showHelpModal} handleCloseHelp={handleCloseHelp} />
      )}
      {showCalendarModal && (
        <Calendar
          show={showCalendarModal}
          handleCloseCalendar={handleCloseCalendar}
          setChallenge={setChallenge}
        />
      )}
      <MapContainer id="map" {...mapOptions}>
        <WMSTileLayer {...wmsOptions} />
      </MapContainer>

      <div id="menu-title">Ruuturetki</div>

      <div id="start-menu" className="d-grid gap-2">
        <Button variant="dark" size="lg" onClick={() => handleShowPlay()}>
          play
        </Button>
        <Button variant="dark" size="lg" onClick={() => navigate("/practice")}>
          practice
        </Button>
        <Button variant="dark" size="lg" onClick={() => handleShowHelp()}>
          how to play
        </Button>
        <Button variant="dark" size="lg" onClick={() => handleShowCalendar()}>
          calendar
        </Button>
      </div>
    </>
  );
}

function App() {
  const htmlElement = document.querySelector("html");
  if (htmlElement) {
    htmlElement.setAttribute("data-bs-theme", "dark");
  }
  // Set default game settings when the main menu is loaded
  // Default game settings
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    dragging: true,
    timed: false,
    wmsurl: "https://kartta.hel.fi/ws/geoserver/avoindata/wms?",
    wmsversion: "1.1.1.1",
    wmsformat: "image/png",
    attribution:
      '&copy; <a href=https://hri.fi/data/fi/dataset/helsingin-ortoilmakuvat target="_blank">Helsingin kaupunki, kaupunkimittauspalvelut 2025</a>',
    ortolayer: "avoindata:Ortoilmakuva_1943",
    city: "Helsinki",
  });
  const [challenge, setChallenge] = useState<DailyChallenge | undefined>(
    undefined,
  );

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
      <Router>
        <Routes>
          <Route
            path="/game"
            element={<Game gameSettings={gameSettings} challenge={challenge} />}
          />
          <Route
            path="/practice"
            element={
              <Practice
                ortolayersHelsinki={ortolayersHelsinki}
                ortolayersTurku={ortolayersTurku}
              />
            }
          />
          <Route
            path="/"
            element={
              <StartMenu
                setGameSettings={setGameSettings}
                gameSettings={gameSettings}
                setChallenge={setChallenge}
                ortolayersHelsinki={ortolayersHelsinki}
                ortolayersTurku={ortolayersTurku}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
