/* ==========================================
   SYNVORA AI - COMPANY MANAGEMENT
========================================== */

console.log("Company Management JS Loaded");


/* ==========================================
   COMPANY STORAGE
========================================== */

let companies =
    JSON.parse(localStorage.getItem("synvoraCompanies")) || [];

let editingCompanyId = null;


/* ==========================================
   SAVE STORAGE
========================================== */

function saveCompanyStorage(){

    localStorage.setItem(
        "synvoraCompanies",
        JSON.stringify(companies)
    );

}


/* ==========================================
   OPEN COMPANY MODAL
========================================== */

function openCompanyModal(){

    editingCompanyId = null;

    const modal =
        document.getElementById("companyModal");

    if(!modal) return;


    document.getElementById("companyModalTitle").textContent =
        "➕ Create Company";


    clearCompanyForm();


    modal.classList.add("active");

}


/* ==========================================
   CLOSE COMPANY MODAL
========================================== */

function closeCompanyModal(){

    const modal =
        document.getElementById("companyModal");

    if(!modal) return;

    modal.classList.remove("active");

    editingCompanyId = null;

}


/* ==========================================
   CLEAR FORM
========================================== */

function clearCompanyForm(){

    const fields = [

        "companyName",
        "companyType",
        "companyOwner",
        "companyEmail",
        "companyPhone",
        "companyCountry",
        "companyCurrency",
        "companyStatus",
        "companyAddress",
        "companyDescription"

    ];


    fields.forEach(id => {

        const element =
            document.getElementById(id);

        if(!element) return;


        element.value = "";

    });


    const currency =
        document.getElementById("companyCurrency");

    if(currency){

        currency.value = "USD";

    }


    const status =
        document.getElementById("companyStatus");

    if(status){

        status.value = "Active";

    }

}


/* ==========================================
   SAVE COMPANY
========================================== */

function saveCompany(){

    const name =
        document.getElementById("companyName").value.trim();

    const type =
        document.getElementById("companyType").value;

    const owner =
        document.getElementById("companyOwner").value.trim();

    const email =
        document.getElementById("companyEmail").value.trim();

    const phone =
        document.getElementById("companyPhone").value.trim();

    const country =
        document.getElementById("companyCountry").value.trim();

    const currency =
        document.getElementById("companyCurrency").value;

    const status =
        document.getElementById("companyStatus").value;

    const address =
        document.getElementById("companyAddress").value.trim();

    const description =
        document.getElementById("companyDescription").value.trim();


    /* VALIDATION */

    if(!name){

        alert("Please enter company name.");

        return;

    }


    if(!type){

        alert("Please select company type.");

        return;

    }


    if(!owner){

        alert("Please enter company owner.");

        return;

    }


    /* EDIT */

    if(editingCompanyId){

        const company =
            companies.find(
                item => item.id === editingCompanyId
            );


        if(company){

            company.name = name;
            company.type = type;
            company.owner = owner;
            company.email = email;
            company.phone = phone;
            company.country = country;
            company.currency = currency;
            company.status = status;
            company.address = address;
            company.description = description;

        }

    }

    /* CREATE */

    else{

        const newCompany = {

            id:
                Date.now().toString(),

            name,

            type,

            owner,

            email,

            phone,

            country,

            currency,

            status,

            address,

            description,

            employees: 0,

            revenue: 0,

            createdAt:
                new Date().toISOString()

        };


        companies.push(newCompany);

    }


    saveCompanyStorage();

    loadCompanies();

    closeCompanyModal();

}


/* ==========================================
   LOAD COMPANIES
========================================== */

