import { useShoppingCartContext } from "../../context/CartContext";
import { Text, Box, IconButton, Image, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";

const ShoppingCart = () => {
  const { state: cartData, dispatch } = useShoppingCartContext();

  return (
    <>
      <Box marginTop='50px' marginLeft='91px'>
        <Text fontSize='3xl' fontWeight={700}>
          Cart
        </Text>
      </Box>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th colSpan={2}>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartData.cart.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <Image src={item.images[0].src} width='121px' height='118px' />
                </td>
                <td>{item.name}</td>
                <td>&#36;{item.price}</td>
                <td>
                  <Box display='flex' border='solid 1px' width='108px'>
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
                </td>
                <td>&#36;{Number(item.qty * item.price).toFixed(2)}</td>
                <td>
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
