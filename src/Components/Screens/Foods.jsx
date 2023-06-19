import React, { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
export const FoodsContext = createContext();
function Foods() {
  const [foods, setFoods] = useState([]);
  const { userData } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const navi = useNavigate();

  const getFoods = async () => {
    const response = await axios
      .get("http://127.0.0.1:8000/api/v1/foods/", {
        headers: {
          Authorization: `Bearer ${userData?.access}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setFoods(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        if (error.response.status && error.response.status === 401) {
          navi("/auth/login");
        }
      });
  };

  async function foodSerach(e) {
    e.preventDefault();
    setSearchText(search);
    setSearch("");
    await axios
      .get(`http://127.0.0.1:8000/api/v1/foods/?q=${search}`, {
        headers: {
          Authorization: `Bearer ${userData?.access}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setFoods(res.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        if (error.response.status && error.response.status === 401) {
          navi("/auth/login");
        }
      });
  }
  const getFoodRecipes = () => {
    return foods.map((item) => {
      return (
        <FoodItem key={item.id}>
          <Link to={`/description/${item.id}`}>
            <FoodImageContainer>
              <FoodImage src={item.featured_image} />
            </FoodImageContainer>
            <FoodName>{item.name}</FoodName>
            <PublisherName>Publisher:{item.publisher_name}</PublisherName>
          </Link>
        </FoodItem>
      );
    });
  };
  useEffect(() => {
    getFoods();
  }, []);
  return (
    <>
      <Helmet>
        <title>Food|Food Recipies </title>
      </Helmet>
      <FoodsContext.Provider value={foods}>
        <BodyContainer>
          <InnerContainer>
            <SubContainer>
              <Heading>Welcome</Heading>
              <Link to="add/">
                <SubHeading>Add Your Recipie →</SubHeading>
              </Link>
            </SubContainer>
            <SubHeading>Explore food recipies</SubHeading>
            <SearchBox>
              <SearchForm onSubmit={foodSerach}>
                <SearchInput
                  className="search"
                  value={search}
                  type="search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Search for keywords with foodname and publishername "
                />
                <SearchSubmit onClick={foodSerach}>Search</SearchSubmit>
              </SearchForm>
            </SearchBox>
            {searchText ? (
              <ResultHeading>Result of :{searchText}</ResultHeading>
            ) : (
              ""
            )}
            <FoodsList>{getFoodRecipes()}</FoodsList>
          </InnerContainer>
        </BodyContainer>
      </FoodsContext.Provider>
    </>
  );
}

export default Foods;
const BodyContainer = styled.div`
  padding-top: 35px;
`;
const InnerContainer = styled.div`
  width: 75%;
  margin: 0 auto;
`;
const Heading = styled.h1`
  font-size: 30px;
  margin-bottom: 30px;
  text-align: left;
`;
const SubHeading = styled.h5`
  font-size: 18px;
  color: rgb(229, 229, 49);
  margin-bottom: 50px;
  text-align: left;
`;
const FoodsList = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const FoodItem = styled.li`
  width: 23%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 10px 15px 0px rgba(0, 0, 0, 0.1);

  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px 0px rgba(0, 0, 0, 0.3);
  }
`;
const FoodImageContainer = styled.div``;
const FoodImage = styled.img`
  display: block;
  width: 100%;
`;
const FoodName = styled.h4`
  width: 92%;
  margin: 5px auto 0px;
`;
const PublisherName = styled.span`
  display: inline-block;
  margin-left: 10px;
  font-size: 15px;
`;
const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SearchBox = styled.div`
  margin-bottom: 50px;
`;
const SearchForm = styled.form`
  display: flex;
  align-items: center;
  background: #f4f4be;
  padding: 18px 17px;
  border-radius: 35px;
  width: 38%;
`;
const SearchInput = styled.input`
  display: block;
  width: 100%;
  padding: 10px 10px;
  border: none;
  opacity: 0.5;
`;
const SearchSubmit = styled.button`
  margin-left: 5px;
  display: inline-block;
  border: 1px solid #000;
  padding: 8px 14px;
  font-size: 13px;
  background: transparent;
  position: relative;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background-color: #ff6600;
    color: #fff;
  }
`;
const ResultHeading = styled.h3`
  margin-bottom: 25px;
  color: red;
`;
