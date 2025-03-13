import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { IGame } from '../../types'


 
function ScoreModal (
  { show,
    handleCloseScore,
    games,
  }:
    { show: boolean,
      handleCloseScore: () => void,
      games: Array<IGame>
  }) 
  {
  const ScoreTable = ({games}:{games: Array<IGame>}) => {
    const rows = games
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
      }
    ]

    return ( 
      <>
        <DataGrid
          disableRowSelectionOnClick
          sx={{bgcolor: 'white'}}
          rows={rows}
          columns={columns}
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
