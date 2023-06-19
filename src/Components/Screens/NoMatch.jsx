import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
function NoMatch() {
  return (
    <>
      <Helmet>
        <title>Error</title>
      </Helmet>
      <Container>
        <Comment>Error 404! Page not found. ⚠️</Comment>
      </Container>
    </>
  );
}

export default NoMatch;
const Container = styled.div`
  text-align: center;
  background-color: aliceblue;
  padding: 90px 0;
  width: 100%;
  height: 60vh;
`;
const Comment = styled.h2`
  padding-top: 90px;
  font-size: 24px;
  color: red;
`;
