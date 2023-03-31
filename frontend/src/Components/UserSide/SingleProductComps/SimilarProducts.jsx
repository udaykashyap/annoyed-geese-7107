import React from "react";
import "./ProductLowerBody.css";
import { Divider, Flex, Image, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { responsive } from "./responsive";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const SimilarProducts = () => {
  const [data, setData] = React.useState([]);
  const getdata = () => {
    axios.get(`http://localhost:3000/data`).then((res) => {
      setData(res.data);
    });
  };

  React.useEffect(() => {
    getdata();
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Text className="headingAfterLine">Similar Products</Text>
      <Carousel
        swipeable={true}
        infinite={true}
        keyBoardControl={true}
        autoPlaySpeed={4000}
        autoPlay={false}
        draggable={true}
        showDots={false}
        responsive={responsive}
      >
        {data?.map((item, index) => (
          <Link key={index} to={`/product/${item.id}`}>
            <Stack
              onClick={() => handleClick()}
              mb={"50px"}
              mt={"50px"}
              mr={"20px"}
              maxH={"350px"}
              cursor={"pointer"}
            >
              <Image h={"170px"} src={item.img} />
              <Stack p={"8px"}>
                <Text
                  textOverflow={"ellipsis"}
                  overflow="hidden"
                  whiteSpace={"nowrap"}
                  fontSize="14px"
                  fontWeight={"500"}
                >
                  {item.name}
                </Text>

                <Flex justify={"center"} fontSize={"14px"} gap={"10px"}>
                  <Text opacity={"60%"} textDecor="line-through">
                    {item.strike_price}
                  </Text>
                  <Text>{item.price}</Text>
                </Flex>
              </Stack>
            </Stack>
          </Link>
        ))}
      </Carousel>

      <Divider m={"auto"} orientation="horizontal" w={"97%"} />
    </>
  );
};

export default SimilarProducts;