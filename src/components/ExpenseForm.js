// 컴포넌트 클레스는 함수형에서는 필요없어서 주석함
// import React, { Component } from 'react'
import React from 'react'
import "./ExpenseForm.css";
import { MdSend } from 'react-icons/md';

// class 컴포넌트
// export class ExpenseForm extends Component {  
// 함수형 컴포넌트
const ExpenseForm = ({ handleCharge, charge, handleAmount, amount, handleSubmit, edit }) => {
  // render 함수 안에 랜더링할 컴포넌트 영역을 넣는 것은 class 컴포넌트에서만 해당한다
  // 함수형 컴포넌트에서는 render() 함수 안에 랜더링할 컴포넌트를 넣을 필요 없음
  // render() {
    return (
      // form  안의 버튼을 누르면 해당 form에 submit 이벤트가 발생하게 된다
      <form onSubmit={handleSubmit}>
        <div className='form-center'>
          <div className='form-group'>
            <label htmlFor='charge'>지출 항목</label> 
            <input 
              type='text' 
              className='form-control' 
              id='charge' 
              name='charge' 
              value={charge}
              placeholder='예) 렌트비'
              // onChane={() => {
              //   handleCharge()
              // }} 간단하게 아래 코드로 바꿈
              onChange={handleCharge}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='amount'>비용</label> 
            <input 
                type='number' 
                className='form-control' 
                id='amount' 
                name='amount' 
                value={amount}
                placeholder='예) 100'
                onChange={handleAmount}
              />
          </div>

        </div>
        
        <button type='submit' className='btn'>
          {edit ? "수정" : "제출"}
          <MdSend className='btn-icon'/>
        </button>
      </form>
      )
  // }
}

export default ExpenseForm