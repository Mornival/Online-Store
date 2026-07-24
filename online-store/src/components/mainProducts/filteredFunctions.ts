import { IProduct, IDataSlider } from "../../types/types";

export function searchProducts(products: IProduct[], searchData: string): IProduct[] {
    if (searchData.length === 0) {
        return products;
    }
    return products.filter(item => {
        return item.category.toLowerCase().indexOf(searchData.toLowerCase()) > -1 ||
            item.brand.toLowerCase().indexOf(searchData.toLowerCase()) > -1 ||
            item.title.toLowerCase().indexOf(searchData.toLowerCase()) > -1 ||
            item.price.toString().indexOf(searchData) > -1 ||
            item.stock.toString().indexOf(searchData) > -1 ||
            item.rating.toString().indexOf(searchData) > -1 ||
            item.discountPercentage.toString().indexOf(searchData) > -1
    })
}

export function updateCategory(products: IProduct[], checkedInputs: (string | undefined)[]): IProduct[] {
    if (!checkedInputs || !checkedInputs[0]) {
        return products;
    }
    if (checkedInputs.length === 0) {
        return products;
    }
    const filteredArr: IProduct[] = [];
    for (let filter of checkedInputs) {
        products.forEach(item => {
            if (item.category === filter) {
                filteredArr.push(item);
            }
        })
    }
    return filteredArr;
}

export function updateBrand(products: IProduct[], checkedInputs: (string | undefined)[]): IProduct[] {
    if (!checkedInputs || !checkedInputs[0]) {
        return products;
    }
    if (checkedInputs.length === 0) {
        return products;
    }
    const filteredArr: IProduct[] = [];
    for (let filter of checkedInputs) {
        products.forEach(item => {
            if (item.brand === filter) {
                filteredArr.push(item);
            }
        })
    }
    return filteredArr;
}

export function sortProducts(products: IProduct[], kindOfSort: string): IProduct[] {
    const res = [...products];
    switch (kindOfSort) {
        case 'price-ASC':
            return res.sort((a, b) => a.price - b.price);
        case 'price-DESC':
            return res.sort((a, b) => b.price - a.price);
        case 'rating-ASC':
            return res.sort((a, b) => a.rating - b.rating);
        case 'rating-DESC':
            return res.sort((a, b) => b.rating - a.rating);
        case 'discount-ASC':
            return res.sort((a, b) => a.discountPercentage - b.discountPercentage);
        case 'discount-DESC':
            return res.sort((a, b) => b.discountPercentage - a.discountPercentage);
        default:
            return res;
    }
}

export function updatePrice(products: IProduct[], state: IDataSlider): IProduct[] {
    const { minPrice, maxPrice } = state;
    return products.filter(item => item.price >= minPrice && item.price <= maxPrice)
}

export function updateStock(products: IProduct[], state: IDataSlider): IProduct[] {
    const { minStock, maxStock } = state;
    return products.filter(item => item.stock >= minStock && item.stock <= maxStock)
}