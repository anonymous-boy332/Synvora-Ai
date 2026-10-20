console.log("Expense JS Loaded");

// ==========================
// EXPENSE MANAGEMENT
// ==========================


let addExpenseBtn;
let expenseModal;
let closeExpense;
let saveExpense;
let expenseTable;
let searchExpense;
let categoryFilter;
let statusFilter;
let editExpenseId = null;
let exportExpense;
let exportPdf;

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function initExpense(){

    addExpenseBtn = document.querySelector(".add-expense-btn");

    expenseModal = document.getElementById("expenseModal");

    closeExpense = document.getElementById("closeExpense");
console.log(closeExpense);
  
    saveExpense = document.getElementById("saveExpense");

  
    expenseTable = document.querySelector(".expense-table tbody");

    searchExpense = document.getElementById("searchExpense");

    categoryFilter = document.getElementById("categoryFilter");

    statusFilter = document.getElementById("statusFilter");

exportExpense = document.getElementById("exportExpense");
exportPdf = document.getElementById("exportPdf");
  

if(addExpenseBtn){

addExpenseBtn.onclick = () => {

    expenseModal.style.display = "flex";

};

}

  saveExpense.onclick = () => {


    let name = document.getElementById("expenseName").value;

    let category = document.getElementById("expenseCategory").value;

    let date = document.getElementById("expenseDate").value;

    let amount = document.getElementById("expenseAmount").value;

    let status = document.getElementById("expenseStatus").value;



    if(name === "" || amount === ""){

        alert("Please fill expense name and amount");

        return;

    }



    if(editExpenseId !== null){

    let expense = expenses.find(e => e.id === editExpenseId);

    expense.name = name;
    expense.category = category;
    expense.date = date;
    expense.amount = amount;
    expense.status = status;

    editExpenseId = null;

}else{

    let expense = {

        id: expenses.length + 1,

        name:name,

        category:category,

        date:date,

        amount:amount,

        status:status

    };

    expenses.push(expense);

}


    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    displayExpenses();


    expenseModal.style.display="none";

    document.getElementById("expenseName").value = "";
document.getElementById("expenseCategory").value = "";
document.getElementById("expenseDate").value = "";
document.getElementById("expenseAmount").value = "";
document.getElementById("expenseStatus").value = "Paid";

};

  exportPdf.onclick = () => {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Synvora AI", 14, 18);

    doc.setFontSize(14);
    doc.text("Expense Report", 14, 28);

    doc.setFontSize(10);
    doc.text("Generated: " + new Date().toLocaleString(), 14, 36);

    const rows = expenses.map(e => [
        e.id,
        e.name,
        e.category,
        e.date,
        "$" + e.amount,
        e.status
    ]);

    doc.autoTable({
        head: [[
            "ID",
            "Name",
            "Category",
            "Date",
            "Amount",
            "Status"
        ]],
        body: rows,
        startY: 45
    });

    doc.save("Synvora-Expense-Report.pdf");

};


    closeExpense.onclick = () => {

        expenseModal.style.display = "none";

    };

  exportExpense.onclick = () => {

    let csv = "ID,Name,Category,Date,Amount,Status\n";

    expenses.forEach(expense => {

        csv += `${expense.id},${expense.name},${expense.category},${expense.date},${expense.amount},${expense.status}\n`;

    });

    let blob = new Blob([csv], { type: "text/csv" });

    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "expenses.csv";

    link.click();

};

  displayExpenses();

searchExpense.addEventListener("input", displayExpenses);

categoryFilter.addEventListener("change", displayExpenses);

statusFilter.addEventListener("change", displayExpenses);

}




// DISPLAY EXPENSES


