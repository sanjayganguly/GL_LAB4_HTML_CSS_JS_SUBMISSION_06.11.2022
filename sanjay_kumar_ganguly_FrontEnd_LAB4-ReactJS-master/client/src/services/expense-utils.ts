import IExpenseItem from "../models/expense";


const getAllPayeeNames = (expenseItems : IExpenseItem[]) => {

    const uniquePayeeName : string[] = [];

    expenseItems.forEach( (expenseItem) => {
        let payeeName = expenseItem.payeeName;
        if(!uniquePayeeName.includes (payeeName)){
            uniquePayeeName.push(payeeName);
        }
    });

    return uniquePayeeName;
}

export {
    getAllPayeeNames
}