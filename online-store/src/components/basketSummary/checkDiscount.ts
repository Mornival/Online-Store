export const checkDiscount = (arrUsed: string[]): number=> {
    let discountCoef: number = 1;
    if(arrUsed){
        discountCoef = 1 - (arrUsed.length/10);
    }
    return discountCoef;
}