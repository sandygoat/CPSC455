import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import React from 'react';
import { theme } from './theme/theme';
import GlobalStyles from './theme/global';
import CardList from './CardList';

export default function CardContainer(){
  return (<ThemeProvider theme={theme}>
      {/* <Normalize />
      <GlobalStyles /> */}
      <CardList />
    </ThemeProvider>)
}