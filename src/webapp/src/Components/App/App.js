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
      changesDone: false
    };
  }

  render() {
    return (
      <Container maxWidth="lg" className="App">
        <Paper>
          <img src={logo} className="App-logo" alt="logo" />
          <Typography variant="h4" component="h1" gutterBottom>
            The Best Note Taking App!
          </Typography>
          <div>
            <NoteCreator onNoteCreation={() => {
              this.setState({
                changesDone: true
              });
            }} />
            <NoteList changesDone={() => this.state.changesDone}/>
          </div>
        </Paper>
      </Container>
    );
  }
}

export default App;
