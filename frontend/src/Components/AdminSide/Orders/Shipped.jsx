import { Box, Button, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

const Shipped = ({ GetUserOrderDetails, userDetails }) => {
  const toast = useToast();

  const handleCompleteOrder = async (oID, uID) => {
    console.log(uID, oID);
    try {
      let res = await axios.patch(
        `https://good-rose-kingfisher-tam.cyclic.app/order/orderStatus/${uID}/prod/${oID}`,
        {
          order_status: "Completed",
        }
      );
      GetUserOrderDetails();
      toast({
        title: "Updated Successfully.",
        description: "Product Marked as Completed Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Invalid Request",
        description: "Please Try Again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box
        display={{ base: "none", md: "flex" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        boxShadow="rgba(0, 0, 0, 0.4) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 5px 10px -1px, rgba(0, 0, 0, 0.2) 0px -1px 0px inset"
        p="10px"
        mb={"20px"}
      >
        <Box
          width={{ base: "10%", md: "12%" }}
          fontSize={{ base: "12px", md: "11px", lg: "14px" }}
        >
          <Text>NAME</Text>
        </Box>
        <Box
          width={{ base: "10%", md: "17%" }}
          fontSize={{ base: "12px", md: "11px", lg: "14px" }}
        >
          <Text>ADDRESS</Text>
        </Box>
        <Box
          width={{ base: "10%", md: "10%", lg: "7%" }}
          fontSize={{ base: "12px", md: "11px", lg: "14px" }}
        >
          <Text>IMAGE</Text>
        </Box>

        <Box
          width={{ base: "15%", md: "28%" }}
          fontSize={{ base: "12px", md: "11px", lg: "14px" }}
        >
          <Text>PRODUCTS</Text>
        </Box>

        <Box
          width={{ base: "10%", md: "11%" }}
          fontSize={{ base: "12px", md: "11px", lg: "14px" }}
          textAlign={"center"}
        >
          <Text>AMOUNT</Text>
        </Box>
        <Box
          width={{ base: "10%", md: "10%" }}
          fontSize={{ base: "12px", md: "11px", lg: "14px" }}
          textAlign={"center"}
        >
          <Text>DATE</Text>
        </Box>
        <Box
          width={{ base: "20%", md: "15%" }}
          fontSize={{ base: "12px", md: "11px", lg: "14px" }}
          textAlign={"center"}
        >
          <Text>STATUS</Text>
        </Box>
      </Box>

      {userDetails.map((user) =>
        user.product.map((order) =>
          order.order_status === "Shipped" ? (
            <Box
              key={Math.random()}
              boxShadow="rgba(0, 0, 0, 0.4) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 5px 10px -1px, rgba(0, 0, 0, 0.2) 0px -1px 0px inset"
              p="10px"
              mb={"10px"}
              width={"100%"}
            >
              <Box
                display={{ base: "none", md: "flex" }}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box
                  width={{ base: "10%", md: "12%" }}
                  fontSize={{ base: "12px", md: "11px", lg: "14px" }}
                >
                  <Text>{user.userID.name},</Text>
                  <Text color={"gold"}>{user.userID.number}</Text>
                </Box>
                <Box
                  width={{ base: "10%", md: "17%" }}
                  fontSize={{ base: "12px", md: "12px", lg: "14px" }}
                >
                  <Text>{user.address}</Text>
                </Box>
                <Box width={{ base: "10%", md: "10%", lg: "7%" }}>
                  <Image
                    width={"80%"}
                    src={order.image}
                    alt={order.category}
                  ></Image>
                </Box>

                <Box
                  width={{ base: "15%", md: "28%" }}
                  fontSize={{ base: "12px", md: "12px", lg: "14px" }}
                >
                  <Text>{order.details},</Text>
                  <Text as={"mark"}>{order._id}</Text>
                </Box>

                <Box
                  width={{ base: "10%", md: "9%" }}
                  fontSize={{ base: "12px", md: "12px", lg: "14px" }}
                  textAlign={"center"}
                >
                  <Text color={"gold"}>$ {order.price}</Text>
                </Box>
                <Box
                  width={{ base: "10%", md: "10%" }}
                  fontSize={{ base: "12px", md: "12px", lg: "14px" }}
                  textAlign={"center"}
                >
                  <Text>{new Date(user?.createdAt).toDateString()}</Text>
                </Box>
                <Box width={{ base: "20%", md: "15%" }} textAlign={"center"}>
                  <Button
                    size={"sm"}
                    colorScheme={"blue"}
                    p={{ md: 1, lg: 5 }}
                    onClick={() => {
                      handleCompleteOrder(order._id, user._id);
                    }}
                  >
                    Complete
                  </Button>
                </Box>
              </Box>
              {/* ````````````````````````````````````small Screen````````````````````````````` */}
              <Box
                display={{ base: "flex", md: "none" }}
                justifyContent={"space-between"}
                p={"10px"}
              >
                {/* ````````````````````````````````````left Div ``````````````````````````````````*/}
                <Box width={{ base: "50%", sm: "40%" }}>
                  <Box
                    h="25px"
                    width={"58px"}
                    border={"1px solid Yellow"}
                    bg={"yellow.500"}
                    mb={"10px"}
                    color="black"
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Text as="b" fontSize={{ base: "10px", sm: "12px" }}>
                      Pending
                    </Text>
                  </Box>
                  <Image
                    width={{ base: "60%", sm: "40%" }}
                    src={order.image}
                    alt={order.category}
                  ></Image>
                  <Text fontWeight={"bold"} fontSize={"lg"} mt={"20px"}>
                    $ {order.price}
                  </Text>
                </Box>
                {/* ```````````````````````````````````right Div````````````````````````````` */}
                <Box
                  w={{ base: "50%", sm: "60%" }}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"space-around"}
                >
                  <Box>
                    <Text fontSize={{ base: "13px", sm: "14px" }}>
                      {order.details}
                    </Text>
                    <Text
                      as={"mark"}
                      mt={"10px"}
                      fontSize={{ base: "12px", sm: "13px" }}
                    >
                      ID- {order._id}
                    </Text>
                    <Text
                      fontWeight={"bold"}
                      mt={"10px"}
                      fontSize={{ base: "13px", sm: "14px" }}
                    >
                      {user.userID.name}, {user.userID.number}
                    </Text>
                    <Text
                      fontWeight={"bold"}
                      mt={"10px"}
                      fontSize={{ base: "13px", sm: "14px" }}
                    >
                      {user.address},{user.city},{user.pincode}
                    </Text>
                  </Box>

                  <Button
                    mt={"10px"}
                    size={"sm"}
                    colorScheme={"blue"}
                    onClick={() => {
                      handleCompleteOrder(order._id, user._id);
                    }}
                  >
                    Complete
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : null
        )
      )}
    </>
  );
};

export default Shipped;
