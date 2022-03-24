import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@material-ui/icons/Send';
import Paper from '@mui/material/Paper';
import Container from '@material-ui/core/Container';
import { v4 as uuidv4 } from 'uuid';

const note = 'I roll all day in lava!';

class NoteCreator extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        success: null,
        text: note,
      };
    }

    createNote() {
      const recipeUrl = 'http://localhost:8080/api/save';
      const postBody = {
          note_id: uuidv4(),
          timestamp: Date.now(),
          content: this.state.text
      };
      const requestMetadata = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(postBody)
      };

      fetch(recipeUrl, requestMetadata)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              success: true
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              success: false
            });
          }
        )
    }

    render() {
      return (
        <Container component={Paper}>
          <TextField
            required
            id="note-content"
            label="Note"
            size="small"
            onChange={(event) => {
              this.setState({
                text: event.target.value
              });
            }}
          />
          <Button variant="contained" color="primary" endIcon={<SendIcon />}
            onClick={() => {
              this.createNote();
          }}>
            Create Note
          </Button>
        </Container>
      );

    }
}

export default NoteCreator;
