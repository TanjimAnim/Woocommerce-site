import { useRouter } from "next/router";
import { Box, Text, Image, Button } from "@chakra-ui/react";
import api from "../api";
import Link from "next/link";
import { useState } from "react";
import { useShoppingCartContext } from "../../context/CartContext";

const SingleProduct = ({ product, categories }) => {
  const {
    state: { cart },
    dispatch,
  } = useShoppingCartContext();

  const router = useRouter();
  const breadcrumb = router.components["/shop/[[...category]]"].resolvedAs;

  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <>
      <Box
        key={product.id}
        marginX='130px'
        marginTop='120px'
        marginBottom='178px'
      >
        <Box display='flex' flexDirection='row' justifyContent='space-evenly'>
          <Box>
            <Image src={product.images[0].src} width='580px' height='475px' />
          </Box>
          <Box width='65%' padding='3rem' marginTop='24px'>
            <Box>{breadcrumb}</Box>
            <Box marginTop='24px'>
              <Text fontSize='16px' fontWeight={700}>
                {product.name}
              </Text>
            </Box>
            <Box marginTop='24px'>
              <Text
                dangerouslySetInnerHTML={{
                  __html: product.price_html,
                }}
                textDecoration='none'
              />
            </Box>
            <Box textAlign='justify' marginTop='24px'>
              <Text
                dangerouslySetInnerHTML={{
                  __html: product.short_description,
                }}
                textDecoration='none'
              />
            </Box>
            <Box display='flex' marginTop='24px'>
              <Box display='flex' border='solid 1px'>
                <Button
                  onClick={decrement}
                  isDisabled={count === 0 ? true : false}
                  borderRadius='0'
                  background='white'
                >
                  -
                </Button>
                <Box padding='0.5rem'>
                  <Text>{count}</Text>
                </Box>
                <Button onClick={increment} borderRadius='0' background='white'>
                  +
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: {
                        product,
                        qty: count,
                        price: product.price,
                      },
                    });
                    alert("Item added to cart");
                  }}
                  isDisabled={count === 0 ? true : false}
                  background='black'
                  color='white'
                  borderRadius='0'
                  _hover={{
                    background: "white",
                    color: "black",
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box marginX='130px'>
        <Box>
          <Text fontSize='3xl' fontWeight={700}>
            Related Products
          </Text>
        </Box>
        <Box display='flex' flexWrap='wrap'>
          {categories.map((item) => {
            return (
              <Box key={item.id}>
                {item.id !== product.id ? (
                  <>
                    <Box
                      key={item.id}
                      width={{ base: "84%", md: "45%", lg: "25%" }}
                      marginLeft='10px'
                      marginRight='10px'
                      marginTop='5px'
                      marginBottom='5px'
                    >
                      <Box>
                        <Image src={item.images[0].src} width='280px' />
                      </Box>
                      <Box>
                        <Link href={`/product/${item.slug}/${item.id}`}>
                          <Text
                            marginRight='10px'
                            marginTop='10px'
                            cursor='pointer'
                            fontSize='16px'
                            fontWeight='bold'
                          >
                            {item.name}
                          </Text>
                        </Link>
                      </Box>
                      <Box>
                        <Text
                          dangerouslySetInnerHTML={{
                            __html: item.price_html,
                          }}
                          textDecoration='none'
                        />
                      </Box>
                    </Box>
                  </>
                ) : (
                  <></>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};
export default SingleProduct;

export async function getServerSideProps(context) {
  const productId =
    context.params.product_slug[context.params.product_slug.length - 1];
  const { data: product } = await api.get(`products/${productId}`);
  const categoryId = product.categories[0].id;
  const { data: categories } = await api.get("products", {
    category: categoryId,
  });

  return {
    props: { product, categories },
  };
}
