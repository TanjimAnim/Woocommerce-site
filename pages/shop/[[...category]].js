import Link from "next/link";
import { useRouter } from "next/router";
import api from "../api/index";
import useCategoriesData from "../../hooks/useCatagoriesData";
import { Box, Text, Image } from "@chakra-ui/react";

function ShopCategory({ categories, products }) {
  const router = useRouter();

  const { category = [] } = router.query;

  const data = useCategoriesData({ categories, currentSlugs: category });

  return (
    <div>
      <Box textAlign='center'>
        <Text fontSize='3xl' fontWeight={600}>
          {data.breadcrumb[data.breadcrumb.length - 1].name}
        </Text>
      </Box>

      <Box textAlign='center' display='flex' justifyContent='center'>
        {data.list.map((item) => (
          <Link href={item.href}>
            <Text marginRight='10px' marginTop='10px' cursor='pointer'>
              {item.name}
            </Text>
          </Link>
        ))}
      </Box>

      <Box
        display='flex'
        flexWrap='wrap'
        alignItems='flex-start'
        justifyContent='center'
        marginX='auto'
        marginTop='60px'
        paddingLeft={{ base: "75px", md: "100px", lg: "26px" }}
      >
        {products.map((item) => (
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
        ))}
      </Box>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { data: categories } = await api.get("products/categories");
  const lastCategorySlug = context.params.category
    ? context.params.category[context.params.category.length - 1]
    : null;
  const categoryId = categories.find((category) => category.slug === lastCategorySlug)?.id ?? null;

  const { data: products } = await api.get("products", {
    category: categoryId,
  });

  return {
    props: { categories, products },
  };
}

export default ShopCategory;
