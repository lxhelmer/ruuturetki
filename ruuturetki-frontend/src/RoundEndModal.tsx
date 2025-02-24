import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import type { GameState } from './Game.tsx'
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import markerIcon from './MarkerIcon.tsx'

function ModalButton (
  { round, handleCloseREM }: { round: number, handleCloseREM: () => void}) 
{
  return (
    <>
      <Button variant="Primary" onClick={handleCloseREM}>
      {(round < 5) ? 'Next' : 'End'}
      </Button>
    </>
  )
}
 

function RoundEndModal (
  { gameState,
    show,
    handleCloseREM,
    round_score,
  }:
    { gameState: GameState,
      show: boolean,
      handleCloseREM: () => void,
      round_score: number
  }) 
  {
 
  const resultCenter: L.LatLng = gameState.locations[gameState.rounds-1]
  const resultMapOptions: L.MapOptions = {
    center: resultCenter,
    zoom: 12,
    scrollWheelZoom: true,
  };
  return (
    <>
      <Modal 
        show={show}
        onHide={handleCloseREM}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        >
        <Modal.Header closeButton>
          <Modal.Title>Round {gameState.rounds}/5 score:</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <h2>
          {round_score} points for the round!
          </h2>
          <MapContainer id="results-map" {...resultMapOptions}>
            <TileLayer
              attribution={'&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}
              url='https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png'
            />
            <Marker position={gameState.locations[gameState.rounds-1]} icon={markerIcon}/>
            <Marker position={gameState.guesses[gameState.rounds-1]} icon={markerIcon}>
              <Tooltip permanent>
              Your guess
              </Tooltip>
            </Marker>
          </MapContainer>
          <h2>
          {gameState.score} / 50 000 total points
          </h2>
        </Modal.Body>
        <Modal.Footer>
          <ModalButton round={gameState.rounds} handleCloseREM={handleCloseREM}  />
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default RoundEndModal