function loadCompanies(){

    const list =
        document.getElementById("companyList");

    if(!list) return;


    const search =
        document
            .getElementById("companySearch")
            ?.value
            .toLowerCase()
            .trim() || "";


    const statusFilter =
        document
            .getElementById("companyStatusFilter")
            ?.value || "all";


    let filteredCompanies =
        companies.filter(company => {


            const matchesSearch =
                company.name
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                statusFilter === "all" ||
                company.status === statusFilter;


            return matchesSearch && matchesStatus;

        });


    list.innerHTML = "";


    if(filteredCompanies.length === 0){

        list.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="text-align:center; padding:35px;">

                    🏢 No companies found

                </td>

            </tr>

        `;

        updateCompanyStats();

        return;

    }


    filteredCompanies.forEach(company => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <strong>
                    ${escapeCompanyHTML(company.name)}
                </strong>

            </td>


            <td>
                ${escapeCompanyHTML(company.type)}
            </td>


            <td>
                ${escapeCompanyHTML(company.owner)}
            </td>


            <td>
                ${company.employees || 0}
            </td>


            <td>
                ${formatCompanyCurrency(
                    company.revenue || 0,
                    company.currency || "USD"
                )}
            </td>


            <td>

                <span
                    class="company-status ${
                        company.status === "Active"
                            ? "active"
                            : "inactive"
                    }">

                    ${
                        company.status === "Active"
                            ? "🟢 Active"
                            : "🔴 Inactive"
                    }

                </span>

            </td>


            <td>

    <button
        class="company-action-btn workspace-btn"
        onclick="openCompanyWorkspace('${company.id}')"
        title="Open Workspace">

        🏢

    </button>


    <button
        class="company-select-btn ${
            localStorage.getItem("synvoraActiveCompany") &&
            JSON.parse(localStorage.getItem("synvoraActiveCompany")).id === company.id
                ? "selected"
                : ""
        }"
        onclick="selectCompanyWorkspace('${company.id}')"
        title="Select Company">

        ${
            localStorage.getItem("synvoraActiveCompany") &&
            JSON.parse(localStorage.getItem("synvoraActiveCompany")).id === company.id
                ? "✓ Selected"
                : "Select"
        }

    </button>


    <button
        class="company-action-btn"
        onclick="viewCompany('${company.id}')"
        title="View Company">

        👁

    </button>


    <button
        class="company-action-btn"
        onclick="editCompany('${company.id}')"
        title="Edit Company">

        ✏️

    </button>


    <button
        class="company-action-btn delete"
        onclick="deleteCompany('${company.id}')"
        title="Delete Company">

        🗑

    </button>

</td>

        `;


        list.appendChild(row);

    });


    updateCompanyStats();

}


/* ==========================================
   EDIT COMPANY
========================================== */

function editCompany(id){

    const company =
        companies.find(
            item => item.id === id
        );

    if(!company) return;


    editingCompanyId = id;


    const title =
        document.getElementById("companyModalTitle");

    if(title){

        title.textContent =
            "✏️ Edit Company";

    }


    document.getElementById("companyName").value =
        company.name || "";

    document.getElementById("companyType").value =
        company.type || "";

    document.getElementById("companyOwner").value =
        company.owner || "";

    document.getElementById("companyEmail").value =
        company.email || "";

    document.getElementById("companyPhone").value =
        company.phone || "";

    document.getElementById("companyCountry").value =
        company.country || "";

    document.getElementById("companyCurrency").value =
        company.currency || "USD";

    document.getElementById("companyStatus").value =
        company.status || "Active";

    document.getElementById("companyAddress").value =
        company.address || "";

    document.getElementById("companyDescription").value =
        company.description || "";


    const modal =
        document.getElementById("companyModal");

    if(modal){

        modal.classList.add("active");

    }

}


/* ==========================================
   VIEW COMPANY MODAL
========================================== */

