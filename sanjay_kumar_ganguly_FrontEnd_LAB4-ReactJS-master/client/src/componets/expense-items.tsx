import IExpenseItem from "../models/expense";
import { Table } from "react-bootstrap";

type ExpenseItemsModel = {
    expenseItems : IExpenseItem[];
}

const ExpenseItems = ({expenseItems} : ExpenseItemsModel) => {

    return (
        <>
            {
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Expense Description</th>
                            <th>Payee Name</th>
                            <th>Paied Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            expenseItems.map(
                                (expenseItem, index) => (
                                    <tr key={ index + 1}>
                                        <td>{ expenseItem.id}</td>
                                        <td>{ expenseItem.expenseDescription}</td>
                                        <td>{ expenseItem.payeeName}</td>
                                        <td>{ expenseItem.date.toString()}</td>
                                        <td>{ expenseItem.price.toString()}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </Table>
            }
        </>
    );
}

export { ExpenseItems };