import { Button } from 'react-bootstrap'
import { LUser } from '../types'

function LoginBanner ({user}: {user: LUser | null}) {
  if (user && user.username) {
    return (
      <>
        <Button variant="dark" disabled>
          Logged in as {user.username}
        </Button>
      </>
    )
  }
  return (
    <>
      <Button variant="dark" disabled>Playing as Guest</Button>
    </>
  )
}

export default LoginBanner
