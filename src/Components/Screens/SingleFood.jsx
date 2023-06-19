import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";

function SingleFood() {
  const [des, setDes] = useState({});
  const { id } = useParams();
  const { userData } = useContext(UserContext);
  const navi = useNavigate();

  const getSingleFood = async () => {
    const result = await axios
      .get(`http://127.0.0.1:8000/api/v1/foods/view/${id}`, {
        headers: {
          Authorization: `Bearer ${userData?.access}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setDes(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        if (error.response.status && error.response.status === 401) {
          navi("/auth/login");
        }
      });
  };
  const deleteUser = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/v1/foods/delete/${id}`);
    navi("/home");
  };
  const renderFoods = () => {
    return (
      <>
        <Helmet>
          <title>AllRecipes|Single Recipie</title>
        </Helmet>
        <MainContainer>
          <DesHead>{des.name}</DesHead>
          <DeleteContainer>
            <Link onClick={() => deleteUser(des.id)}>
              <Delete>Delete Post</Delete>
            </Link>
            <Link to={`/description/${des.id}/update/${des.id}`}>
              {" "}
              <Delete>Update Post</Delete>
            </Link>

            <PublisherName> Publisher: {des.publisher_name}</PublisherName>
          </DeleteContainer>
          <FoodCard>
            <LeftContainer>
              <ImageContainer>
                <Image src={des.featured_image} />
              </ImageContainer>
            </LeftContainer>
            <RightContainer></RightContainer>
          </FoodCard>
          <Content>
            <Top>Food Ingredients</Top>
            <Cont>{des.ingredients}</Cont>
            <Top>Preparation Method</Top>
            <Cont>{des.description}</Cont>
          </Content>
        </MainContainer>
      </>
    );
  };
  useEffect(() => {
    getSingleFood();
  }, []);
  return <>{renderFoods()}</>;
}

export default SingleFood;
const MainContainer = styled.div`
  width: 77%;
  margin: 0 auto;
  padding-top: 65px;
`;
const DesHead = styled.h1`
  font-size: 50px;
  margin-bottom: 10px;
`;
const DeleteContainer = styled.div`
  display: flex;
  align-items: center;
  /* width: 25%; */
  margin-bottom: 20px;
`;
const Delete = styled.span`
  display: inline-block;
  color: #b4b4b4;
  border: 2px solid #b4b4b4;
  border-radius: 30px;
  padding: 4px 8px;
  margin-left: 10px;
`;

const PublisherName = styled.h6`
  margin-left: 16px;
  font-size: 16px;
  color: #a2a2a2;
`;
const FoodCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const LeftContainer = styled.div`
  width: 50%;
`;
const ImageContainer = styled.div`
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: hidden;
`;
const Image = styled.img`
  display: block;
  width: 100%;
`;
const RightContainer = styled.div`
  /* display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 48%; */
`;

const Content = styled.div``;
const Top = styled.h3`
  font-size: 26px;
  margin-bottom: 20px;
`;
const Cont = styled.p`
  color: #545454;
  font-size: 18px;
  line-height: 1.5rem;
  font-weight: 400;
`;
