import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { UserContext } from "../../App";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { updateUserData } = useContext(UserContext);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
  
    axios
      .post(`http://127.0.0.1:8000/api/v1/auth/register/`, {
        email,
        password,
        name: name,
      })
      .then((response) => {
        let data = response.data.data;
        console.log(response.data);
        let status_code = response.data.status_code;
        if (status_code === 6000) {
          console.log(status_code);
          localStorage.setItem("user_login_data", JSON.stringify(data));
          updateUserData({ type: "LOGIN", payload: data });
          navigate("/home");
        } else {
          setMessage(response.data.data);
        }
      })
      .catch((error) => {
        console.log("error", error.response);
        if (error.response.status === 500) {
          setMessage("Name,Email and Password:Field is required");
        }
        if (error.response.status === 401) {
          setMessage(error.response.data.detail);
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>AllRecipes| Signup Page</title>
      </Helmet>

      <Container>
        <LeftContainer>
          <HeaderContainer></HeaderContainer>
          <MainHeading>
            Explore the best food recipes from diffrent publishers{" "}
          </MainHeading>
        </LeftContainer>
        <RightContainer>
          <LoginContainer>
            <LoginHeading>Register into Account</LoginHeading>
            <LoginInfo>Create an account to acccess all the features</LoginInfo>
            <Form onSubmit={onHandleSubmit}>
              <InputContainer>
                <TextInput
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputContainer>
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
              <LoginButton to="/auth/login/">Login Now</LoginButton>
              {message && <ErrorMessage>{message}</ErrorMessage>}

              <ButtonContainer>
                <SubmitButton>Create an Account</SubmitButton>
              </ButtonContainer>
            </Form>
          </LoginContainer>
        </RightContainer>
      </Container>
    </>
  );
}

export default Signup;
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
