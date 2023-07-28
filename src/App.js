// import { Component } from "react";
import { useState } from "react";
import "./App.css";
import { Alert } from "./components/Alert";
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from "./components/ExpenseList";

// 클래스 컴포넌트
// class App extends Component {
// 함수형 컴포넌트 형태
const App = () => {

  const [charge, setCharge] = useState("");
  const [id, setId] = useState('')
  const [edit, setEdit] = useState(false)

  // useSta 까지 치면 자동 완성 목록이 나오는데 그중 useStateSnippet을 이용하면 아래처럼 구성이 된다
  // const [first, setfirst] = useState(second)
  const [amount, setAmount] = useState(0);

  const [alert, setAlert] = useState({ show: false })

  // 함수형 컴포넌트에서 state 사용법
  const [expenses, setExpenses] = useState([
    { id: 1, charge: "렌트비", amount: 1600},
    { id: 2, charge: "교통비", amount: 400},
    { id: 3, charge: "식비", amount: 1200},
  ])

  const clearitems = () => {
    setExpenses([]);
  }

  // 이벤트가 발생했을 때 여기서 이벤트 객체 e를 받아오게 된다
  // setCharge에 e.target.value를 이용해서 입력한 값을 state에 반영될 수 있도록 한다
  const handleCharge = (e) => {
    console.log(e.target.value);
    setCharge(e.target.value);
  }

  const handleAmount = (e) => {
    // typeof를 이용해 개발자 도구 콘솔 로그를 보면 e.target.value는 string값이다
    // 이 함수를 호출하는 input의 경우 숫자만 값이 들어 갈 수 있다.
    // e.target.valueAsNumber를 이용
    console.log(typeof e.target.valueAsNumber);
    console.log(e.target.valueAsNumber);
    setAmount(e.target.valueAsNumber);
  }

  const handleSubmit = (e) => {
    // submit 버튼을 클릭시 기본적으로 화면 refresh가 일어나게 된다
    // 그것을 막기 위해 사용
    e.preventDefault();
    if(charge !== "" && amount > 0) {
      if(edit) {
        const newExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount } : item
        })

        setExpenses(newExpenses);
        setEdit(false);
        handleAlert({ type: 'success', text: "아이템이 수정되었습니다."});

      } else {
        const newExpense = {id: crypto.randomUUID(), charge, amount }
  
        // 불변성을 지켜주기 위해서 새로운 expenses를 생성
        // [...expenses, newExpense]에서 ...은 스프레드라고 말하고 기존 expenses에 있던 것들을 하나씩 나열을 해준다
        // 얕은 복사를 하여 새로운 것을 나열한다 -> 원본을 그대로 가져오는게 아니라 새로운 것을 생성한다는 말임
        // 복사된 데이터 뒤에 위에 새로 만든 newExpense가 추가된다
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses)
        handleAlert({ type: 'success', text: '아이템이 생성되었습니다.'})
      }
      setCharge(""); // 초기화
      setAmount(0); // 초기화
    } else {
      console.log('error');
      handleAlert({
        type: 'danger',
        text: 'charge는 빈 값일 수 없으며 amount는 0보다 커야 합니다.'
      })
    }
  }

  // 클래스 컴포넌트에서 state 사용법
  // constructor(props) { 
  //   super(props);
  //   this.state = {
  //     // expenses는 state를 사용할 이름이다
  //     expenses: [
  //       { id: 1, charge: "렌트비", amount: 1600},
  //       { id: 2, charge: "교통비", amount: 400},
  //       { id: 3, charge: "식비", amount: 1200},
  //     ]
  //   }
  // }

  /* 가짜 데이터 생성 */
  // initialExpenses = [
  //   { id: 1, charge: "렌트비", amount: 1600},
  //   { id: 2, charge: "교통비", amount: 400},
  //   { id: 3, charge: "식비", amount: 1200},
  // ]

  // 함수형 컴포넌트에서는 함수를 정의할때 const,let,var 함수명 앞에 붙음
  const handleDelete = (id) => {
    // const newExpenses = this.initialExpenses.filter(expense => expense.id !== id) 
    // state를 사용할때는 this.state.state이름
    // 클래스 컴포넌트 형태
    // const newExpenses = this.state.expenses.filter(expense => expense.id !== id) 
    const newExpenses = expenses.filter(expense => expense.id !== id) 
    console.log(newExpenses);
    setExpenses(newExpenses); // state 업데이트 처리하는 코드
    handleAlert({ type: 'danger', text: '아이템이 삭제되었습니다.'})
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 7000);
  }

  const handleEdit = id => {
    const expense = expenses.find(item => item.id === id);
    const { charge, amount } = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  };

  // 클래스 컴포넌트 형태
  // handleDelete = (id) => {
  //   // const newExpenses = this.initialExpenses.filter(expense => expense.id !== id) 
  //   // state를 사용할때는 this.state.state이름
  //   const newExpenses = this.state.expenses.filter(expense => expense.id !== id) 
  //   console.log(newExpenses);
  //   // state 데이터를 함수 동작 후 처리된 상태로 업데이트를 해주려면 setState를 사용해야한다
  //   // this.setState({ 업데이트할 state 이름: 새롭게 변한 값이 담긴 변수 이름 });
  //   this.setState({ expenses: newExpenses });
  // }

  // render() {
    return (
      <main className="main-container">
        {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
        <h1>예산 계산기</h1>

        <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem'}} >
          {/* Epense Fo0rm */}
          <ExpenseForm 
            handleCharge={handleCharge} 
            charge={charge}
            handleAmount={handleAmount} 
            amount={amount}
            handleSubmit={handleSubmit} 
            edit={edit}
          />  
        </div>

        <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem'}} >
          {/* Epense List */}  
          <ExpenseList 
            // initialExpenses={this.initialExpenses} // 일반 배열의 데이터
            // this.state.state명 은 클래스 컴포넌트 형태의 표현
            // initialExpenses={this.state.expenses} // state에 넣은 데이터
            // handleDelete={this.handleDelete}
            // 함수형 컴포넌트 표현
            // initialExpenses={expenses} // state에 넣은 데이터 -> 목록 지우기 버튼을 위해 initialExpenses는 expenses로 바꾸었다  
            expenses={expenses} // state에 넣은 데이터
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            clearitems={clearitems}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem'}} >
          <p style={{ fontSize: '2rem'}}>
            총지출:
            
            <span>
              {expenses.reduce((acc,curr) => {
                console.log(expenses);
                return (acc += curr.amount);
              }, 0)}
              원
            </span>
          </p>
        </div>
      </main>
    )
  // }
}

/*  위에 작성된 것을 내보내줘야지 
index.js의 root.render 안에 <App /> 부분에서 받아서 화면에 그려준다 
default의 의미는 이것을 메인으로 내보낸다는 의미
*/
export default App;