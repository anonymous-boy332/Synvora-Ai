console.log("Income JS Loaded");


// ==========================
// INCOME MANAGEMENT
// ==========================


let addIncomeBtn;
let incomeModal;
let closeIncome;
let saveIncome;
let incomeTable;

let editIncomeId = null;


let incomes = JSON.parse(localStorage.getItem("incomes")) || [];



function initIncome(){


    addIncomeBtn = document.querySelector(".add-income-btn");

    incomeModal = document.getElementById("incomeModal");

    closeIncome = document.getElementById("closeIncome");

    saveIncome = document.getElementById("saveIncome");

  incomeTable = document.querySelector(".income-table tbody");


    addIncomeBtn.onclick = () => {

        incomeModal.style.display = "flex";

    };

    saveIncome.onclick = () => {



        let name = document.getElementById("incomeName").value;


        let category = document.getElementById("incomeSource").value;


        let date = document.getElementById("incomeDate").value;


        let amount = document.getElementById("incomeAmount").value;



        let status = document.getElementById("incomeStatus").value;



        if(name === "" || amount === ""){


            alert("Please fill income name and amount");

            return;

        }





        if(editIncomeId !== null){


            let income = incomes.find(
                e => e.id === editIncomeId
            );


            income.name = name;

            income.category = category;

            income.date = date;

            income.amount = amount;

            income.status = status;



            editIncomeId = null;



        }

        else{



            let income = {


                id: incomes.length + 1,


                name:name,


                category:category,


                date:date,


                amount:amount,


                status:status


            };



            incomes.push(income);



        }




        localStorage.setItem(
            "incomes",
            JSON.stringify(incomes)
        );



        displayIncome();



        incomeModal.style.display="none";




        document.getElementById("incomeName").value="";

        document.getElementById("incomeSource").value="";

        document.getElementById("incomeDate").value="";

        document.getElementById("incomeAmount").value="";

        document.getElementById("incomeStatus").value="Received";



    };





    closeIncome.onclick = () => {


        incomeModal.style.display="none";


    };


// ==========================
// DISPLAY INCOME
// ==========================


function displayIncome(){


    incomeTable.innerHTML = "";



    incomes.forEach((income)=>{



        let row = document.createElement("tr");



        row.innerHTML = `


        <td>#00${income.id}</td>



        <td>
            ${income.name}
        </td>



        <td>
            ${income.category}
        </td>



        <td>
            ${income.date}
        </td>



        <td>
            $${income.amount}
        </td>



        <td>

            <span class="${income.status.toLowerCase()}">

                ${income.status}

            </span>

        </td>




        <td>


            <button
            class="edit-btn"
            onclick="editIncome(${income.id})">

            Edit

            </button>




            <button
            class="delete-btn"
            onclick="deleteIncome(${income.id})">

            Delete

            </button>



        </td>



        `;



        incomeTable.appendChild(row);



    });



    updateIncomeSummary();


    updateIncomeCharts();


}





// ==========================
// EDIT INCOME
// ==========================


function editIncome(id){


    let income = incomes.find(
        e => e.id === id
    );



    editIncomeId = id;



    document.getElementById("incomeName").value =
    income.name;



    document.getElementById("incomeSource").value =
income.category;



    document.getElementById("incomeDate").value =
    income.date;



    document.getElementById("incomeAmount").value =
    income.amount;



    document.getElementById("incomeStatus").value =
    income.status;



    incomeModal.style.display="flex";

}





// ==========================
// DELETE INCOME
// ==========================


function deleteIncome(id){



    if(!confirm("Are you sure you want to delete this income?")){


        return;


    }





    incomes = incomes.filter(
        income => income.id !== id
    );





    localStorage.setItem(

        "incomes",

        JSON.stringify(incomes)

    );





    displayIncome();



}

// ==========================
// UPDATE INCOME SUMMARY
// ==========================


function updateIncomeSummary(){


    let total = 0;

    let received = 0;

    let pending = 0;



    incomes.forEach((income)=>{


        let amount = Number(income.amount);



        total += amount;



        if(income.status === "Received"){


            received += amount;


        }



        if(income.status === "Pending"){


            pending += amount;


        }



    });




    document.getElementById("totalIncome").innerHTML =

    "$" + total;



    document.getElementById("receivedIncome").innerHTML =

    "$" + received;



    document.getElementById("pendingIncome").innerHTML =

    "$" + pending;



    document.getElementById("monthlyIncome").innerHTML =

    "$" + total;



}







// ==========================
// INCOME CHARTS
// ==========================


let incomeChart;

let incomeCategoryChart;





function updateIncomeCharts(){



    let categories = {};



    incomes.forEach((income)=>{


        let amount = Number(income.amount);



        if(categories[income.category]){


            categories[income.category] += amount;


        }

        else{


            categories[income.category] = amount;


        }



    });





    let categoryNames = Object.keys(categories);


    let categoryAmounts = Object.values(categories);






    let months = [];


    let monthlyAmounts = [];





    incomes.forEach((income)=>{



        let month = income.date.substring(0,7);



        if(!months.includes(month)){



            months.push(month);



            monthlyAmounts.push(
                Number(income.amount)
            );


        }

        else{


            let index = months.indexOf(month);


            monthlyAmounts[index] +=
            Number(income.amount);



        }



    });






    // MONTHLY INCOME CHART


    const ctx1 = document.getElementById(
        "incomeChart"
    );



    if(ctx1){



        if(incomeChart){

            incomeChart.destroy();

        }





        incomeChart = new Chart(ctx1,{



            type:"line",



            data:{


                labels:months,


                datasets:[{


                    label:"Income",


                    data:monthlyAmounts,


                    borderWidth:2


                }]



            }



        });



    }







    // CATEGORY CHART


    const ctx2 = document.getElementById(
        "incomeSourceChart"
    );




    if(ctx2){



        if(incomeCategoryChart){


            incomeCategoryChart.destroy();


        }




        incomeCategoryChart = new Chart(ctx2,{



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



}

// ==========================
// INCOME EXPORT CSV
// ==========================


let exportIncome;

let exportIncomePdf;



function initIncomeExport(){


    exportIncome = document.getElementById(
        "exportIncome"
    );


    exportIncomePdf = document.getElementById(
        "exportIncomePdf"
    );




    if(exportIncome){



        exportIncome.onclick = () => {



            let csv = 
            "ID,Name,Category,Date,Amount,Status\n";



            incomes.forEach((income)=>{



                csv += `${income.id},${income.name},${income.category},${income.date},${income.amount},${income.status}\n`;



            });




            let blob = new Blob(
                [csv],
                {
                    type:"text/csv"
                }
            );



            let link = document.createElement("a");



            link.href = URL.createObjectURL(blob);



            link.download = "income.csv";



            link.click();



        };



    }






    if(exportIncomePdf){



        exportIncomePdf.onclick = () => {



            const {jsPDF} = window.jspdf;



            let doc = new jsPDF();



            doc.text(
                "Synvora AI Income Report",
                14,
                20
            );



            let rows = incomes.map(income=>[


                income.id,

                income.name,

                income.category,

                income.date,

                "$"+income.amount,

                income.status


            ]);





            doc.autoTable({



                head:[[
                    "ID",
                    "Name",
                    "Category",
                    "Date",
                    "Amount",
                    "Status"
                ]],



                body:rows,

                startY:30



            });




            doc.save(
                "Synvora-Income-Report.pdf"
            );



        };



    }



}









// ==========================
// SEARCH FILTER
// ==========================



function initIncomeFilters(){



    let searchIncome = document.getElementById(
        "searchIncome"
    );



    let categoryFilter = document.getElementById(
        "incomeCategoryFilter"
    );



    let statusFilter = document.getElementById(
        "incomeStatusFilter"
    );





    if(searchIncome){


        searchIncome.addEventListener(
            "input",
            filterIncome
        );


    }






    if(categoryFilter){


        categoryFilter.addEventListener(
            "change",
            filterIncome
        );


    }






    if(statusFilter){


        statusFilter.addEventListener(
            "change",
            filterIncome
        );


    }





}








function filterIncome(){



    let search = 
    document.getElementById(
        "searchIncome"
    ).value.toLowerCase();




    let category =
document.getElementById(
"incomeSourceFilter"
).value;





    let status =
    document.getElementById(
        "incomeStatusFilter"
    ).value;





    incomeTable.innerHTML="";






    incomes.filter((income)=>{



        return (


            income.name
            .toLowerCase()
            .includes(search)



            &&


            (
                category==="all" ||
                income.category===category
            )



            &&


            (
                status==="all" ||
                income.status===status
            )



        );




    }).forEach((income)=>{



        let row = document.createElement("tr");



        row.innerHTML = `

        <td>#00${income.id}</td>

        <td>${income.name}</td>

        <td>${income.category}</td>

        <td>${income.date}</td>

        <td>$${income.amount}</td>

        <td>
        <span class="${income.status.toLowerCase()}">
        ${income.status}
        </span>
        </td>


        <td>

        <button class="edit-btn"
        onclick="editIncome(${income.id})">
        Edit
        </button>


        <button class="delete-btn"
        onclick="deleteIncome(${income.id})">
        Delete
        </button>


        </td>

        `;



        incomeTable.appendChild(row);



    });



}







// ==========================
// LOAD INCOME SYSTEM
// ==========================


function startIncomeSystem(){

    initIncome();

    displayIncome();

    initIncomeExport();

    initIncomeFilters();

}


// START SYSTEM

window.addEventListener(
    "DOMContentLoaded",
    startIncomeSystem
);