import {describe, expect, it} from '@jest/globals';
import { sortProducts } from '../Components/mainProducts/filteredFunctions';
import { defaultDataProducts } from '../data/data';
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

describe('When given Array of Goods and sortParams', () => {
      it('returns the default array', () => {
      const result = sortProducts(products, '');
      const expected = products;
      expect(result).toEqual(expected)
    })

      it('returns the filtered array by price-ASC', () => {
      const result = sortProducts(testArray, 'price-ASC');
      const expected = [...testArray];
      expect(result).toEqual(expected)
    })
      it('returns the filtered array by price-DESC', () => {
      const result = sortProducts(testArray, 'price-DESC');
      const expected = [...testArray].reverse();
      expect(result).toEqual(expected)
    })
      it('returns the filtered array by rating-ASC', () => {
      const result = sortProducts(testArray, 'rating-ASC');
      const expected = [...testArray].reverse();
      expect(result).toEqual(expected)
    })
      it('returns the filtered array by rating-DESC', () => {
      const result = sortProducts(testArray, 'rating-DESC');
      const expected = [...testArray];
      expect(result).toEqual(expected)
    })
      it('returns the filtered array by discount-ASC', () => {
      const result = sortProducts(testArray, 'discount-ASC');
      const expected = [...testArray];
      expect(result).toEqual(expected)
    })
      it('returns the filtered array by discount-DESC', () => {
      const result = sortProducts(testArray, 'discount-DESC');
      const expected = [...testArray].reverse();
      expect(result).toEqual(expected)
    })
  })

  