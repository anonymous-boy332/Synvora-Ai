/* ==========================================
   SYNVORA AI - TEAM PERMISSIONS
========================================== */

console.log("Team Permissions JS Loaded");


/* ==========================================
   AVAILABLE ROLES
========================================== */

const teamPermissionRoles = [

    "Owner",
    "Manager",
    "Supervisor",
    "HR",
    "Accountant",
    "Sales",
    "Employee"

];


/* ==========================================
   AVAILABLE PERMISSIONS
========================================== */

const teamPermissions = [

    "Finance",
    "CRM",
    "Inventory",
    "Employees",
    "Invoices",
    "Transactions",
    "Reports",
    "Company Settings"

];


/* ==========================================
   LOAD TEAM MEMBERS
========================================== */

function loadTeamPermissions(){

    const container =
        document.getElementById(
            "teamPermissionsList"
        );


    if(!container){

        return;

    }


    const employees =
        JSON.parse(
            localStorage.getItem(
                "employees"
            )
        ) || [];


    if(employees.length === 0){

        container.innerHTML = `

            <div class="permissions-empty">

                <span>
                    👥
                </span>

                <h3>
                    No Team Members Found
                </h3>

                <p>
                    Add employees from Employee Management
                    to manage their permissions here.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    employees.forEach(employee => {

        const savedPermissions =
            employee.permissions || [];


        const role =
            employee.role || "Employee";


        const permissionHTML =
            teamPermissions.map(permission => {

                const checked =
                    savedPermissions.includes(
                        permission
                    )
                        ? "checked"
                        : "";


                return `

                    <label class="permission-checkbox">

                        <input
                            type="checkbox"
                            value="${permission}"
                            data-employee="${employee.id}"
                            ${checked}>

                        <span>
                            ${permission}
                        </span>

                    </label>

                `;

            }).join("");


        const roleOptions =
            teamPermissionRoles.map(item => {

                return `

                    <option
                        value="${item}"
                        ${item === role ? "selected" : ""}>

                        ${item}

                    </option>

                `;

            }).join("");


        container.innerHTML += `

            <div
                class="team-permission-card"
                data-employee-id="${employee.id}">

                <div class="team-member-info">

                    <div class="team-member-avatar">
                        👤
                    </div>

                    <div>

                        <strong>
                            ${employee.name || "Unnamed Employee"}
                        </strong>

                        <small>
                            ${employee.email || "No email available"}
                        </small>

                    </div>

                </div>


                <div class="team-member-role">

                    <label>
                        Role
                    </label>

                    <select
                        class="employee-role-select"
                        data-employee-id="${employee.id}">

                        ${roleOptions}

                    </select>

                </div>


                <div class="team-member-permissions">

                    <label>
                        Permissions
                    </label>

                    <div class="permissions-grid">

                        ${permissionHTML}

                    </div>

                </div>


                <div class="team-member-actions">

                    <button
                        type="button"
                        class="primary-btn"
                        onclick="saveEmployeePermissions('${employee.id}')">

                        💾 Save Permissions

                    </button>

                </div>

            </div>

        `;

    });

}


/* ==========================================
   SAVE EMPLOYEE PERMISSIONS
========================================== */

function saveEmployeePermissions(employeeId){

    const employees =
        JSON.parse(
            localStorage.getItem(
                "employees"
            )
        ) || [];


    const employeeIndex =
        employees.findIndex(
            item =>
                String(item.id) ===
                String(employeeId)
        );


    if(employeeIndex === -1){

        alert(
            "Employee not found."
        );

        return;

    }


    const roleSelect =
        document.querySelector(
            `.employee-role-select[data-employee-id="${employeeId}"]`
        );


    const permissionInputs =
        document.querySelectorAll(
            `.permission-checkbox input[data-employee="${employeeId}"]`
        );


    const permissions = [];


    permissionInputs.forEach(input => {

        if(input.checked){

            permissions.push(
                input.value
            );

        }

    });


    employees[employeeIndex].role =
        roleSelect
            ? roleSelect.value
            : "Employee";


    employees[employeeIndex].permissions =
        permissions;


    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );


    alert(
        "Employee permissions saved successfully."
    );


    console.log(
        "Permissions Updated:",
        employees[employeeIndex]
    );

}


/* ==========================================
   CLOSE TEAM PERMISSIONS
========================================== */

function closeTeamPermissions(){

    const container =
        document.getElementById(
            "team-permissions-container"
        );


    const settings =
        document.getElementById(
            "settings-container"
        );


    if(container){

        container.style.display =
            "none";

    }


    if(settings){

        settings.style.display =
            "block";


        settings.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }

}


/* ==========================================
   OPEN TEAM PERMISSIONS
========================================== */

function openTeamPermissions(){

    const settings =
        document.getElementById(
            "settings-container"
        );


    const container =
        document.getElementById(
            "team-permissions-container"
        );


    if(!container){

        console.error(
            "Team Permissions container not found."
        );

        return;

    }


    if(settings){

        settings.style.display =
            "none";

    }


    container.style.display =
        "block";


    loadTeamPermissions();


    container.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}