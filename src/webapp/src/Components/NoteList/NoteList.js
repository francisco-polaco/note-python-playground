import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import RefreshIcon from '@material-ui/icons/Refresh';

class NoteList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        notes: []
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

    render() {
      const { error, isLoaded, notes } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return this.basicTable();
      }
    }

    basicTable() {
        const { notes } = this.state;
        return (
          <TableContainer component={Paper}>
            <Button variant="contained" color="secondary" startIcon={<RefreshIcon />} onClick={() => {
                  this.updateNotes();
              }}>
              Refresh
            </Button>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Note ID</TableCell>
                  <TableCell align="right">Created At</TableCell>
                  <TableCell align="right">Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                    notes.map((note) => (
                        <TableRow
                            key={note.note_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {note.note_id}
                            </TableCell>
                            <TableCell align="right">{new Date(note.timestamp).toString()}</TableCell>
                            <TableCell align="right">{note.content}</TableCell>
                        </TableRow>
                    ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        );
      }
}

export default NoteList;
