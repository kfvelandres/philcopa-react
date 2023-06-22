import { Box, Paper, keyframes, styled } from '@mui/material'

import logo from 'src/assets/brand/phcopa-logo.png'

const pulse = keyframes`
    to { transform: scale(1.2); }
`
const ImageLogo = styled('img')(() => ({
  maxHeight: 120,
  maxWidth: 120,
}))

const Splash = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 500,
      }}>
      <Box sx={{ textAlign: 'center', margin: 'auto' }}>
        <ImageLogo src={logo} sx={{ animation: `${pulse} 1000ms infinite alternate` }}></ImageLogo>
      </Box>
    </Paper>
  )
}

export default Splash
