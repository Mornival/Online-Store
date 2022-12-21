export interface IDataProducts {
    products: IProduct[],
    total: number,
    skip: number,
    limit: number
}

export interface IProduct{
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
    id: number,
    title: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    widthCard?:number,
  }