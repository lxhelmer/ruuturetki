import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

function PracticeComponents (
  {mapLayer, setMapLayer, setPracticePos, setPracticeZoom
  }:
  {mapLayer: string, setMapLayer: Function, setPracticePos: Function, setPracticeZoom: Function})
  
  {
  const navigate = useNavigate()

  // Set practice position and zoom after each map move to center
  // new map layer to the user's position and zoom when the layer is changed.
  const map = useMap()
  const onMove = () => {
    setPracticePos(map.getCenter())
    setPracticeZoom(map.getZoom())
  }
  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <>
      <div
        id='prac-controls'
      >
        <Button 
          id='faux-button'
          variant='dark'
        >
          <Form>
            <Form.Check
              inline
              label="1943"
              type='radio'
              checked={mapLayer === 'avoindata:Ortoilmakuva_1943'}
              onClick={() => setMapLayer('avoindata:Ortoilmakuva_1943')}
            /> 
            <Form.Check
              inline
              label="1969"
              type='radio'
              checked={mapLayer === 'avoindata:Ortoilmakuva_1969'}
              onClick={() => setMapLayer('avoindata:Ortoilmakuva_1969')}
            /> 
            <Form.Check
              inline
              label="1997"
              type='radio'
              checked={mapLayer === 'avoindata:Ortoilmakuva_1997'}
              onClick={() => setMapLayer('avoindata:Ortoilmakuva_1997')}
            /> 
            <Form.Check
              inline
              label="2024"
              type='radio'
              checked={mapLayer === 'avoindata:Ortoilmakuva_2024_5cm'}
              onClick={() => setMapLayer('avoindata:Ortoilmakuva_2024_5cm')}
            /> 
          </Form>
        </Button>
        <Button 
          id="home-button" 
          variant="dark"
          onClick={() => navigate('/')}
          >
          Exit
        </Button>
      </div>
    </>
  )
}

export default PracticeComponents
