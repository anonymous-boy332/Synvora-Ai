/* ==========================================
   SYNVORA AI - OWNER DASHBOARD BUTTONS
   ========================================== */

console.log("Owner Dashboard Buttons Loaded");


/* ==========================================
   HELPER
   ========================================== */

function ownerShowSection(containerId){

    const container =
        document.getElementById(containerId);

    if(!container){

        console.warn(
            "Owner Dashboard target not found:",
            containerId
        );

        return false;
    }

    container.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    return true;
}


/* ==========================================
   BUSINESS DASHBOARD
   ========================================== */

function openBusinessDashboard(){

    console.log(
        "Owner Dashboard → Business Dashboard"
    );

    ownerShowSection(
        "business-overview-container"
    );
}


/* ==========================================
   FINANCE
   ========================================== */

function openFinanceDashboard(){

    console.log(
        "Owner Dashboard → Finance"
    );

    ownerShowSection(
        "finance-dashboard-container"
    );
}


/* ==========================================
   EMPLOYEE MANAGEMENT
   ========================================== */

function openEmployeeManagement(){

    console.log(
        "Owner Dashboard → Employee Management"
    );

    ownerShowSection(
        "employee-dashboard-container"
    );
}


/* ==========================================
   REPORTS
   ========================================== */

function openReportsDashboard(){

    console.log(
        "Owner Dashboard → Reports"
    );

    ownerShowSection(
        "reports-dashboard-container"
    );
}


/* ==========================================
   COMPANY MANAGEMENT
   ========================================== */

function openCompanyManagement(){

    console.log(
        "Owner Dashboard → Company Management"
    );

    ownerShowSection(
        "company-management-container"
    );
}


/* ==========================================
   AI ADVISOR
   ========================================== */

function openAIAdvisor(){

    console.log(
        "Owner Dashboard → AI Advisor"
    );

    ownerShowSection(
        "ai-advisor-dashboard-container"
    );
}