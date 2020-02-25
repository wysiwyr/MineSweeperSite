import React from "react";
import styled from "styled-components";

const StyledResponsive = styled.div`
    padding: 0 1rem;
    width: 1024px;
    height: 100%;
    margin: 0 auto;
    
    @media(max-width: 1024px) {
        width: 768px;
    }
    
    @media(max-width: 768px) {
        width: 100%;
    }    
`;

const Responsive = ({children, ...rest}) => {
    // props를 사용할 수 있도록 ...rest를 사용하여 StyledResponsive에게 전달
    return <StyledResponsive {...rest}>{children}</StyledResponsive>
};

export default Responsive;
