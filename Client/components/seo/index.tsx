import React from "react";
import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  image?: string;
}

const SEO: React.FC<Props> = ({
  title = "Cotton Garden",
  description = "Cotton Garden crafts breathable cotton clothing for men, women, and kids — tees, shirts, dresses, chinos, loungewear and everyday essentials made for comfort, quality and timeless style.",
  keywords = "cotton clothing, cotton apparel, breathable fabrics, men's cotton shirts, men's tees, chinos, women's dresses, women's tops, knitwear, loungewear, kidswear, boys clothing, girls clothing, family outfits, everyday essentials, casual wear, sustainable cotton, comfortable clothes, timeless style",
  author = "Cotton Garden",
  image = "/images/logo.jpeg",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Cotton Garden" />
      {image && <meta property="og:image" content={image} />}
      {image && <meta name="twitter:card" content="summary_large_image" />}
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
};

export default SEO;
