import { ICard } from "../../types/types";
export function findIndex(data: ICard[],id: number): number{
    if(id){
        for(let i:number = data.length - 1; i >= 0; i--){
            if(id === data[i].objProduct.id){
                return i;
            }
        }
    }
    return -1;
}