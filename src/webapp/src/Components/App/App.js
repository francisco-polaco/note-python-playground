import logo from './../../logo.svg';
import './App.css';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import NoteList from './../NoteList/NoteList';
import NoteCreator from './../NoteCreator/NoteCreator';

function App() {
  return (
    <Container maxWidth="sm" className="App">
      <Paper>
        <img src={logo} className="App-logo" alt="logo" />
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App + Material-UI
        </Typography>
        <NoteCreator/>
        <NoteList/>
      </Paper>
    </Container>
  );
}

export default App;
