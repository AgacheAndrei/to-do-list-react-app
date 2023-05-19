import './App.css';
import {Home} from './components/Home';
import NotFound from './components/NotFound';
import Done from './components/Done';
import ListToDo from './components/ListToDo';
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button, Container, ButtonGroup } from '@mui/material';
import { deepPurple  } from '@mui/material/colors';
import { lightBlue  } from '@mui/material/colors';
function App() {


  return (
    <Router>
      <div className="root">
        <AppBar position="static" sx={{ color: deepPurple[50], }}>
          <Toolbar sx={{ backgroundColor: lightBlue[700], }}>
            <Typography variant="h6" className="title">
              To-Do List
            </Typography>
            
            <ButtonGroup aria-label="medium secondary button group">
            <Button component={Link} to="/" color="inherit" >
              Home
            </Button>
            <Button component={Link} to="/done" color="inherit" >
              Done
            </Button>
            <Button component={Link} to="/todo" color="inherit" >
              To-Do
            </Button>
            </ButtonGroup>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" >
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/done" element={<Done />} />
            <Route path="/todo" element={<ListToDo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;