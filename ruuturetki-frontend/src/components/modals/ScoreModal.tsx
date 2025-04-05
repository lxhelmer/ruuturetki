import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { IGame } from '../../types'
import { LUser } from '../../types'
import gameService from '../../services/games'

function ScoreModal (
  { show,
    handleCloseScore,
    games,
    setGames,
    user,
  }:
    { show: boolean,
      handleCloseScore: () => void,
      games: Array<IGame>,
      setGames: Function,
      user: LUser | null
  }) 
  {

  const DeleteButton = (props: GridRenderCellParams<any,  String>) => {
    const sendDelete = () => {
      gameService.deleteGame(props.id as string)
      setGames((prevGames: Array<IGame>) => prevGames.filter(((g: IGame) => g.id != props.id)))
    }
    return (
      <Button variant="dark" onClick={sendDelete}>Delete</Button>
    )
  }

  const ScoreTable = ({games}:{games: Array<IGame>}) => {
    const rows = games

    const isAdmin = (user && user.admin) ? true : false
    const columns: GridColDef<(typeof rows)[number]>[] = [
      {
        field: 'username',
        headerName: 'Username',
        valueGetter: (_value, row) => {
          if (!row.user) {
            return 'Guest'
          } 
          return row.user.username
        },
      },
      {
        field: 'score',
        headerName: 'Score',
      },
      {
        field: 'year',
        headerName: 'Year'
      },
      {
        field: 'rounds',
        headerName: 'Rounds'
      },
      {
        field: 'delete',
        valueGetter: (_value, row) => {
          if (!row.id) {
            return "game id missing"
          }
          return row.id
        },
        renderCell: DeleteButton
      },
    ]
    

    return ( 
      <>
        <DataGrid
          disableRowSelectionOnClick
          sx={{bgcolor: 'white'}}
          rows={rows}
          columns={columns}
          columnVisibilityModel={{
            delete: isAdmin
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
            sorting: {
              sortModel: [
                {
                  field: 'score',
                  sort: 'desc',
                }
              ]
            },
            columns: {
              columnVisibilityModel: {
                delete: isAdmin
              }
            }
          }}
          pageSizeOptions={[5]}
          />
      </>
    )
  }

  return (
    <>
      <Modal 
        show={show}
        onHide={handleCloseScore}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
          <Modal.Title>Scoreboard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ScoreTable games={games}/>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            onClick={() => handleCloseScore()}
            variant="secondary">
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ScoreModal
