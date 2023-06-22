import { colorPrimary } from 'src/config/layout'

const MuiButton = {
  styleOverrides: {
    root: {
      paddingTop: 11,
      borderRadius: 50,
      paddingBottom: 11,
      textTransform: 'none',
    },
    containedPrimary: {
      ':disabled': {
        color: '#fff',
        backgroundColor: colorPrimary,
        opacity: 0.7,
      },
    },
  },
}

export default MuiButton
