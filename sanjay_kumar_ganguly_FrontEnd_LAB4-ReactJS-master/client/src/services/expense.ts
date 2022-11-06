import axios from 'axios';
import { BASE_API_URL} from '../constants'
import IExpenseItem, { IExpenseCreateItem } from '../models/expense';

const getAllExpenseItems = async () => {
    const apiURL = BASE_API_URL + "/items";
    const responseData = await axios.get<IExpenseItem[]>(apiURL);
    return responseData.data;
};

const postExpenseItem = async (expenseCreateItem : IExpenseCreateItem) => {
    
    const postItemUrl = BASE_API_URL + "/items";

    const responseData = await axios.post<IExpenseItem>(
        postItemUrl,
        expenseCreateItem,
        {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        );
    return responseData.data;
};

export { 
    getAllExpenseItems,
    postExpenseItem
};