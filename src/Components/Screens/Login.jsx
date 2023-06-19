import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { UserContext } from "../../App";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { updateUserData } = useContext(UserContext);
  const onHandleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    axios
      .post(`http://127.0.0.1:8000/api/v1/auth/token/`, {
        username: email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        let data = response.data;
        localStorage.setItem("user_data", JSON.stringify(data));
        updateUserData({ type: "LOGIN", payload: data });
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.status === 401) {
          setMessage(error.response.data.detail);
        } else {
          if (error.response.data.username === "username") {
            setMessage("email:field is required");
          } else {
            setMessage("email & password field is required");
          }
        }
      });
  };
  return (
    <>
      <Helmet>
      <title>AllRecipes| Login Page</title>
      </Helmet>
      <Container>
        <LeftContainer>
          <HeaderContainer></HeaderContainer>
          <MainHeading>
            {" "}
            Explore the best food recipes from diffrent publishers
          </MainHeading>
        </LeftContainer>
        <RightContainer>
          <LoginContainer>
            <LoginHeading>Login to your Account</LoginHeading>
            <LoginInfo>Enter email and password to login</LoginInfo>
            <Form onSubmit={onHandleSubmit}>
              <InputContainer>
                <TextInput
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputContainer>
              <InputContainer>
                <TextInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputContainer>
              <LoginButton to="/auth/register/">Signup Now</LoginButton>
              {message && <ErrorMessage>{message}</ErrorMessage>}
              <ButtonContainer>
                <SubmitButton>Login</SubmitButton>
              </ButtonContainer>
            </Form>
          </LoginContainer>
        </RightContainer>
      </Container>
    </>
  );
}

export default Login;
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  padding: 15px;
`;
const LeftContainer = styled.div`
  width: 55%;
  padding: 40px 70px 70px;
`;
const HeaderContainer = styled.div``;

const MainHeading = styled.h1`
  font-size: 50px;
  font-style: italic;
  color: #ff6600;
  margin-top: 300px;
  line-height: 1.4em;
`;
const RightContainer = styled.div`
  background: rgba(255, 102, 0, 0.117);
  width: 45%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 20px;
  padding: 0 70px 70px;
`;
const LoginContainer = styled.div`
  padding-bottom: 70px;
  /* border-bottom: 1px solid #fff; */
  width: 100%;
`;
const LoginHeading = styled.h3`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const LoginInfo = styled.p`
  font-size: 18px;
  margin-bottom: 35px;
`;
const Form = styled.form`
  width: 100%;
  display: block;
`;
const InputContainer = styled.div`
  margin-bottom: 15px;
  position: relative;
  &:before {
  }
`;
const TextInput = styled.input`
  padding: 20px 25px 20px 30px;
  width: 100%;
  display: block;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  outline: none;
`;
const LoginButton = styled(Link)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 25px;
  color: rgb(247, 1, 66);
  font-size: 20px;
`;
const SubmitButton = styled.button`
  background: rgb(247, 1, 66);
  transition: background-color 0.5s ease 0s;
  border: 0;
  outline: 0;
  color: #fff;
  padding: 25px 40px;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background-color: black;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const ErrorMessage = styled.p`
  font-size: 17px;
  color: red;
  margin-bottom: 25px;
  text-align: center;
`;
