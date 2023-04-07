import React from "react";
import styled, { keyframes } from "styled-components";

type DotProps = {
  delay: string;
};

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

const DotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Dot = styled.div<DotProps>`
  background-color: black;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${(props: DotProps) => props.delay};
`;

const LoadingDots = () =>(
  <DotWrapper>
    <Dot delay="0s" data-testid="loading-dot" />
    <Dot delay="0.1s" data-testid="loading-dot" />
    <Dot delay="0.2s" data-testid="loading-dot" />
  </DotWrapper>
);
export default LoadingDots