import { ICard } from "../../types/types";
export const dropGood = function(data: ICard[],idGood: number){
    return data.filter((v , i) => {
        if(idGood !== data[i].objProduct.id){
            return v;
        }
    });
}