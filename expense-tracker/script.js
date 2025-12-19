let expenses = [];
function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
function loadExpenses() {
  const data = localStorage.getItem("expenses");
  if (data) {
    expenses = JSON.parse(data);
  }
}
function renderExpenses() {
  list.innerHTML = "";

  expenses.forEach((expense) => {
    const li = document.createElement("li");
    li.innerText = `${expense.title} - ₹${expense.amount}`;
    list.appendChild(li);
  });
}

const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");


addBtn.addEventListener("click", () => {
  const title = titleInput.value;
  const amount = amountInput.value;

  if (title === "" || amount === "") return;

  expenses.push({ title, amount });

  saveExpenses();
  renderExpenses();

  titleInput.value = "";
  amountInput.value = "";
});
loadExpenses();
renderExpenses();

