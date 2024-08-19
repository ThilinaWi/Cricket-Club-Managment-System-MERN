import React from 'react'
import { Box } from '@mui/material'
import styled from '@emotion/styled'
import HeaderImage from '../images/header3.jpg'
import SearchInputElJ from './SearchInputElJ'

const HeaderJ = () => {
    const StyleHeader = styled(Box)(({theame})=>(
        {
        display:"flex",
        justifyContent: 'center',
        alignItems:'center',
        minHeight:"600px",
        backgroundImage: `url(${HeaderImage})`,
        backgroundSize:"cover",
        backgroundPosition:"center",
        //backgroundColor: theame.palette.secondary.main
        }
 
        
    ));
  return (
    <>
      <StyleHeader>
          <SearchInputElJ></SearchInputElJ>
      </StyleHeader>
    </>
  )
}

export default HeaderJ