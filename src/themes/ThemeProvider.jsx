import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { createTheme, CssBaseline, GlobalStyles, StyledEngineProvider, ThemeProvider as MuiThemeProvider } from '@mui/material'
import MuiTypography from './Typography'
import MuiButton from './Button'
import MuiTab from './Tab'
import { colorBlue, colorGray, colorGreen, colorLightGray, colorOrange, colorPeach, colorPrimary, colorRed } from 'src/config/layout'

import MPLUSRounded1cRegular from 'src/assets/fonts/MPLUSRounded1c-Regular.ttf'
import MPLUSRounded1cBold from 'src/assets/fonts/MPLUSRounded1c-Bold.ttf'
import MuiTable from './Table'
import MuiPaper from './Paper'
import { useSelector } from 'react-redux'

const ThemeProvider = ({ children }) => {
  const settings = useSelector((state) => state.settings)

  const themes = useMemo(() => {
    return createTheme({
      palette: {
        background: {
          ...(settings.prefersColorScheme !== 'dark' && { default: '#f5f5f5' }),
        },
        mode: settings.prefersColorScheme === 'dark' ? 'dark' : 'light',
        white: { main: '#FFFFFF', darker: '#D1D1D1' },
        black: { main: '#000000', light: '#D1D1D1' },
        gray: { main: colorGray, contrastText: '#FFFFFF' },
        lightGray: { main: colorLightGray },
        peach: { main: colorPeach },
        primary: { main: colorPrimary, contrastText: '#FFFFFF' },
        blue: { main: colorBlue, contrastText: '#FFFFFF' },
        orange: { main: colorOrange, contrastText: '#FFFFFF' },
        green: { main: colorGreen, contrastText: '#FFFFFF' },
        red: { main: colorRed, contrastText: '#FFFFFF' },
      },
      typography: {
        //fontFamily: ['MPLUSRounded1cRegular', 'Times New Roman', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
        subtitle3: { fontSize: 12 },
        subtitle4: { fontSize: 10 },
      },
      components: {
        // Name of the component
        MuiCssBaseline: {
          styleOverrides: `
                    @font-face {
                        font-family: 'MPLUSRounded1cRegular';
                        font-weight: 400;
                        src: local('MPLUSRounded1c-Regular'), url(${MPLUSRounded1cRegular}) format('truetype');
                    }
                    @font-face {
                        font-family: 'MPLUSRounded1cBold';
                        font-weight: 700;
                        src: local('MPLUSRounded1c-Bold'), url('${MPLUSRounded1cBold}') format('truetype');
                    }
                `,
        },
        MuiTypography,
        // MuiButton,
        // MuiTab,
        // MuiPaper,
        //...MuiTable,
      },
    })
  }, [settings.prefersColorScheme])

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={themes}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            'html,body': {
              height: '100%',
            },
            '#root': {
              display: 'flex',
              flexGrow: 1,
              //height: '100%',
            },
            body: { display: 'flex' },
            form: {
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
            },
            // '.MuiTypography-h1,.MuiTypography-h2,.MuiTypography-h3,.MuiTypography-h4,.MuiTypography-h5,.MuiTypography-h6,.MuiTypography-subtitle1,.MuiTypography-subtitle2':
            //   {
            //     fontFamily: ['MPLUSRounded1cBold', 'Times New Roman', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
            //   },
          }}
        />
        {children}
      </MuiThemeProvider>
    </StyledEngineProvider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ThemeProvider