function displayExpenses(){


    expenseTable.innerHTML="";



    let filteredExpenses = expenses.filter((expense)=>{


    let search = searchExpense.value.toLowerCase();

    let category = categoryFilter.value;

    let status = statusFilter.value;


    return (

        expense.name.toLowerCase().includes(search)

        &&

        (category === "all" || expense.category === category)

        &&

        (status === "all" || expense.status === status)

    );


});



filteredExpenses.forEach((expense)=>{


        let row = document.createElement("tr");



        row.innerHTML = `


        <td>#00${expense.id}</td>


        <td>
            ${expense.name}
        </td>


        <td>
            ${expense.category}
        </td>


        <td>
            ${expense.date}
        </td>


        <td>
            $${expense.amount}
        </td>



        <td>

            <span class="${expense.status.toLowerCase()}">

                ${expense.status}

            </span>

        </td>




        <td>

    <button
    class="edit-btn"
    onclick="editExpense(${expense.id})">
        Edit
    </button>

    <button
    class="delete-btn"
    onclick="deleteExpense(${expense.id})">
        Delete
    </button>

</td>



        `;



        expenseTable.appendChild(row);



    });



    // UPDATE CARDS

    updateSummary();

  updateCharts();

}


function editExpense(id){

    let expense = expenses.find(e => e.id === id);

    editExpenseId = id;

    document.getElementById("expenseName").value = expense.name;
    document.getElementById("expenseCategory").value = expense.category;
    document.getElementById("expenseDate").value = expense.date;
    document.getElementById("expenseAmount").value = expense.amount;
    document.getElementById("expenseStatus").value = expense.status;

    expenseModal.style.display = "flex";

}



// DELETE EXPENSE


function deleteExpense(id){

    if(!window.confirm("Are you sure you want to delete this expense?")){
        return;
    }

    expenses = expenses.filter(expense => expense.id !== id);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    displayExpenses();

}






// ==========================
// UPDATE EXPENSE SUMMARY
// ==========================


function updateSummary(){



    let total = 0;

    let paid = 0;

    let pending = 0;




    expenses.forEach((expense)=>{


        let amount = Number(expense.amount);



        total += amount;



        if(expense.status === "Paid"){


            paid += amount;


        }



        if(expense.status === "Pending"){


            pending += amount;


        }



    });





    document.getElementById("totalExpense").innerHTML =

    "$" + total;




    document.getElementById("paidExpense").innerHTML =

    "$" + paid;




    document.getElementById("pendingExpense").innerHTML =

    "$" + pending;




    document.getElementById("monthlyExpense").innerHTML =

    "$" + total;




}



// ==========================
// EXPENSE CHARTS
// ==========================


let expenseChart;
let categoryChart;



function updateCharts(){


    let categories = {};

    let amounts = {};



    expenses.forEach((expense)=>{


        let amount = Number(expense.amount);



        // Category Wise

        if(categories[expense.category]){

            categories[expense.category] += amount;

        }
        else{

            categories[expense.category] = amount;

        }


    });



    let categoryNames = Object.keys(categories);

    let categoryAmounts = Object.values(categories);



    // Monthly Chart Data

    let months = [];

    let monthlyAmounts = [];



    expenses.forEach((expense)=>{


        let month = expense.date.substring(0,7);



        if(!months.includes(month)){

            months.push(month);

            monthlyAmounts.push(Number(expense.amount));

        }
        else{

            let index = months.indexOf(month);

            monthlyAmounts[index] += Number(expense.amount);

        }


    });





    // Monthly Expense Chart


    const ctx1 = document
.getElementById("expenseChart");

if(ctx1){

    if(expenseChart){
        expenseChart.destroy();
    }

    expenseChart = new Chart(ctx1,{


        type:"line",


        data:{


            labels:months,


            datasets:[{

                label:"Expense",

                data:monthlyAmounts,

                borderWidth:2

            }]


        }


    });







    // Category Chart


    const ctx2 = document
    .getElementById("categoryChart");



    if(categoryChart){

        categoryChart.destroy();

    }



    categoryChart = new Chart(ctx2,{


        type:"doughnut",


        data:{


            labels:categoryNames,


            datasets:[{

                data:categoryAmounts,

                borderWidth:1

            }]


        }


    });

}