export interface IDataProducts {
    products: IProduct[],
    total: number,
    skip: number,
    limit: number
}

export interface IProduct {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[]
}

export interface ICard {
    key?: number,
    objProduct: IProduct,
    widthCard?: number,
    idNOMER2?:number
}

export interface IDataFilter {
    dataCategory: (string | undefined)[],
    dataBrand: (string | undefined)[],
}

export interface IDataSlider {
    minPrice: number,
    maxPrice: number,
    minStock: number,
    maxStock: number
}