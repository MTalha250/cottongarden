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
  title = "GYMGear",
  description = "Elevate your performance with premium gym wear designed for ultimate comfort, durability, and style. Whether you're pushing limits or embracing recovery, our gear empowers you to move confidently and look your best, both in and out of the gym.",
  keywords = "gym gear, gym clothing, fitness apparel, activewear, workout clothes, sportswear, gym wear, athletic clothing, performance apparel, training gear, exercise clothing, men's gym clothes, women's gym apparel, moisture-wicking shirts, breathable fitness wear, high-quality activewear, durable sports clothing, running gear, gym shorts, compression wear, yoga pants, sports bras, gym hoodies, tank tops, gym jackets, fitness trousers, gym t-shirts, muscle tanks, fitness tops, training shorts, sweat-wicking clothing, gym sweatpants, athleisure wear, performance t-shirts, gym crop tops, seamless workout wear, squat-proof trousers, quick-dry shirts, gym accessories, athletic shorts, fitness outfits",
  author = "GYMGear",
  image = "/logo.png",
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
      {image && <meta property="og:image" content={image} />}
      {image && <meta name="twitter:card" content="summary_large_image" />}
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
};

export default SEO;
