import React from "react";
import styled, { css } from "styled-components";
import { SearchBar } from "./SearchBar";
import { DivFlexCenter } from "../globals/styles";

const Container = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.primary};
  `}
`;

const Wrapper = styled(DivFlexCenter)`
  height: 100vh;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled(DivFlexCenter)`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.title};
    gap: 1rem;
  `}
`;

const Home = () => {
  return (
    <Container>
      <Wrapper>
        <Title>
           Github Repository Search
        </Title>
        <SearchBar placeholder="Search..."/>
      </Wrapper>
    </Container>
  );
}

export default Home;