function viewCompany(id){

    const company =
        companies.find(
            item => item.id === id
        );

    if(!company) return;


    document.getElementById("viewCompanyName").textContent =
        "🏢 " + (company.name || "-");

    document.getElementById("viewCompanyType").textContent =
        company.type || "-";

    document.getElementById("viewCompanyOwner").textContent =
        company.owner || "-";

    document.getElementById("viewCompanyEmail").textContent =
        company.email || "-";

    document.getElementById("viewCompanyPhone").textContent =
        company.phone || "-";

    document.getElementById("viewCompanyCountry").textContent =
        company.country || "-";

    document.getElementById("viewCompanyCurrency").textContent =
        company.currency || "-";

    document.getElementById("viewCompanyEmployees").textContent =
        company.employees || 0;

    document.getElementById("viewCompanyRevenue").textContent =
        formatCompanyCurrency(
            company.revenue || 0,
            company.currency || "USD"
        );

    document.getElementById("viewCompanyStatus").textContent =
        company.status || "-";

    document.getElementById("viewCompanyAddress").textContent =
        company.address || "-";

    document.getElementById("viewCompanyDescription").textContent =
        company.description || "-";


    const modal =
        document.getElementById("companyViewModal");

    if(modal){

        modal.classList.add("active");

    }

}


/* ==========================================
   CLOSE COMPANY VIEW MODAL
========================================== */

function closeCompanyViewModal(){

    const modal =
        document.getElementById("companyViewModal");

    if(!modal) return;

    modal.classList.remove("active");

}


/* ==========================================
   DELETE COMPANY
========================================== */

function deleteCompany(id){

    const company =
        companies.find(
            item => item.id === id
        );


    if(!company) return;


    const confirmed =
        confirm(
            `Are you sure you want to delete "${company.name}"?`
        );


    if(!confirmed) return;


    companies =
        companies.filter(
            item => item.id !== id
        );


    saveCompanyStorage();

    loadCompanies();

}


/* ==========================================
   COMPANY STATS
========================================== */

function updateCompanyStats(){

    const total =
        companies.length;


    const active =
        companies.filter(
            company => company.status === "Active"
        ).length;


    const employees =
        companies.reduce(
            (total, company) =>
                total + Number(company.employees || 0),
            0
        );


    const revenue =
        companies.reduce(
            (total, company) =>
                total + Number(company.revenue || 0),
            0
        );


    const totalElement =
        document.getElementById("totalCompanies");

    const activeElement =
        document.getElementById("activeCompanies");

    const employeesElement =
        document.getElementById("companyEmployees");

    const revenueElement =
        document.getElementById("companyRevenue");


    if(totalElement){

        totalElement.textContent =
            total;

    }


    if(activeElement){

        activeElement.textContent =
            active;

    }


    if(employeesElement){

        employeesElement.textContent =
            employees;

    }


    if(revenueElement){

        revenueElement.textContent =
            formatCompanyCurrency(
                revenue,
                "USD"
            );

    }

}


/* ==========================================
   CURRENCY FORMAT
========================================== */

function formatCompanyCurrency(
    amount,
    currency = "USD"
){

    try{

        return new Intl.NumberFormat(
            "en-US",
            {
                style: "currency",
                currency: currency,
                maximumFractionDigits: 0
            }
        ).format(amount);

    }
    catch(error){

        return "$" + amount;

    }

}


/* ==========================================
   HTML SECURITY
========================================== */

