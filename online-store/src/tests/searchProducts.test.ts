import {describe, expect, it} from '@jest/globals';
import { searchProducts } from '../Components/mainProducts/filteredFunctions';
import { defaultDataProducts } from '../data/data';
import { IProduct } from '../types/types';

const {products} = defaultDataProducts;
const testArray = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/1/1.jpg",
      "https://i.dummyjson.com/data/products/1/2.jpg",
      "https://i.dummyjson.com/data/products/1/3.jpg",
      "https://i.dummyjson.com/data/products/1/4.jpg",
      "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
    ]
  },
  {
    id: 2,
    title: "iPhone X",
    description: "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/2/1.jpg",
      "https://i.dummyjson.com/data/products/2/2.jpg",
      "https://i.dummyjson.com/data/products/2/3.jpg",
      "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
    ]
  },
]

describe('When given Array of Goods and searchParams', () => {
  it('returns the filtered array of searchPrarams is true', () => {
    const result = searchProducts(products, 'iphone');
    const expected = testArray;
    expect(result).toEqual(expected)
  })
  it('returns the empty array', () => {
    const result = searchProducts(products, '1111');
    const expected:IProduct[] = [];
    expect(result).toEqual(expected)
  })
  it('returns the default array', () => {
    const result = searchProducts(products, '');
    const expected = products;
    expect(result).toEqual(expected)
  })
})
