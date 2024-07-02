import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
import SimpleContainer from './SimpleContainer';

function NavigationBar(props) {
  const customTheme = createTheme({
    palette: {
      background: {},
      primary: { main: '#007FFF' },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          colorInherit: {
            backgroundColor: '#ffffff',
            color: '#007FFF',
            boxShadow: 'none',
            borderBottom: '1px solid #e0e0e0',
          },
        },
      },
    },
  });

  return <SimpleContainer></SimpleContainer>;
}

export default NavigationBar;
