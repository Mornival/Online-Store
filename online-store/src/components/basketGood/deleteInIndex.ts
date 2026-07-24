import { ICard } from "../../types/types";
export function deleteInIndex (data: ICard[],indexNumber: number): ICard[]{
    return data.filter((product , index)=>{
        if(index === indexNumber){
            return false;
        }
        return true;
    })
}