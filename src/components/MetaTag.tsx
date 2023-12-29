import Head from "next/dist/shared/lib/head";

const MetaTag = ({ title, description }: { title: string, description: string }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
      <meta name="keyword" content="Fashio trendz" />

      <meta property="og:url" content="https://fashiotrendz.handev.my.id" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="FashioTrendz" />
      <meta
        property="og:description"
        content="Fashio Trendz adalah solusi terbaik untuk membat anda lebih percaya diri"
      />
      <meta
        property="og:image"
        content="https://firebasestorage.googleapis.com/v0/b/ecommerce-nextjs-ed19d.appspot.com/o/Green%20Simple%20Fashion%20Sale%20Promotion%20Banner%20Landscape%20(1).jpg?alt=media&token=00a1c802-46b3-4c33-8bde-80441af33130&_gl=1*10p2i6p*_ga*OTM3MTc5MDkxLjE2OTYwMDA5Njc.*_ga_CW55HF8NVT*MTY5ODIwNTU3Ni40OC4xLjE2OTgyMDY5MTYuNC4wLjA."
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:domain"
        content="https://fashiotrendz.handev.my.id"
      />
      <meta
        property="twitter:url"
        content="https://fashiotrendz.handev.my.id"
      />
      <meta name="twitter:title" content="FashioTrendz" />
      <meta
        name="twitter:description"
        content="Fashio Trendz adalah solusi terbaik untuk membat anda lebih percaya diri"
      />
      <meta
        name="twitter:image"
        content="https://firebasestorage.googleapis.com/v0/b/ecommerce-nextjs-ed19d.appspot.com/o/Green%20Simple%20Fashion%20Sale%20Promotion%20Banner%20Landscape%20(1).jpg?alt=media&token=00a1c802-46b3-4c33-8bde-80441af33130&_gl=1*10p2i6p*_ga*OTM3MTc5MDkxLjE2OTYwMDA5Njc.*_ga_CW55HF8NVT*MTY5ODIwNTU3Ni40OC4xLjE2OTgyMDY5MTYuNC4wLjA."
      />
    </Head>
  );
};

export default MetaTag;
