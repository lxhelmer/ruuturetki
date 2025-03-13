import { Button } from 'react-bootstrap'
import { LUser } from '../types'

function LoginButton (
  {user, handleShowLog}:
  { user: LUser | null,
    handleShowLog: Function
  })
  {
  if (!user) {
    return (
      <>
        <Button
          variant="dark"
          size="lg"
          onClick={() => handleShowLog()}
          >
          login
        </Button>
      </>
    )
  }
  return (null)
}

export default LoginButton
