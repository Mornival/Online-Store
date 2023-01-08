import { describe, expect, it } from '@jest/globals';
import { updateStock } from "../Components/mainProducts/filteredFunctions";
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

describe('When given Array of Goods and objectPricesAndStocks', () => {
    it('returns the filtered array by stock', () => {
        const result = updateStock(products, {
            minPrice: 10,
            maxPrice: 1749,
            minStock: 123,
            maxStock: 123
        });
        const expected = testArray;
        expect(result).toEqual(expected)
    })
    it('returns the default array', () => {
        const result = updateStock(products, {
            minPrice: 10,
            maxPrice: 1749,
            minStock: 2,
            maxStock: 150
        });
        const expected = products;
        expect(result).toEqual(expected)
    })
    it('returns the empty array', () => {
        const result = updateStock(testArray, {
            minPrice: 10,
            maxPrice: 1749,
            minStock: 150,
            maxStock: 150
        });
        const expected:IProduct[] = [];
        expect(result).toEqual(expected)
    })
})
