import { Modal } from 'react-bootstrap'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { GameSettings } from '../../types'

function PlayModal(
  { show,
    handleClosePlay,
    setGameSettings,
    gameSettings
  }:
    {
      show: boolean,
      handleClosePlay: () => void,
      setGameSettings: Function,
      gameSettings: GameSettings
    }) {
  const navigate = useNavigate()

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
          <Modal.Title>Time to get mappin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="gamemode-selection">
            <Form>
              <Form.Check
                inline
                label="no moving"
                type='switch'
                onClick={() => {
                  console.log('Moving allowed?', !gameSettings.dragging, )
                  setGameSettings({
                    ...gameSettings,
                    dragging: !gameSettings.dragging
                  })
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
                  year: 1943
                })
                navigate('/game')
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
                  year: 1969
                })
                navigate('/game')
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
                  year: 1997
                })
                navigate('/game')
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
                  year: 2024
                })
                navigate('/game')
              }}
            >
              2020's
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default PlayModal
