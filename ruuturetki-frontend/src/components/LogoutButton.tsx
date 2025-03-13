import { Button } from 'react-bootstrap'
import { LUser } from '../types'

function LogoutButton (
  {user, setUser}: 
  { user: LUser | null,
    setUser: Function}) 
  {
  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }
  if (user) {
    return (
      <>
        <Button
          variant="dark" 
          size="lg"
          onClick={logout}
          id="logout"
          >
          log out 
        </Button>
      </>
    )
  }
  return (null)
}

export default LogoutButton
