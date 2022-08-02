import { Box, Image, Text } from "@chakra-ui/react";

export default function Products({ data }) {
  return (
    <div id='products'>
      <Box
        display='flex'
        flexDir='row'
        marginTop='40px'
        marginLeft='20px'
        marginRight='20px'
        flexWrap='wrap'
        alignItems='flex-start'
        justifyContent='center'
      >
        {data.products.map((item) => {
          return (
            <Box
              key={item.id}
              width={{ base: "65%", md: "45%", lg: "25%" }}
              marginLeft='10px'
              marginRight='10px'
              marginTop='5px'
              marginBottom='5px'
            >
              <Box>
                <Image src={item.images[0].src} width='381px' />
              </Box>
              <Box>
                <Text fontSize='16px' fontWeight={700}>
                  {item.name}
                </Text>
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
          );
        })}
      </Box>
    </div>
  );
}
