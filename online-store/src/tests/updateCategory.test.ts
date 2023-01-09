import { describe, expect, it } from '@jest/globals';
import { updateCategory } from '../Components/mainProducts/filteredFunctions';
import { defaultDataProducts } from '../data/data';
import { IProduct } from '../types/types';

const { products } = defaultDataProducts;

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
    {
        id: 3,
        title: "Samsung Universe 9",
        description: "Samsung's new variant which goes beyond Galaxy to the Universe",
        price: 1249,
        discountPercentage: 15.46,
        rating: 4.09,
        stock: 36,
        brand: "Samsung",
        category: "smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
        images: [
            "https://i.dummyjson.com/data/products/3/1.jpg"
        ]
    },
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
    {
        id: 5,
        title: "Huawei P30",
        description: "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
        price: 499,
        discountPercentage: 10.58,
        rating: 4.09,
        stock: 32,
        brand: "Huawei",
        category: "smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
        images: [
            "https://i.dummyjson.com/data/products/5/1.jpg",
            "https://i.dummyjson.com/data/products/5/2.jpg",
            "https://i.dummyjson.com/data/products/5/3.jpg"
        ]
    },
]

describe('When given Array of Goods and categoryInputsArray', () => {
    it('returns the filtered array by categoryInputsArray', () => {
        const result = updateCategory(products, ['smartphones']);
        const expected = [...testArray];
        expect(result).toEqual(expected)
    })
    it('returns the default array', () => {
        const result = updateCategory(products, []);
        const expected = products;
        expect(result).toEqual(expected)
    })
    it('returns the empty array', () => {
        const result = updateCategory([], ['smartphones']);
        const expected:IProduct[] = [];
        expect(result).toEqual(expected)
    })
    it('returns the default array', () => {
        const result = updateCategory(products, ['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'home-decoration', 'furniture', 'tops', 'womens-dresses', 'womens-shoes', 'mens-shirts', 'mens-shoes', 'mens-watches', 'womens-watches', 'womens-bags', 'womens-jewellery', 'sunglasses', 'automotive', 'motorcycle', 'lighting']);
        const expected = products;
        expect(result).toEqual(expected)
    })
})
