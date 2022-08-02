import { useShoppingCartContext } from "../context/CartContext";
import { Text, Box, IconButton, Image, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { Table, Tr, Td, TableContainer } from "@chakra-ui/react";

const ShoppingCart = () => {
  const { state: cartData, dispatch } = useShoppingCartContext();

  return (
    <>
      <Box marginTop='50px' marginLeft='91px'>
        <Text fontSize='3xl' fontWeight={700}>
          Cart
        </Text>
      </Box>

      <Box
        display='flex'
        justifyContent='space-around'
        alignItems='center'
        textAlign='center'
        backgroundColor='#F7F7F7'
        marginX='91px'
        marginTop='77px'
        padding='1rem'
      >
        <Box marginLeft='auto'>
          <Text>Product</Text>
        </Box>
        <Box
          display='flex'
          justifyContent='inherit'
          width='53%'
          marginLeft='auto'
        >
          <Text>Price</Text>
          <Text>Quantity</Text>
          <Text>Total</Text>
        </Box>
      </Box>
      <Box marginInlineStart='68px' marginInlineEnd='36px'>
        <TableContainer>
          <Table variant='simple'>
            {cartData.cart.map((item) => {
              return (
                <>
                  <Tr>
                    <Td width='13%'>
                      <Image
                        src={item.images[0].src}
                        width='121px'
                        height='118px'
                      />
                    </Td>
                    <Td fontWeight={700} width='62px'>
                      {item.name}
                    </Td>
                    <Td paddingLeft='147px'>&#36;{item.price}</Td>
                    <Td width='19%'>
                      <Box display='flex' border='solid 1px' width='60%'>
                        <Button
                          background='white'
                          borderRadius='0'
                          isDisabled={item.qty === 0 ? true : false}
                          cursor='pointer'
                          onClick={() => {
                            dispatch({
                              type: "DECREASE_CART_QTY",
                              payload: {
                                item,
                                qty: item.qty - 1,
                              },
                            });
                          }}
                        >
                          -
                        </Button>
                        <Box padding='0.5rem'>
                          <Text>{item.qty}</Text>
                        </Box>
                        <Button
                          background='white'
                          borderRadius='0'
                          cursor='pointer'
                          onClick={() => {
                            dispatch({
                              type: "INCREASE_CART_QTY",
                              payload: {
                                item,
                                qty: item.qty + 1,
                              },
                            });
                          }}
                        >
                          +
                        </Button>
                      </Box>
                    </Td>
                    <Td width='10px'>&#36;{Number(item.qty * item.price)}</Td>
                    <Td>
                      <IconButton
                        icon={<CloseIcon />}
                        onClick={() => {
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: item.id,
                          });
                        }}
                        background='none'
                      />
                    </Td>
                  </Tr>
                </>
              );
            })}
          </Table>
        </TableContainer>
      </Box>
      <Box display='flex' justifyContent='end'>
        <Box
          padding='1rem'
          marginRight='91px'
          marginTop='38px'
          marginBottom='10px'
          as='button'
          background='black'
          color='white'
          borderRadius='0'
          _hover={{
            background: "white",
            color: "black",
          }}
        >
          <Link href='/checkout'> PROCEED TO CHECKOUT</Link>
        </Box>
      </Box>
    </>
  );
};

export default ShoppingCart;
