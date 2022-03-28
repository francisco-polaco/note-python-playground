import React from 'react';
import logo from './../../logo.svg';
import './App.css';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import NoteList from './../NoteList/NoteList';
import NoteCreator from './../NoteCreator/NoteCreator';

class App extends React.Component {
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
    return (
      <Container maxWidth="lg" className="App">
        <Paper>
          <img src={logo} className="App-logo" alt="logo" />
          <Typography variant="h4" component="h1" gutterBottom>
            The Best Note Taking App!
          </Typography>

          <NoteCreator onNoteAdd={() => this.updateNotes()}/>
          <NoteList
            notes={this.state.notes}
            error={this.state.error}
            isLoaded={this.state.isLoaded}
            onNoteDeletion={(state) => {
              this.setState(state);
              this.updateNotes();
            }}/>
        </Paper>
      </Container>
    );
  }
}

export default App;
