import logo from './../../logo.svg';
import './App.css';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import NoteList from './../NoteList/NoteList';
import NoteCreator from './../NoteCreator/NoteCreator';

function App() {
  return (
    <Container maxWidth="lg" className="App">
      <Paper>
        <img src={logo} className="App-logo" alt="logo" />
        <Typography variant="h4" component="h1" gutterBottom>
          The Best Note Taking App!
        </Typography>
        <div>
          <NoteCreator/>
          <NoteList/>
        </div>
      </Paper>
    </Container>
  );
}

export default App;