function escapeCompanyHTML(value){

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ==========================================
   SEARCH + FILTER
========================================== */

document.addEventListener(
    "input",
    function(event){

        if(
            event.target.id ===
            "companySearch"
        ){

            loadCompanies();

        }

    }
);


document.addEventListener(
    "change",
    function(event){

        if(
            event.target.id ===
            "companyStatusFilter"
        ){

            loadCompanies();

        }

    }
);


/* ==========================================
   INITIAL LOAD
========================================== */

function initCompanyManagement(){

    loadCompanies();

    updateActiveCompanyWorkspace();

}


/* ==========================================
   ACTIVE COMPANY WORKSPACE
========================================== */

function openCompanyWorkspace(id){

    const company =
        companies.find(
            item => item.id === id
        );

    if(!company){

        alert("Company not found.");

        return;

    }


    /* SAVE ACTIVE COMPANY */

    localStorage.setItem(
        "synvoraActiveCompany",
        JSON.stringify(company)
    );


    /* UPDATE WORKSPACE UI */

    updateActiveCompanyWorkspace();


    /* SUCCESS */

    alert(
        "Active Workspace:\n\n" +
        company.name
    );


    console.log(
        "Active Company:",
        company
    );

}


/* ==========================================
   UPDATE ACTIVE WORKSPACE UI
========================================== */

function updateActiveCompanyWorkspace(){

    const savedCompany =
        localStorage.getItem(
            "synvoraActiveCompany"
        );


    const workspaceName =
        document.getElementById(
            "activeWorkspaceName"
        );


    const workspaceMeta =
        document.getElementById(
            "activeWorkspaceMeta"
        );


    const workspaceStatus =
        document.getElementById(
            "activeWorkspaceStatus"
        );


    /* ==============================
       UPDATE ACTIVE WORKSPACE
    ============================== */

    if(workspaceName){

        if(!savedCompany){

            workspaceName.textContent =
                "No Company Selected";

        }

        else{

            try{

                const company =
                    JSON.parse(savedCompany);


                workspaceName.textContent =
                    company.name ||
                    "Unnamed Company";


                if(workspaceMeta){

                    workspaceMeta.textContent =

                        (company.type || "Business") +
                        " • " +
                        (company.owner || "Owner") +
                        " • " +
                        (company.currency || "USD");

                }


                if(workspaceStatus){

                    workspaceStatus.textContent =
                        "🟢 Active";

                    workspaceStatus.classList.add(
                        "active"
                    );

                }

            }

            catch(error){

                console.error(
                    "Active Workspace Error:",
                    error
                );

                workspaceName.textContent =
                    "No Company Selected";

            }

        }

    }


    /* ==============================
       NO ACTIVE COMPANY
    ============================== */

    if(!savedCompany){

        if(workspaceMeta){

            workspaceMeta.textContent =
                "Select a company to activate its workspace";

        }


        if(workspaceStatus){

            workspaceStatus.textContent =
                "⚪ No Workspace";

            workspaceStatus.classList.remove(
                "active"
            );

        }

    }


    /* ==============================
       UPDATE HEADER WORKSPACE
    ============================== */

    const headerCompany =
        document.getElementById(
            "headerActiveCompanyName"
        );


    if(headerCompany){

        if(!savedCompany){

            headerCompany.textContent =
                "No Company Selected";

        }

        else{

            try{

                const company =
                    JSON.parse(savedCompany);


                headerCompany.textContent =
                    company.name ||
                    "Unnamed Company";

            }

            catch(error){

                headerCompany.textContent =
                    "No Company Selected";

            }

        }

    }

}



/* ==========================================
   LOAD ACTIVE WORKSPACE
========================================== */

function initActiveCompanyWorkspace(){

    updateActiveCompanyWorkspace();

}


setTimeout(
    initActiveCompanyWorkspace,
    300
);

/* ==========================================
   SELECT COMPANY WORKSPACE
========================================== */

function selectCompanyWorkspace(id){

    const companies =
        JSON.parse(
            localStorage.getItem("synvoraCompanies")
        ) || [];

    const company =
        companies.find(
            item => item.id === id
        );

    if(!company){

        alert("Company not found.");
        return;

    }


    /* ==========================================
       SAVE ACTIVE COMPANY
    ========================================== */

    localStorage.setItem(
        "synvoraActiveCompany",
        JSON.stringify(company)
    );


    /* ==========================================
       LOAD COMPANY-SPECIFIC DATA
    ========================================== */

    if(
        typeof loadCompanyData === "function"
    ){

        loadCompanyData(company.id);

    }


    /* ==========================================
       REFRESH COMPANY TABLE
    ========================================== */

    loadCompanies();


    /* ==========================================
       UPDATE ACTIVE COMPANY HEADER
    ========================================== */

    updateActiveCompanyWorkspace();


    /* ==========================================
       UPDATE COMPANY WORKSPACE
    ========================================== */

    if(
        typeof populateCompanyWorkspace === "function"
    ){

        populateCompanyWorkspace();

    }


    console.log(
        "Selected Company:",
        company.name,
        "ID:",
        company.id
    );

}