import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function PracticeComponents ({map, setMap}:{map: string, setMap: Function}) {
  const navigate = useNavigate()
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
              checked={map === 'avoindata:Ortoilmakuva_1943'}
              onClick={() => setMap('avoindata:Ortoilmakuva_1943')}
            /> 
            <Form.Check
              inline
              label="1969"
              type='radio'
              checked={map === 'avoindata:Ortoilmakuva_1969'}
              onClick={() => setMap('avoindata:Ortoilmakuva_1969')}
            /> 
            <Form.Check
              inline
              label="1997"
              type='radio'
              checked={map === 'avoindata:Ortoilmakuva_1997'}
              onClick={() => setMap('avoindata:Ortoilmakuva_1997')}
            /> 
            <Form.Check
              inline
              label="2024"
              type='radio'
              checked={map === 'avoindata:Ortoilmakuva_2024_5cm'}
              onClick={() => setMap('avoindata:Ortoilmakuva_2024_5cm')}
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
