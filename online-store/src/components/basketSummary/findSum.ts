import { ICard } from "../../types/types";
export const findSum = (data: ICard[],coef:number) =>{
    let prodsAmount:number = 0;
    if(data){
        prodsAmount = data.reduce((acum,cur) => acum + cur.objProduct.price * coef,0);
    }
    return prodsAmount;
}