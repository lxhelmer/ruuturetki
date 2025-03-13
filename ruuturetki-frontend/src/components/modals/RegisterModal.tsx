import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { useState } from 'react'
import registerService from '../../services/register'
import axios from 'axios'
 
function RegisterModal (
  { show,
    handleCloseReg,
  }:
    { show: boolean,
      handleCloseReg: () => void,
  }) 
  {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [problem, setProblem] = useState('')
  const handleRegSubmit = async () => {
    try {
      const user = await registerService.register({
        username, password
      })
      console.log('created user', user)
      handleCloseReg()
    } catch (error){
      console.log(error)
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.errorMessage) {
          setProblem(error.response.data.errorMessage)
        }
      } else {
        setProblem('Something went wrong')
      }
    }
  }
  return (
    <>
      <Modal 
        show={show}
        onHide={handleCloseReg}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
          <Modal.Title>Register a new account:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="reg-form">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Enter username" 
              value={username} 
              onChange={({target}) => setUsername(target.value)}/>
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password"
              placeholder="Enter password" 
              value={password} 
              onChange={({target}) => setPassword(target.value)}/>
          </Form>
          <Form.Text className="text-muted">
            This might take a while if the backend is asleep
          </Form.Text>
        </Modal.Body>
        <Modal.Footer>
          <h2 id="reg-err">
          {problem}
          </h2>
          <Button 
            onClick={() => handleRegSubmit()}
            variant="secondary">
            register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default RegisterModal
