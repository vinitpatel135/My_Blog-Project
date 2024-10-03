import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Components/Navbar';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Home from './Screens/Home';
import { useState } from 'react';
import constents from './Common/constents';
import YourBlogs from './Screens/YourBlogs';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [Auth, setAuth] = useState(constents.getUserDetails())
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Navbar Auth={Auth} setAuth={setAuth} />
        <Routes>
          <Route path="/" element={<Home Auth={Auth} />} />
          <Route path="/your-blogs" element={<YourBlogs Auth={Auth} />} />
          <Route path="/signup" element={<SignUp Auth={Auth} setAuth={setAuth} />} />
          <Route path="/signin" element={<SignIn Auth={Auth} setAuth={setAuth} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
