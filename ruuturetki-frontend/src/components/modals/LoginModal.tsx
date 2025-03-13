import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { useState } from 'react'
import loginService from '../../services/login'
 
function LoginModal (
  { show,
    handleCloseLog,
  }:
    { show: boolean,
      handleCloseLog: () => void,
  }) 
  {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [problem, setProblem] = useState('')

  const handleLogSubmit = async () => {
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem(
        'gameUser', JSON.stringify(user)
      )
      setProblem('')
      handleCloseLog()
    } catch (error) {
      setProblem('Something went wrong')
    }
  }

  return (
    <>
      <Modal 
        show={show}
        onHide={handleCloseLog}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
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
        </Modal.Body>
        <Modal.Footer>
          <h2 id="reg-err">
          {problem}
          </h2>
          <Button 
            onClick={() => handleLogSubmit()}
            variant="secondary">
            login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default LoginModal
