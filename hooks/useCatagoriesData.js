import { useMemo } from "react";

export default function useCategoriesData({ categories, currentSlugs }) {
  const data = useMemo(() => {
    const lastSlug = currentSlugs[currentSlugs.length - 1];

    const lastCategory = categories.find(
      (category) => category.slug === lastSlug
    );
    const breadcrumb = currentSlugs.map((slug, index) => {
      const category = categories.find((category) => category.slug === slug);

      return {
        name: category.name,
        href:
          slug === lastSlug
            ? ["/shop", ...currentSlugs].join("/")
            : ["/shop", ...currentSlugs.slice(0, index), category.slug].join(
                "/"
              ),
      };
    });

    const parentId = lastCategory ? lastCategory.id : 0;
    const list = categories
      .filter((category) => category.parent === parentId)
      .map((category) => {
        return {
          name: category.name,
          href: ["/shop", ...currentSlugs, category.slug].join("/"),
        };
      });

    return {
      breadcrumb,
      list,
    };
  }, [categories, currentSlugs]);
  return data;
}
