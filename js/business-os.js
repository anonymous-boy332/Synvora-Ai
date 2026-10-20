async function loadComponent(id, file){

    const container = document.getElementById(id);

    if(!container){

        console.error(
            "Container not found:",
            id
        );

        return false;

    }


    try{

        const response = await fetch(file);

        if(!response.ok){

            throw new Error(
                "File Not Found: " + file
            );

        }


        const html = await response.text();

        container.innerHTML = html;


        console.log(
            "Component Loaded:",
            file
        );


        return true;

    }
    catch(error){

        console.error(
            "Component Load Error:",
            error
        );


        container.innerHTML = `

            <div class="component-load-error">

                ❌ Unable to load component.

                <small>
                    ${file}
                </small>

            </div>

        `;


        return false;

    }

}

loadComponent(
    "business-stats-container",
    "components/business-os/business-stats.html"
);

loadComponent(
    "business-actions-container",
    "components/business-os/quick-business-actions.html"
);

loadComponent(
    "business-overview-container",
    "components/business-os/business-overview.html"
);

loadComponent(
    "business-activity-container",
    "components/business-os/recent-business-activity.html"
);

loadComponent(
    "revenue-analytics-container",
    "components/business-os/revenue-analytics.html"
);

loadComponent(
    "crm-dashboard-container",
    "components/business-os/crm-dashboard.html"
);

loadComponent(
    "inventory-dashboard-container",
    "components/business-os/inventory-dashboard.html"
);

loadComponent(
    "sales-dashboard-container",
    "components/business-os/sales-dashboard.html"
);

loadComponent(
    "finance-dashboard-container",
    "components/business-os/finance-dashboard.html"
);

loadComponent(
    "employee-dashboard-container",
    "components/business-os/employee-dashboard.html"
);

loadComponent(
    "employee-tasks-container",
    "components/business-os/employee-tasks.html"
);

loadComponent(
    "ai-advisor-dashboard-container",
    "components/business-os/ai-business-advisor.html"
);

loadComponent(
    "automation-dashboard-container",
    "components/business-os/automation-dashboard.html"
);

loadComponent(
    "reports-dashboard-container",
    "components/business-os/reports-dashboard.html"
);

loadComponent(
    "employee-table-container",
    "components/business-os/employee-table.html"
);

loadComponent(
    "inventory-table-container",
    "components/business-os/inventory-table.html"
);

loadComponent(
    "notification-center-container",
    "components/business-os/notification-center.html"
);

loadComponent(
    "calendar-dashboard-container",
    "components/business-os/calendar-dashboard.html"
);

loadComponent(
    "finance-toolbar-container",
    "components/business-os/finance-toolbar.html"
);

loadComponent(
    "income-management-container",
    "components/business-os/income.html"
);

loadComponent(
    "invoice-management-container",
    "components/business-os/invoice.html"
);

loadComponent(
"expense-management-container",
"components/business-os/expenses.html"
)
.then(()=>{

    console.log("Expense HTML Loaded");

    initExpense();
    displayExpenses();
  
});


function initRevenueChart(){

    const revenueCanvas = document.getElementById("revenueChart");

    if(!revenueCanvas) return;

    new Chart(revenueCanvas,{

        type:"line",

        data:{
            labels:["Jan","Feb","Mar","Apr","May","Jun"],

            datasets:[{

                label:"Revenue",

                data:[12000,18000,16000,24000,21000,25480],

                borderColor:"#00AEEF",

                backgroundColor:"rgba(0,174,239,.15)",

                fill:true,

                tension:.4,

                borderWidth:3

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false

        }

    });

}

setTimeout(() => {

    initRevenueChart();

},500);

// ================================
// ADDITIONAL BUSINESS OS MODULES
// ================================

loadComponent(
    "transactions-container",
    "components/transactions.html"
);

loadComponent(
    "company-management-container",
    "components/business-os/company-management.html"
)
.then(() => {

    console.log("Company Management HTML Loaded");

    if(typeof initCompanyManagement === "function"){

        initCompanyManagement();

    }

});

/* ==========================================
   🤝 CRM MANAGEMENT
========================================== */

loadComponent(
    "crm-management-container",
    "components/business-os/crm.html"
)
.then(() => {

    console.log("CRM HTML Loaded");

    if(typeof initCRM === "function") {

        initCRM();

    } else {

        console.error(
            "initCRM function not found."
        );

    }

});

loadComponent(
    "inventory-management-container",
    "components/business-os/inventory.html"
);

loadComponent(
    "employee-management-container",
    "components/business-os/employees.html"
);

loadComponent(
    "owner-dashboard-container",
    "components/business-os/owner-dashboard.html"
);

loadComponent(
    "active-workspace-container",
    "components/business-os/active-workspace.html"
);

loadComponent(
    "settings-container",
    "components/business-os/settings.html"
)
.then(() => {

    console.log("Company Settings HTML Loaded");

    if(typeof loadCompanySettings === "function"){

        loadCompanySettings();

    }

});

loadComponent(
    "team-permissions-container",
    "components/business-os/team-permissions.html"
);

// ==========================================
// OWNER DASHBOARD - QUICK ACTIONS
// ==========================================

function openBusinessDashboard(){

    const target = document.getElementById(
        "business-overview-container"
    );

    if(target){

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


function openFinanceDashboard(){

    const target = document.getElementById(
        "finance-dashboard-container"
    );

    if(target){

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


function openEmployeeManagement(){

    const target = document.getElementById(
        "employee-management-container"
    );

    if(target){

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


function openReportsDashboard(){

    const target = document.getElementById(
        "reports-dashboard-container"
    );

    if(target){

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


function openCompanyManagement(){

    const target = document.getElementById(
        "company-management-container"
    );

    if(target){

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


function openAIAdvisor(){

    const target = document.getElementById(
        "ai-advisor-dashboard-container"
    );

    if(target){

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}

/* ==========================================
   OPEN ACCOUNT SECURITY
========================================== */

async function openAccountSecurity(){

    const target =
        document.getElementById(
            "account-security-container"
        );

    if(!target){

        console.error(
            "Account Security container not found."
        );

        return;

    }


    /* CLEAR OLD CONTENT */

    target.innerHTML = "";


    try{

        const response =
            await fetch(
                "components/business-os/account-security.html"
            );


        if(!response.ok){

            throw new Error(
                "Account Security file not found."
            );

        }


        const html =
            await response.text();


        /* LOAD ONLY ONCE */

        target.innerHTML = html;


        /* SCROLL */

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });


        console.log(
            "Account Security Loaded Successfully"
        );

    }
    catch(error){

        console.error(
            "Account Security Error:",
            error
        );


        target.innerHTML = `

            <div class="workspace-load-error">

                ❌ Unable to load Account Security.

                <small>
                    ${error.message}
                </small>

            </div>

        `;

    }

}