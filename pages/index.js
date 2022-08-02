import axios from "axios";
import Products from "../src/components/products";
import { Box, Text, Center } from "@chakra-ui/react";
import Link from "next/link";

export default function Home({ data, catagoryData }) {
  return (
    <div id='home'>
      <Box textAlign='center' marginTop='5px' marginBottom='6px'>
        <Text fontSize='3xl' fontWeight={700}>
          Shop
        </Text>
      </Box>
      <Box textAlign='center' display='flex' justifyContent='center'>
        {catagoryData.products.map((item) => {
          return (
            <Box key={item.id}>
              {item.slug !== "uncategorized" && item.parent === 0 ? (
                <>
                  <Link href={`/shop/${item.slug}`}>
                    <Text marginRight='10px' marginTop='10px' cursor='pointer'>
                      {item.name}
                    </Text>
                  </Link>
                </>
              ) : (
                <></>
              )}
            </Box>
          );
        })}
      </Box>
      <Center>
        <Products data={data} />
      </Center>
    </div>
  );
}

export async function getStaticProps() {
  const url1 = "http://localhost:3000/api/get-products";
  const url2 = "http://localhost:3000/api/get-catagories";
  const { data } = await axios.get(url1);
  const { data: catagoryData } = await axios.get(url2);
  return {
    props: { data, catagoryData },
  };
}
