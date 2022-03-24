import React from 'react';
import Button from '@mui/material/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import { DataGrid } from '@mui/x-data-grid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class NoteList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        notes: [],
        selected: []
      };
    }

    componentDidMount() {
        this.updateNotes();
    }

    updateNotes() {
        fetch("http://localhost:8080/api/list")
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  isLoaded: true,
                  notes: result
                });
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
              }
            )
    }

    deleteNotes() {
      const { selected } = this.state;

      selected.forEach(row => {
        fetch("http://localhost:8080/api/delete?id=" + row)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
      });

      this.updateNotes();
    }

    render() {
      //const { changesDone } = this.props.changesDone;
      //console.log(changesDone);
      const { error, isLoaded } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return this.datagrid();
      }

      // this.props.changesDone = false;
    }

    datagrid() {
      const columns = [
        { field: 'id', headerName: 'ID', flex: 0.6 },
        { field: 'date', headerName: 'Date', flex: 0.6 },
        { field: 'content', headerName: 'Note', flex: 1 }
      ];

      const { notes } = this.state;

      const notes_to_table = notes.map((note) => (
        {
          id: note.note_id,
          // FIXME: Preguinho
          date: new Date(note.timestamp).toString().split(" (")[0],
          content: note.content
        }
      ));

      return (
        <div style={{ height: 400, width: '100%', marginTop: '.5rem' }}>
          <Button variant="contained" color="secondary" startIcon={<RefreshIcon />} onClick={() => {
                this.updateNotes();
            }}>
            Refresh
          </Button>
          <Button variant="contained"
            style={{ marginLeft: '.5rem' }}
            color="error"
            startIcon={<DeleteForeverIcon />}
            onClick={() => {
                this.deleteNotes();
            }}>
            Delete selected
          </Button>
          <DataGrid
            rows={notes_to_table}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={(newSelection) => {
              this.setState({
                selected: newSelection
              })
            }}
          />
        </div>
      );
    }
}

export default NoteList;
