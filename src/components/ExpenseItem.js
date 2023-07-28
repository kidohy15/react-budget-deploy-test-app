import React, { Component } from 'react'
import "./ExpenseItem.css";
import { MdDelete, MdEdit } from 'react-icons/md';

// 클래스 험포넌트 형태
// export class ExpenseItem extends Component {
const ExpenseItem = ({ expense, handleDelete, handleEdit }) => {
  // render() {
    return (
      <li className='item'>
        <div className='info'>
          {/* <span className='expense'>{this.props.expense.charge}</span> */}
          {/* <span className='amount'>{this.props.expense.amount}</span> */}
          <span className='expense'>{expense.charge}</span>
          <span className='amount'>{expense.amount}</span>
        </div>
        <div>
          <button className='edit-btn'
            onClick={() => handleEdit(expense.id)}
          >
            <MdEdit />
          </button>
          <button 
            className='clear-btn' 
            onClick={() => 
              // console.log(`${this.props.expense.id} clicked`)
              // this.props.handleDelete(this.props.expense.id)
              handleDelete(expense.id)
            }
          >
            <MdDelete />
          </button>
        </div>  
        
      </li>
      
    )
  // }
}

export default ExpenseItem