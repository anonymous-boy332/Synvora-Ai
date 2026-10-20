/* ==================================
   BUSINESS OS - INVOICE MANAGEMENT JS
================================== */


let invoices = JSON.parse(
    localStorage.getItem("invoices")
) || [];

let editInvoiceId = null;


// ==========================
// INIT INVOICE SYSTEM
// ==========================

function initInvoice(){


    const addBtn = document.querySelector(".add-invoice-btn");

    const modal = document.getElementById("invoiceModal");

    const closeBtn = document.getElementById("closeInvoice");

    const saveBtn = document.getElementById("saveInvoice");


    if(addBtn){

        addBtn.onclick = ()=>{

            modal.style.display="flex";

        };

    }



    if(closeBtn){

        closeBtn.onclick = ()=>{

            modal.style.display="none";

        };

    }



    if(saveBtn){


        saveBtn.onclick = ()=>{


            let customer =
            document.getElementById("invoiceCustomer").value;


            let amount =
            document.getElementById("invoiceAmount").value;


            let date =
            document.getElementById("invoiceDate").value;


            let status =
            document.getElementById("invoiceStatus").value;



            if(customer==="" || amount===""){

                alert("Please fill required fields");

                return;

            }



            if(editInvoiceId !== null){


                let invoice =
                invoices.find(
                    item=>item.id===editInvoiceId
                );


                invoice.customer = customer;

                invoice.amount = amount;

                invoice.date = date;

                invoice.status = status;


                editInvoiceId=null;


            }

            else{


                invoices.push({

                    id:Date.now(),

                    customer:customer,

                    amount:Number(amount),

                    date:date,

                    status:status

                });


            }



            saveInvoices();

            displayInvoices();

            updateInvoiceSummary();


            modal.style.display="none";


        };


    }



}



// ==========================
// SAVE INVOICE
// ==========================


function saveInvoices(){


    localStorage.setItem(
        "invoices",
        JSON.stringify(invoices)
    );


}



// ==========================
// DISPLAY INVOICE
// ==========================


function displayInvoices(){


    let table =
    document.querySelector(
        ".invoice-table tbody"
    );


    if(!table) return;


    table.innerHTML="";



    invoices.forEach(invoice=>{


        table.innerHTML += `

        <tr>

        <td>
        #INV-${invoice.id}
        </td>


        <td>
        ${invoice.customer}
        </td>


        <td>
        $${invoice.amount}
        </td>


        <td>
        ${invoice.date}
        </td>


        <td>

        <span class="${invoice.status.toLowerCase()}">

        ${invoice.status}

        </span>

        </td>


        <td>

        <button
        class="edit-btn"
        onclick="editInvoice(${invoice.id})">

        Edit

        </button>


        <button
        class="delete-btn"
        onclick="deleteInvoice(${invoice.id})">

        Delete

        </button>


        </td>


        </tr>

        `;


    });


}



// ==========================
// EDIT INVOICE
// ==========================


function editInvoice(id){


    let invoice =
    invoices.find(
        item=>item.id===id
    );


    if(!invoice) return;


    editInvoiceId=id;


    document.getElementById("invoiceCustomer").value =
    invoice.customer;


    document.getElementById("invoiceAmount").value =
    invoice.amount;


    document.getElementById("invoiceDate").value =
    invoice.date;


    document.getElementById("invoiceStatus").value =
    invoice.status;



    document.getElementById("invoiceModal").style.display="flex";


}



// ==========================
// DELETE INVOICE
// ==========================


function deleteInvoice(id){


    invoices =
    invoices.filter(
        item=>item.id!==id
    );


    saveInvoices();

    displayInvoices();

    updateInvoiceSummary();


}



// ==========================
// SUMMARY
// ==========================


function updateInvoiceSummary(){


    let total=0;

    let paid=0;

    let pending=0;



    invoices.forEach(invoice=>{


        total += Number(invoice.amount);



        if(invoice.status==="Paid"){

            paid += Number(invoice.amount);

        }


        if(invoice.status==="Pending"){

            pending += Number(invoice.amount);

        }


    });



    let totalBox =
    document.getElementById("totalInvoice");


    let paidBox =
    document.getElementById("paidInvoice");


    let pendingBox =
    document.getElementById("pendingInvoice");



    if(totalBox)
    totalBox.innerHTML="$"+total;


    if(paidBox)
    paidBox.innerHTML="$"+paid;


    if(pendingBox)
    pendingBox.innerHTML="$"+pending;


}



// ==========================
// START
// ==========================


window.addEventListener(
"DOMContentLoaded",
()=>{


    initInvoice();

    displayInvoices();

    updateInvoiceSummary();


});