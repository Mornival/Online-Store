import { describe, expect, it } from '@jest/globals';
import { updateBrand } from '../Components/mainProducts/filteredFunctions';
import { defaultDataProducts } from '../data/data';
import { IProduct } from '../types/types';

const { products } = defaultDataProducts;

const testArray = [
    {
        id: 4,
        title: "OPPOF19",
        description: "OPPO F19 is officially announced on April 2021.",
        price: 280,
        discountPercentage: 17.91,
        rating: 4.3,
        stock: 123,
        brand: "OPPO",
        category: "smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
        images: [
          "https://i.dummyjson.com/data/products/4/1.jpg",
          "https://i.dummyjson.com/data/products/4/2.jpg",
          "https://i.dummyjson.com/data/products/4/3.jpg",
          "https://i.dummyjson.com/data/products/4/4.jpg",
          "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
        ]
      },
]

describe('When given Array of Goods and brandInputsArray', () => {
    it('returns the default array', () => {
        const result = updateBrand(products, []);
        const expected = products;
        expect(result).toEqual(expected)
    })
    it('returns the empty array', () => {
        const result = updateBrand([], ['OPPO']);
        const expected:IProduct[] = [];
        expect(result).toEqual(expected)
    })
    it('returns filtered array by brandInputsArray', () => {
        const result = updateBrand(products, ['OPPO']);
        const expected = testArray;
        expect(result).toEqual(expected)
    })
})
