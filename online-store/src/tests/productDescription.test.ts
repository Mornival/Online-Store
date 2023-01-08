import {describe, expect, test} from '@jest/globals';
import { dropGood } from '../Components/productDescriptionPage/ProductDescriptionPage';
import { ICard } from '../types/types';
// import { findSum,checkDiscount } from '../Components/basketSummary/BasketSummary';
// import { findIndex, deleteInIndex } from '../Components/basketGood/BasketGood';
let testObj:ICard[] = [
  {
      "objProduct": {
          "id": 17,
          "title": "Tree Oil 30ml",
          "description": "Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
          "price": 12,
          "discountPercentage": 4.09,
          "rating": 4.52,
          "stock": 78,
          "brand": "Hemani Tea",
          "category": "skincare",
          "thumbnail": "https://i.dummyjson.com/data/products/17/thumbnail.jpg",
          "images": [
              "https://i.dummyjson.com/data/products/17/1.jpg",
              "https://i.dummyjson.com/data/products/17/2.jpg",
              "https://i.dummyjson.com/data/products/17/3.jpg",
              "https://i.dummyjson.com/data/products/17/thumbnail.jpg"
          ]
      }
  },
  {
      "objProduct": {
          "id": 11,
          "title": "perfume Oil",
          "description": "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
          "price": 13,
          "discountPercentage": 8.4,
          "rating": 4.26,
          "stock": 65,
          "brand": "Impression of Acqua Di Gio",
          "category": "fragrances",
          "thumbnail": "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
          "images": [
              "https://i.dummyjson.com/data/products/11/1.jpg",
              "https://i.dummyjson.com/data/products/11/2.jpg",
              "https://i.dummyjson.com/data/products/11/3.jpg",
              "https://i.dummyjson.com/data/products/11/thumbnail.jpg"
          ]
      }
  },
  {
      "objProduct": {
          "id": 13,
          "title": "Fog Scent Xpressio Perfume",
          "description": "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
          "price": 13,
          "discountPercentage": 8.14,
          "rating": 4.59,
          "stock": 61,
          "brand": "Fog Scent Xpressio",
          "category": "fragrances",
          "thumbnail": "https://i.dummyjson.com/data/products/13/thumbnail.webp",
          "images": [
              "https://i.dummyjson.com/data/products/13/1.jpg",
              "https://i.dummyjson.com/data/products/13/2.png",
              "https://i.dummyjson.com/data/products/13/3.jpg",
              "https://i.dummyjson.com/data/products/13/4.jpg",
              "https://i.dummyjson.com/data/products/13/thumbnail.webp"
          ]
      }
  },
  {
      "objProduct": {
          "id": 22,
          "title": "Elbow Macaroni - 400 gm",
          "description": "Product details of Bake Parlor Big Elbow Macaroni - 400 gm",
          "price": 14,
          "discountPercentage": 15.58,
          "rating": 4.57,
          "stock": 146,
          "brand": "Bake Parlor Big",
          "category": "groceries",
          "thumbnail": "https://i.dummyjson.com/data/products/22/thumbnail.jpg",
          "images": [
              "https://i.dummyjson.com/data/products/22/1.jpg",
              "https://i.dummyjson.com/data/products/22/2.jpg",
              "https://i.dummyjson.com/data/products/22/3.jpg"
          ]
      }
  },
  {
      "objProduct": {
          "id": 23,
          "title": "Orange Essence Food Flavou",
          "description": "Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item",
          "price": 14,
          "discountPercentage": 8.04,
          "rating": 4.85,
          "stock": 26,
          "brand": "Baking Food Items",
          "category": "groceries",
          "thumbnail": "https://i.dummyjson.com/data/products/23/thumbnail.jpg",
          "images": [
              "https://i.dummyjson.com/data/products/23/1.jpg",
              "https://i.dummyjson.com/data/products/23/2.jpg",
              "https://i.dummyjson.com/data/products/23/3.jpg",
              "https://i.dummyjson.com/data/products/23/4.jpg",
              "https://i.dummyjson.com/data/products/23/thumbnail.jpg"
          ]
      }
  }
]
let endTestObj:ICard[] = [
  {
      "objProduct": {
          "id": 17,
          "title": "Tree Oil 30ml",
          "description": "Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
          "price": 12,
          "discountPercentage": 4.09,
          "rating": 4.52,
          "stock": 78,
          "brand": "Hemani Tea",
          "category": "skincare",
          "thumbnail": "https://i.dummyjson.com/data/products/17/thumbnail.jpg",
          "images": [
              "https://i.dummyjson.com/data/products/17/1.jpg",
              "https://i.dummyjson.com/data/products/17/2.jpg",
              "https://i.dummyjson.com/data/products/17/3.jpg",
              "https://i.dummyjson.com/data/products/17/thumbnail.jpg"
          ]
      }
  },
  {
      "objProduct": {
          "id": 11,
          "title": "perfume Oil",
          "description": "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
          "price": 13,
          "discountPercentage": 8.4,
          "rating": 4.26,
          "stock": 65,
          "brand": "Impression of Acqua Di Gio",
          "category": "fragrances",
          "thumbnail": "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
          "images": [
              "https://i.dummyjson.com/data/products/11/1.jpg",
              "https://i.dummyjson.com/data/products/11/2.jpg",
              "https://i.dummyjson.com/data/products/11/3.jpg",
              "https://i.dummyjson.com/data/products/11/thumbnail.jpg"
          ]
      }
  },
  {
      "objProduct": {
          "id": 13,
          "title": "Fog Scent Xpressio Perfume",
          "description": "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
          "price": 13,
          "discountPercentage": 8.14,
          "rating": 4.59,
          "stock": 61,
          "brand": "Fog Scent Xpressio",
          "category": "fragrances",
          "thumbnail": "https://i.dummyjson.com/data/products/13/thumbnail.webp",
          "images": [
              "https://i.dummyjson.com/data/products/13/1.jpg",
              "https://i.dummyjson.com/data/products/13/2.png",
              "https://i.dummyjson.com/data/products/13/3.jpg",
              "https://i.dummyjson.com/data/products/13/4.jpg",
              "https://i.dummyjson.com/data/products/13/thumbnail.webp"
          ]
      }
  },
  {
      "objProduct": {
          "id": 22,
          "title": "Elbow Macaroni - 400 gm",
          "description": "Product details of Bake Parlor Big Elbow Macaroni - 400 gm",
          "price": 14,
          "discountPercentage": 15.58,
          "rating": 4.57,
          "stock": 146,
          "brand": "Bake Parlor Big",
          "category": "groceries",
          "thumbnail": "https://i.dummyjson.com/data/products/22/thumbnail.jpg",
          "images": [
              "https://i.dummyjson.com/data/products/22/1.jpg",
              "https://i.dummyjson.com/data/products/22/2.jpg",
              "https://i.dummyjson.com/data/products/22/3.jpg"
          ]
      }
  }
]
// describe('When have obj with id', () => {
//     it('returns the sum of those 2 numbers', () => {
//       const result = findIndex(testObj,23);
//       const expected = 4;
//       expect(result).toEqual(expected);
//     })
//   })

  describe('When have obj with id', () => {
    it('returns the sum of those 2 numbers', () => {
      const result: ICard[] = dropGood(testObj,23);
      const expected = endTestObj;
      expect(result).toEqual(expected);
    })
  });