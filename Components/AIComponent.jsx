import { Box, Container } from '@mui/material'
import React from 'react'
import { IMAGE_SIZE } from '../Constants'

const AIComponent = ({width,img1,img2}) => {
  return (
    <Box>
        <Container maxWidth={width} sx={{pt:8}}>
          <Box display="flex" justifyContent="space-between">
            <img
              src={img1}
              height={IMAGE_SIZE}
              width={IMAGE_SIZE}
              alt="Loading..."
            />
            <img
              src={img2}
              height={IMAGE_SIZE}
              width={IMAGE_SIZE}
              alt="Loading..."
            />
          </Box>
        </Container>
      </Box>
  )
}

export default AIComponent