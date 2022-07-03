import { useState } from "react";

export default function App() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [newExpense, setNewExpense] = useState({ date: 1, use: "", amount: 0 });
  const [displyaingMonth, setDisplayingMonth] = useState(1);

  const moveToPrevMonth = () => {
    setDisplayingMonth(displyaingMonth - 1);
  };
  const moveToNextMonth = () => {
    setDisplayingMonth(displyaingMonth + 1);
  };
  const handleChangeNewExpenseDate = (e: any) => {
    setNewExpense({
      ...newExpense,
      date: e.target.value
    });
  };
  const handleChangeNewExpenseUse = (e: any) => {
    setNewExpense({
      ...newExpense,
      use: e.target.value
    });
  };
  const handleChangeNewExpenseAmount = (e: any) => {
    setNewExpense({
      ...newExpense,
      amount: e.target.value
    });
  };
  const handleClickSave = () => {
    setExpenses([...expenses, { ...newExpense, month: displyaingMonth }]);
    setNewExpense({ date: 1, use: "", amount: 0 });
  };
  const isNewExpenseInvalid =
    newExpense.date < 0 ||
    newExpense.date > 31 ||
    newExpense.use === "" ||
    newExpense.amount <= 0;

  return (
    <div className="wrapper">
      <div className="header">
        <button
          className="button"
          disabled={displyaingMonth === 1}
          onClick={moveToPrevMonth}
        >
          前の月へ
        </button>
        <h1>{displyaingMonth}月</h1>
        <button
          className="button"
          disabled={displyaingMonth === 12}
          onClick={moveToNextMonth}
        >
          次の月へ
        </button>
      </div>
      <div className="expense-list">
        <ul>
          {expenses
            .filter((e) => e.month === displyaingMonth)
            .map((expense, i) => (
              <li key={i}>
                {expense.date}日 {expense.use} {expense.amount}円
              </li>
            ))}
        </ul>
        <p className="expense-sum">
          支出合計：
          {expenses
            .filter((e) => e.month === displyaingMonth)
            .reduce((sum, expense) => sum + Number(expense.amount), 0)}
          円
        </p>
      </div>
      <div className="new-expense-form">
        <h2>支出を追加</h2>
        <p className="label">日付</p>
        <input
          className="input"
          placeholder="10"
          type="number"
          value={newExpense.date}
          onChange={handleChangeNewExpenseDate}
        />
        日
        <br />
        <p className="label">用途</p>
        <input
          className="input"
          placeholder="用途を入力"
          value={newExpense.use}
          onChange={handleChangeNewExpenseUse}
        />
        <p className="label">金額</p>
        <input
          className="input"
          placeholder="金額を入力"
          type="number"
          value={newExpense.amount}
          onChange={handleChangeNewExpenseAmount}
        />
        <div>
          <button
            className="button"
            disabled={isNewExpenseInvalid}
            onClick={handleClickSave}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
