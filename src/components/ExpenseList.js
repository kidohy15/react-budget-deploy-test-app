// import React, { Component } from 'react'
import React from 'react'
import './ExpenseList.css';
import ExpenseItem from './ExpenseItem';
import { MdDelete } from 'react-icons/md';

// 클래스컴포넌트
// export class ExpenseList extends Component {
// 함수 컴포넌트 
// props를 함수의 인수로 가져올 수도 있고 
// const ExpenseList = (props) => {
// props로 내려준 데이터를 바로 변수로 사용할 수도 있다 -> 디스트럭쳐링
// const ExpenseList = ({ handleDelete, initialExpenses, handleEdit, clearitems }) => { initialExpenses 부분을 expenses로 변경
const ExpenseList = ({ handleDelete, expenses, handleEdit, clearitems }) => {
  // render() {
    // console.log(this.props.initialExpenses)
    console.log(expenses)
    return (
      /*
       JSX는 항상 부모 요소로 감싸줘야한다 그래서 <div>로 최상단 html 부분을 시작하는데
       필요없는 경우도 있다 이럴경우 <React.rFagment><React.Fragment>를 사용하면 
       최상단의 div 감싸주는 것 없이도
        html 을 작성할 수 있다
        혹은 생략하고 <>내용</> 으로 해도 된다
       */
      <>
       <ul className='list'>
        {/* Expense Item */}
        {/* {this.props.initialExpenses.map(expense => { */}
        {/* {initialExpenses.map(expense => { 목록지우기 버튼으로 지울 수 있게 initialExpenses 부분을 expenses로 변경 */}
        {expenses.map(expense => {
            return (
              <ExpenseItem 
                expense={expense}
                key={expense.id}
                // handleDelete={this.props.handleDelete}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            )
        })}
       </ul>
       {expenses.length > 0 && (
        <button className='btn' onClick={clearitems}>
            목록 지우기
            <MdDelete className='btn-icon' />
        </button>
       )}
      </>
    )
  // }
}

export default ExpenseList