import { Box, Container } from '@mui/material'
import React from 'react'

const AIComponent = ({width,img1,img2,size}) => {
  return (
    <Box>
        <Container maxWidth={width} sx={{pt:8}}>
          <Box display="flex" justifyContent="space-between">
            <img
              src={img1}
              height={size}
              width={size}
              alt="Loading..."
            />
            <img
              src={img2}
              height={size}
              width={size}
              alt="Loading..."
            />
          </Box>
        </Container>
      </Box>
  )
}

export default AIComponent