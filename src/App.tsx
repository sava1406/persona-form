import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { PersonaFormComponent } from './components/persona-form/persona-form'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const App: FC = () => {
  return (
    <>
      <Box component={'header'} sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        backgroundColor: 'primary.main',
        padding: 2,
      }}>
        <ArrowBackIcon sx={{ color: 'white' }} />
        <Typography variant={'h5'} color='white'>Створення персони</Typography>
      </Box>
      <Box component={'main'}>
        <PersonaFormComponent />
      </Box>
    </>
  )
}

export default App
