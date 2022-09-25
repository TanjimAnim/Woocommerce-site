import { useState, useEffect } from "react";
import { Text, Box, FormControl, FormLabel, Input, Flex } from "@chakra-ui/react";
import { useShoppingCartContext } from "../context/CartContext";
import axios from "axios";

const Checkout = () => {
  const { state: cartData, dispatch } = useShoppingCartContext();

  const [error, setError] = useState("");
  var [input, setInput] = useState({
    user_email: "",
    user_first_name: "",
    user_last_name: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);

  const handleChange = (event) => {
    input[event.target.name] = event.target.value;
    setInput(input);
  };

  useEffect(() => {
    var totalPriceArray = cartData.cart.map((item) => item.total_price);

    var sum = 0;
    for (let i = 0; i < totalPriceArray.length; i++) {
      sum = sum + totalPriceArray[i];
    }
    setTotalPrice(sum);
  }, [cartData]);

  const handleSubmit = async (event) => {
    if (cartData.cart.length === 0) {
      return alert("Please select some product before confirming payment");
    }
    event.preventDefault();
    const data = {
      payment_method: "bacs",
      payment_method_title: "Direct Bank Transfer",
      set_paid: true,
      billing: {
        first_name: input.user_first_name,
        last_name: input.user_last_name,
        address_1: "969 Market",
        address_2: "",
        city: "San Francisco",
        state: "CA",
        postcode: "94103",
        country: "US",
        email: input.user_email,
        phone: "(555) 555-5555",
      },
      shipping: {
        first_name: input.user_first_name,
        last_name: input.user_last_name,
        address_1: "969 Market",
        address_2: "",
        city: "San Francisco",
        state: "CA",
        postcode: "94103",
        country: "US",
      },
      line_items: cartData.cart.map((item) => {
        return {
          product_id: item.id,
          quantity: item.qty,
        };
      }),
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Flat Rate",
          total: totalPrice,
        },
      ],
    };
    Array.from(document.querySelectorAll("input")).forEach((input) => (input.value = ""));
    dispatch({
      type: "CLEAR_CART",
    });
    alert("Order has been placed");

    const response = await axios
      .post("http://localhost:3000/api/post-order", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <Box id='signin' display='flex' flexDir='column' justifyContent='center'>
      <Box marginX={{ base: "11%", md: "22%", lg: "26%" }}>
        <Text fontWeight={700} fontSize='3xl'>
          Checkout
        </Text>
      </Box>
      <Box
        width={{
          base: "85%",
          md: "60%",
          xl: "50%",
        }}
        border='10px'
        p={5}
        mr='auto'
        ml='auto'
        mb='5%'
      >
        <Flex flexDir='column'>
          <form onSubmit={handleSubmit}>
            <FormControl id='email' isRequired>
              <FormLabel fontSize='18px'>Email address</FormLabel>
              <Input
                type='email'
                placeholder='type your email here'
                name='user_email'
                _focus={{
                  zIndex: "0",
                  borderColor: "#3182ce",
                }}
                onChange={handleChange}
                value={input.email}
              />
            </FormControl>

            <Box display='flex' marginTop='30px'>
              <FormControl id='first-name' isRequired>
                <FormLabel fontSize='18px'>First Name</FormLabel>
                <Input
                  type='text'
                  placeholder='first name'
                  name='user_first_name'
                  _focus={{
                    zIndex: "0",
                    borderColor: "#3182ce",
                  }}
                  value={input.firstName}
                  onChange={handleChange}
                  width='77%'
                />
              </FormControl>
              <FormControl id='Last-name' isRequired>
                <FormLabel fontSize='18px'>Last Name</FormLabel>
                <Input
                  type='text'
                  placeholder='last name'
                  name='user_last_name'
                  _focus={{
                    zIndex: "0",
                    borderColor: "#3182ce",
                  }}
                  value={input.lastName}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
            {error ? (
              <div>
                <Text color='red' fontSize='18px' fontWeight={700}>
                  {error.error}
                </Text>
              </div>
            ) : (
              <div></div>
            )}
            <Box
              display='flex'
              backgroundColor='#F7F7F7'
              justifyContent='space-between'
              marginTop='40px'
            >
              <Box padding='1rem'>
                <Text>Product</Text>
              </Box>
              <Box padding='1rem'>
                <Text>Total</Text>
              </Box>
            </Box>
            <Box display='flex' flexDirection='column' justifyContent='space-between'>
              {cartData.cart.map((item) => {
                return (
                  <Box key={item.id} display='flex' justifyContent='space-between' padding='1rem'>
                    <Box>
                      <Text>
                        {item.name} x {item.qty}
                      </Text>
                    </Box>
                    <Box>
                      <Text>&#36;{item.total_price}</Text>
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Box display='flex' justifyContent='space-between' marginTop='10px'>
              <Box padding='1rem'>
                <Text fontWeight={700}>Total</Text>
              </Box>
              <Box padding='1rem'>
                <Text fontWeight={700}>&#36;{totalPrice.toFixed(2)}</Text>
              </Box>
            </Box>
            <Box
              as='button'
              mt='2%'
              p={2}
              backgroundColor='black'
              color='white'
              fontWeight='bold'
              type='submit'
              value='submit'
              marginX='30%'
            >
              CONFIRM PURCHASE
            </Box>
          </form>
        </Flex>
      </Box>
    </Box>
  );
};

export default Checkout;
