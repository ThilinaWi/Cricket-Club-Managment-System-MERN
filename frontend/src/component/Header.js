import React from 'react'
import { Box } from '@mui/material'
import styled from '@emotion/styled'
import HeaderImage from '../images/R.jpeg'
import SearchInputEl from './SerchInput'


const Header = () => {
    const StyleHeader = styled(Box)(({theame})=>(
        {
        display:"flex",
        justifyContent: 'center',
        alignItems:'center',
        minHeight:"500px",
        backgroundImage: `url(${HeaderImage})`,
        backgroundSize:"cover",
        backgroundPosition:"center",
        backgroundPosition: 'center top'
        //backgroundColor: theame.palette.secondary.main
        }
 
        
    ));
  return (
    <>
      <StyleHeader>
          <SearchInputEl></SearchInputEl>
      </StyleHeader>
    </>
  )
}

export default Header
