import React, { FormEvent, useState, useRef } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import IExpenseItem, { IExpenseCreateItem } from '../models/expense';
import { postExpenseItem } from '../services/expense';
import { getAllPayeeNames } from '../services/expense-utils';

type ExpenseICreatorModel = {
    expenseItems : IExpenseItem[];
    refreshParent : (newEspenseItem : IExpenseItem) => void
}

const ExpenseCreator = ({expenseItems, refreshParent} : ExpenseICreatorModel) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const expenseDescriptionRef = useRef <HTMLInputElement>(null);
    const payeeNameRef = useRef <HTMLSelectElement>(null);
    const priceRef = useRef <HTMLInputElement>(null);
    // const dateRef = useRef <HTMLTimeElement>(null);

    const handleAddExpense = async ( event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(`${expenseDescriptionRef?.current?.value}`);

        
        const expenseCreateItem : IExpenseCreateItem = {
            expenseDescription:  expenseDescriptionRef.current?.value as string,
            payeeName : payeeNameRef.current?.value as string,
            price : parseFloat(priceRef.current?.value as string),
            date: new Date().toISOString().slice(0,10)
        }

        const updatedExpenseCreatedItem = await postExpenseItem(expenseCreateItem);

        console.log(updatedExpenseCreatedItem);

        refreshParent(updatedExpenseCreatedItem);

        handleClose();
    }

    return (
        <>
            <Button variant="primary" className="float-end" onClick={handleShow}>New Expense Item</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new Expense Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddExpense}>
                        <Form.Group className="mb-3" controlId="expenseDescription">
                            <Form.Label>Expense Description*</Form.Label>
                            <Form.Control type="text" placeholder="Enter expense description" ref={expenseDescriptionRef} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="payeeName">
                            <Form.Label>Payee Name</Form.Label>
                            <Form.Select aria-label="Default select example" ref={payeeNameRef} required >
                                {/* <option>Select the Payee</option> */}
                                
                                {
                                    getAllPayeeNames(expenseItems).map((payeName) => (      
                                        <option value={payeName}>{payeName}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="expenseDate">
                            <Form.Label>Expense Date</Form.Label>
                            <Form.Control type="date" placeholder="Select expense date" />
                        </Form.Group> */}

                        <Form.Group className="mb-3" controlId="price" >
                            <Form.Label>Price*</Form.Label>
                            <Form.Control type="number" placeholder="Enter the amount" ref={priceRef} required/>
                        </Form.Group>

                        <div style={{paddingLeft: '17%'}}>
                            <Button variant="primary" type="submit" style={{width:'9em'}}>
                                Add Expense
                            </Button>
                            {'  '}
                            <Button variant="secondary" onClick={handleClose} style={{width:'9em'}}>
                                Close
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ExpenseCreator;