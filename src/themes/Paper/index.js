import { red } from '@mui/material/colors'

const MuiPaper = {
  variants: [
    {
      props: { variant: 'error-outlined' },
      style: {
        border: `1px solid ${red[700]}`,
      },
    },
  ],
}

export default MuiPaper
