import React from 'react';
import styled from 'styled-components';

const PButton = () => {
  return (
    <StyledWrapper>
      <button> Contact
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
  font-family: 'Poppins', sans-serif;
   padding: 5px 25px;
   border: unset;
   border-radius: 15px;
   color: #fff;
   z-index: 1;
   background: #003505;
   position: relative;
   font-weight: 600;
   font-size: 17px;
   -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
   box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
   transition: all 250ms;
   overflow: hidden;
   border: 1px solid #003505;
  }

  

  button:hover {
   cursor: pointer;
   border: 1px solid #fff;
  }

  button:hover::before {
   width: 100%;
  }`;

export default PButton;
