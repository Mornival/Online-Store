// Real product image URLs from Unsplash + dummyjson CDN

const unsplash = (id: string, w = 300, h = 300) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;

const dummyjson = (path: string) =>
  `https://cdn.dummyjson.com/product-images/${path}`;

// Category → array of Unsplash photo IDs (cycle through for multiple products)
const categoryImages: Record<string, string[]> = {
  smartphones: [
    "1511707171634-5f897ff02aa9", // iPhone on desk
    "1592750475338-74b7b21085ab", // iPhone X style
    "1610945415295-d9bbf067e59c", // Samsung style
    "1585060544812-6b45742d762f", // OPPO style
    "1567721913486-6585f069130e", // Huawei style
  ],
  laptops: [
    "1517336714731-489689fd1ca8", // MacBook
    "1496181133206-80ce9b88a853", // Laptop generic
    "1525547719571-a2d4ac8945e2", // Surface style
    "1484788984921-03950022c9ef", // Laptop open
    "1525547719571-a2d4ac8945e2", // HP style
  ],
  fragrances: [
    "1541643600914-78b084683601", // Perfume bottle
    "1587017539504-67cfbddac569", // Brown perfume
    "1588405748880-12d1d2a59f75", // Fog scent
    "1608571423902-eed4a5ad8108", // Oil perfume
    "1594035910387-fbc04bf645e0", // Eau de
  ],
  skincare: [
    "1620916566398-39f1143ab7be", // Serum
    "1608248543803-ba4488184f7c", // Tea tree
    "1556228578-0d85b1a4d571", // Moisturizer
    "1612817288484-6f916006741a", // Beauty serum
    "1571781926291-c477ebfd024b", // Cream
  ],
  groceries: [
    "1586201375761-83865001e31c", // Daal/lentils
    "1551462147-ff29053bfc14", // Pasta/macaroni
    "1589984662646-e7b2e4962f18", // Orange essence
    "1517093157656-b9eccef91cb1", // Cereals
    "1596040033229-a9821ebd058d", // Powder
  ],
  "home-decoration": [
    "1485955900006-10f4d324d411", // Plant hanger
    "1513694203232-719a280e022f", // Decor
    "1507473885765-e6ed057ab6fe", // Lamp
    "1567016432779-094069958ea5", // Chinese decor
    "1590846083693-f23fdede3a7e", // Key holder
  ],
  furniture: [
    "1505693416388-ac5ce068fe85", // Bed
    "1555041469-a586c61ea9bc", // Sofa
    "1532372320572-cda25653a26d", // Shelves
    "1533090161767-e6ffed986c88", // Table
    "1595428774223-ef52624120d2", // Wardrobe
  ],
  tops: [
    "1594938298603-c8148c4dae35", // Sleeve shirt
    "1434389677669-e08b4cda3a6e", // Tank top
    "1583846783214-7229a91b20ed", // Kids tank
    "1576566588028-4147f3842f27", // Sweater
    "1515886657613-9f3515b0c78f", // Winter clothes
  ],
  "womens-dresses": [
    "1515886657613-9f3515b0c78f", // Night suit
    "1490481651871-ab68de25d43d", // Kurta
    "1518622358385-8ea7d3654475", // Frock
    "1496747611176-843222e1e57c", // Multicolor dress
    "1572804013309-59a88b7e92f1", // Maxi dress
  ],
  "womens-shoes": [
    "1543163521-1bf539c55dd2", // Women shoes
    "1525966222134-fcfa99b8ae77", // Sneakers
    "1543163521-1bf539c55dd2", // Heels
    "1543163521-1bf539c55dd2", // Sandals
    "1525966222134-fcfa99b8ae77", // Casual shoes
  ],
  "mens-shirts": [
    "1521572163474-6864f9cf17ab", // T-shirt
    "1521572163474-6864f9cf17ab", // Printed T
    "1521572163474-6864f9cf17ab", // Graphic T
    "1521572163474-6864f9cf17ab", // Pubg T
    "1521572163474-6864f9cf17ab", // Money Heist T
  ],
  "mens-shoes": [
    "1542291026-7eec264c27ff", // Sneakers
    "1542291026-7eec264c27ff", // Loafers
    "1542291026-7eec264c27ff", // Formal
    "1542291026-7eec264c27ff", // Spring
    "1542291026-7eec264c27ff", // Jeans shoes
  ],
  "mens-watches": [
    "1524592094714-0f0654e20314", // Leather watch
    "1522312346375-d1a52e2b99b3", // Waterproof
    "1524592094714-0f0654e20314", // Royal blue
    "1522312346375-d1a52e2b99b3", // Skeleton
    "1524592094714-0f0654e20314", // Stainless
  ],
  "womens-watches": [
    "1515688594390-b649af70d282", // Couple watch
    "1522312346375-d1a52e2b99b3", // Magnetic
    "1515688594390-b649af70d282", // Digital
    "1515688594390-b649af70d282", // Pearls
    "1515688594390-b649af70d282", // Stainless women
  ],
  "womens-bags": [
    "1548036328-c9fa89d128fa", // Shoulder bag
    "1584917865442-de89df76afd3", // Crossbody
    "1590874103328-eac38ef1627b", // Bag style
  ],
  sunglasses: [
    "1572635196237-14b3f281503f", // Sunglasses
    "1511499767150-a48a237f0083", // Sunglasses 2
  ],
  automotive: [
    "1492144534653-4b376cf8b1c0", // Car
  ],
  motorcycle: [
    "1558618666-fcd25c85f82e", // Motorcycle
  ],
  lighting: [
    "1507473885765-e6ed057ab6fe", // Lamp
    "1513506003901-1e6a229e2d15", // Chandelier
  ],
};

export function getImages(
  title: string,
  category: string,
  count: number,
  id: number
): { thumbnail: string; images: string[] } {
  const pool = categoryImages[category] || [
    "1505740420928-5e560c06d30e",
  ];

  const thumbnail = unsplash(pool[(id - 1) % pool.length]);

  const images = Array.from({ length: count }, (_, i) =>
    unsplash(pool[(id - 1 + i) % pool.length], 600, 600)
  );

  return { thumbnail, images };
}
