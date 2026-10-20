// ==========================================
// SYNVORA AI — CRM MODULE
// ==========================================

let crmCustomers =
    JSON.parse(
        localStorage.getItem("synvoraCRMCustomers")
    ) || [];

let crmSelectedCustomerId = null;


// ==========================================
// INITIALIZE CRM
// ==========================================

async function initCRM() {

    console.log("CRM Initializing...");

    await loadCRMComponents();

    setupCRM();

    console.log("CRM Initialized Successfully");

}


// ==========================================
// LOAD CRM COMPONENTS
// ==========================================

async function loadCRMComponents() {

    const components = [

        [
            "crm-toolbar.html",
            "crm-toolbar-container"
        ],

        [
            "crm-stats.html",
            "crm-stats-container"
        ],

        [
            "customer-table.html",
            "customer-table-container"
        ],

        [
            "customer-profile.html",
            "customer-profile-container"
        ],

        [
            "customer-notes.html",
            "customer-notes-container"
        ],

        [
            "customer-activity.html",
            "customer-activity-container"
        ]

    ];


    for (const [file, containerId] of components) {

        const container =
            document.getElementById(containerId);

        if (!container) {

            console.error(
                "CRM container not found:",
                containerId
            );

            continue;

        }


        try {

            const response =
                await fetch(
                    `components/${file}`
                );

            if (!response.ok) {

                throw new Error(
                    `File not found: ${file}`
                );

            }


            const html =
                await response.text();


            container.innerHTML =
                html;


            console.log(
                "CRM Component Loaded:",
                file
            );

        }
        catch (error) {

            console.error(
                "CRM Component Error:",
                file,
                error
            );

        }

    }

}


// ==========================================
// SETUP CRM
// ==========================================

function setupCRM() {

    setupToolbar();

    setupTableAddButton();

    displayCustomers();

    updateCRMStats();

    renderSelectedCustomer();

}


// ==========================================
// TOOLBAR
// ==========================================

function setupToolbar() {

    const searchInput =
        document.getElementById(
            "crmSearchInput"
        );

    const searchButton =
        document.getElementById(
            "crmSearchBtn"
        );

    const addButton =
        document.getElementById(
            "addCustomerBtn"
        );

    const exportButton =
        document.getElementById(
            "exportCustomersBtn"
        );


    // SEARCH

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterCustomers
        );

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            filterCustomers
        );

    }


    // ADD CUSTOMER

    if (addButton) {

        addButton.addEventListener(
            "click",
            openCustomerForm
        );

    }


    // EXPORT

    if (exportButton) {

        exportButton.addEventListener(
            "click",
            exportCustomers
        );

    }

}


// ==========================================
// TABLE ADD BUTTON
// ==========================================

function setupTableAddButton() {

    const button =
        document.getElementById(
            "customerTableAddBtn"
        );


    if (button) {

        button.addEventListener(
            "click",
            openCustomerForm
        );

    }

}


// ==========================================
// DISPLAY CUSTOMERS
// ==========================================

function displayCustomers(
    customerList = crmCustomers
) {

    const tableBody =
        document.getElementById(
            "customerTableBody"
        );


    if (!tableBody) {

        console.error(
            "Customer table body not found."
        );

        return;

    }


    tableBody.innerHTML = "";


    if (customerList.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    style="
                        text-align:center;
                        padding:30px;
                    "
                >

                    No customers found.

                </td>

            </tr>

        `;

        return;

    }


    customerList.forEach(
        customer => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${escapeCRMHTML(customer.name)}
                </td>

                <td>
                    ${escapeCRMHTML(
                        customer.company || "-"
                    )}
                </td>

                <td>
                    ${escapeCRMHTML(
                        customer.email || "-"
                    )}
                </td>

                <td>
                    ${escapeCRMHTML(
                        customer.phone || "-"
                    )}
                </td>

                <td>

                    <span
                        class="customer-status ${
                            customer.status || "active"
                        }"
                    >
                        ${
                            customer.status ||
                            "active"
                        }
                    </span>

                </td>

                <td>
                    ${customer.orders || 0}
                </td>

                <td>
                    ${customer.date || "-"}
                </td>

                <td>

                    <button
                        type="button"
                        class="crm-action-btn"
                        data-crm-view="${customer.id}"
                    >
                        View
                    </button>

                    <button
                        type="button"
                        class="crm-action-btn"
                        data-crm-delete="${customer.id}"
                    >
                        Delete
                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        }
    );


    setupCustomerRowActions();

}


// ==========================================
// CUSTOMER ROW ACTIONS
// ==========================================

function setupCustomerRowActions() {

    const viewButtons =
        document.querySelectorAll(
            "[data-crm-view]"
        );


    const deleteButtons =
        document.querySelectorAll(
            "[data-crm-delete]"
        );


    viewButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    selectCustomer(
                        button.dataset.crmView
                    );

                }
            );

        }
    );


    deleteButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    deleteCustomer(
                        button.dataset.crmDelete
                    );

                }
            );

        }
    );

}


// ==========================================
// SELECT CUSTOMER
// ==========================================

function selectCustomer(id) {

    const customer =
        crmCustomers.find(
            item => item.id === id
        );


    if (!customer) {
        return;
    }


    crmSelectedCustomerId =
        id;


    renderSelectedCustomer();

}


// ==========================================
// GET SELECTED CUSTOMER
// ==========================================

function getSelectedCustomer() {

    if (!crmSelectedCustomerId) {
        return null;
    }


    return crmCustomers.find(
        customer =>
            customer.id ===
            crmSelectedCustomerId
    ) || null;

}


// ==========================================
// CUSTOMER PROFILE
// ==========================================

function renderSelectedCustomer() {

    const container =
        document.getElementById(
            "customer-profile-container"
        );


    if (!container) {
        return;
    }


    const customer =
        getSelectedCustomer();


    if (!customer) {

        container.innerHTML = `

            <section class="customer-profile">

                <div class="section-header">

                    <h2>
                        👤 Customer Profile
                    </h2>

                </div>

                <div class="profile-card">

                    <div class="profile-avatar">
                        👤
                    </div>

                    <div class="profile-details">

                        <h3>
                            Select a Customer
                        </h3>

                        <p>
                            Select a customer from
                            the Customer Directory.
                        </p>

                    </div>

                </div>

            </section>

        `;

        return;

    }


    container.innerHTML = `

        <section class="customer-profile">

            <div class="section-header">

                <h2>
                    👤 Customer Profile
                </h2>

                <button
                    type="button"
                    class="primary-btn"
                    id="editCustomerProfileBtn"
                >
                    ✏ Edit Profile
                </button>

            </div>


            <div class="profile-card">

                <div class="profile-avatar">
                    👤
                </div>


                <div class="profile-details">

                    <h3>
                        ${escapeCRMHTML(
                            customer.name
                        )}
                    </h3>

                    <p>
                        <strong>Company:</strong>
                        ${escapeCRMHTML(
                            customer.company || "-"
                        )}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${escapeCRMHTML(
                            customer.email || "-"
                        )}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        ${escapeCRMHTML(
                            customer.phone || "-"
                        )}
                    </p>

                    <p>
                        <strong>Address:</strong>
                        ${escapeCRMHTML(
                            customer.address || "-"
                        )}
                    </p>

                    <p>
                        <strong>Customer Since:</strong>
                        ${customer.date || "-"}
                    </p>

                </div>


                <div class="profile-summary">

                    <div class="summary-box">

                        <h3>
                            ${customer.orders || 0}
                        </h3>

                        <p>
                            Total Orders
                        </p>

                    </div>


                    <div class="summary-box">

                        <h3>
                            $${Number(
                                customer.value || 0
                            ).toLocaleString()}
                        </h3>

                        <p>
                            Total Spending
                        </p>

                    </div>


                    <div class="summary-box">

                        <h3>
                            ${
                                customer.level ||
                                "Regular"
                            }
                        </h3>

                        <p>
                            Customer Level
                        </p>

                    </div>

                </div>

            </div>

        </section>

    `;


    document
        .getElementById(
            "editCustomerProfileBtn"
        )
        ?.addEventListener(
            "click",
            () => editCustomer(customer.id)
        );


    renderCustomerNotes();

    renderCustomerActivity();

}


// ==========================================
// ADD CUSTOMER FORM
// ==========================================

function openCustomerForm() {

    closeCustomerForm();


    const modal =
        document.createElement("div");


    modal.id =
        "crmCustomerModal";


    modal.className =
        "crm-customer-modal";


    modal.innerHTML = `

        <div class="crm-modal-overlay"></div>

        <div class="crm-modal">

            <div class="crm-modal-header">

                <h2>
                    ➕ Add Customer
                </h2>

                <button
                    type="button"
                    id="closeCRMModal"
                >
                    ✕
                </button>

            </div>


            <form id="crmCustomerForm">

                <div class="crm-form-group">

                    <label>
                        Customer Name *
                    </label>

                    <input
                        type="text"
                        id="crmCustomerName"
                        required
                    >

                </div>


                <div class="crm-form-group">

                    <label>
                        Company
                    </label>

                    <input
                        type="text"
                        id="crmCustomerCompany"
                    >

                </div>


                <div class="crm-form-group">

                    <label>
                        Email *
                    </label>

                    <input
                        type="email"
                        id="crmCustomerEmail"
                        required
                    >

                </div>


                <div class="crm-form-group">

                    <label>
                        Phone *
                    </label>

                    <input
                        type="text"
                        id="crmCustomerPhone"
                        required
                    >

                </div>


                <div class="crm-form-group">

                    <label>
                        Address
                    </label>

                    <input
                        type="text"
                        id="crmCustomerAddress"
                    >

                </div>


                <div class="crm-form-group">

                    <label>
                        Status
                    </label>

                    <select
                        id="crmCustomerStatus"
                    >

                        <option value="active">
                            Active
                        </option>

                        <option value="inactive">
                            Inactive
                        </option>

                    </select>

                </div>


                <div class="crm-modal-actions">

                    <button
                        type="button"
                        class="secondary-btn"
                        id="cancelCRMCustomer"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        class="primary-btn"
                    >
                        Save Customer
                    </button>

                </div>

            </form>

        </div>

    `;


    document.body.appendChild(modal);


    document
        .getElementById("closeCRMModal")
        ?.addEventListener(
            "click",
            closeCustomerForm
        );


    document
        .getElementById("cancelCRMCustomer")
        ?.addEventListener(
            "click",
            closeCustomerForm
        );


    document
        .querySelector(
            "#crmCustomerModal .crm-modal-overlay"
        )
        ?.addEventListener(
            "click",
            closeCustomerForm
        );


    document
        .getElementById("crmCustomerForm")
        ?.addEventListener(
            "submit",
            saveNewCustomer
        );

}


// ==========================================
// SAVE NEW CUSTOMER
// ==========================================

function saveNewCustomer(event) {

    event.preventDefault();


    const customer = {

        id:
            Date.now().toString(),

        name:
            document.getElementById(
                "crmCustomerName"
            ).value.trim(),

        company:
            document.getElementById(
                "crmCustomerCompany"
            ).value.trim(),

        email:
            document.getElementById(
                "crmCustomerEmail"
            ).value.trim(),

        phone:
            document.getElementById(
                "crmCustomerPhone"
            ).value.trim(),

        address:
            document.getElementById(
                "crmCustomerAddress"
            ).value.trim(),

        status:
            document.getElementById(
                "crmCustomerStatus"
            ).value,

        orders:
            0,

        value:
            0,

        level:
            "Regular",

        date:
            new Date()
                .toISOString()
                .split("T")[0],

        notes:
            [],

        activities:
            []

    };


    crmCustomers.push(
        customer
    );


    crmSelectedCustomerId =
        customer.id;


    saveCRMCustomers();

    closeCustomerForm();

    displayCustomers();

    updateCRMStats();

    renderSelectedCustomer();


    alert(
        "Customer added successfully."
    );

}


// ==========================================
// CLOSE FORM
// ==========================================

function closeCustomerForm() {

    const modal =
        document.getElementById(
            "crmCustomerModal"
        );


    if (modal) {
        modal.remove();
    }

}


// ==========================================
// EDIT CUSTOMER
// ==========================================

function editCustomer(id) {

    const customer =
        crmCustomers.find(
            item => item.id === id
        );


    if (!customer) {
        return;
    }


    openCustomerForm();


    setTimeout(() => {

        document.getElementById(
            "crmCustomerName"
        ).value =
            customer.name || "";


        document.getElementById(
            "crmCustomerCompany"
        ).value =
            customer.company || "";


        document.getElementById(
            "crmCustomerEmail"
        ).value =
            customer.email || "";


        document.getElementById(
            "crmCustomerPhone"
        ).value =
            customer.phone || "";


        document.getElementById(
            "crmCustomerAddress"
        ).value =
            customer.address || "";


        document.getElementById(
            "crmCustomerStatus"
        ).value =
            customer.status || "active";


        const form =
            document.getElementById(
                "crmCustomerForm"
            );


        form.onsubmit =
            function(event) {

                event.preventDefault();

                updateCustomer(id);

            };

    }, 50);

}


// ==========================================
// UPDATE CUSTOMER
// ==========================================

function updateCustomer(id) {

    const customer =
        crmCustomers.find(
            item => item.id === id
        );


    if (!customer) {
        return;
    }


    customer.name =
        document.getElementById(
            "crmCustomerName"
        ).value.trim();


    customer.company =
        document.getElementById(
            "crmCustomerCompany"
        ).value.trim();


    customer.email =
        document.getElementById(
            "crmCustomerEmail"
        ).value.trim();


    customer.phone =
        document.getElementById(
            "crmCustomerPhone"
        ).value.trim();


    customer.address =
        document.getElementById(
            "crmCustomerAddress"
        ).value.trim();


    customer.status =
        document.getElementById(
            "crmCustomerStatus"
        ).value;


    saveCRMCustomers();

    closeCustomerForm();

    displayCustomers();

    updateCRMStats();

    renderSelectedCustomer();

}


// ==========================================
// DELETE CUSTOMER
// ==========================================

function deleteCustomer(id) {

    const customer =
        crmCustomers.find(
            item => item.id === id
        );


    if (!customer) {
        return;
    }


    if (
        !confirm(
            `Delete customer "${customer.name}"?`
        )
    ) {

        return;

    }


    crmCustomers =
        crmCustomers.filter(
            item => item.id !== id
        );


    if (
        crmSelectedCustomerId === id
    ) {

        crmSelectedCustomerId =
            null;

    }


    saveCRMCustomers();

    displayCustomers();

    updateCRMStats();

    renderSelectedCustomer();

}


// ==========================================
// SEARCH
// ==========================================

function filterCustomers() {

    const input =
        document.getElementById(
            "crmSearchInput"
        );


    const search =
        input
            ?.value
            .toLowerCase()
            .trim() || "";


    const filtered =
        crmCustomers.filter(
            customer => {

                return (

                    (customer.name || "")
                        .toLowerCase()
                        .includes(search)

                    ||

                    (customer.company || "")
                        .toLowerCase()
                        .includes(search)

                    ||

                    (customer.email || "")
                        .toLowerCase()
                        .includes(search)

                    ||

                    (customer.phone || "")
                        .toLowerCase()
                        .includes(search)

                );

            }
        );


    displayCustomers(
        filtered
    );

}


// ==========================================
// CRM STATS
// ==========================================

function updateCRMStats() {

    const total =
        crmCustomers.length;


    const active =
        crmCustomers.filter(
            customer =>
                customer.status === "active"
        ).length;


    const now =
        new Date();


    const newCustomers =
        crmCustomers.filter(
            customer => {

                const date =
                    new Date(
                        customer.date
                    );


                return (

                    date.getMonth() ===
                    now.getMonth()

                    &&

                    date.getFullYear() ===
                    now.getFullYear()

                );

            }
        ).length;


    const activeRate =
        total > 0
            ? Math.round(
                (active / total) * 100
            )
            : 0;


    const customerValue =
        crmCustomers.reduce(
            (
                totalValue,
                customer
            ) => {

                return (
                    totalValue +
                    Number(
                        customer.value || 0
                    )
                );

            },
            0
        );


    updateCRMElement(
        "crmTotalCustomers",
        total
    );


    updateCRMElement(
        "crmActiveCustomers",
        active
    );


    updateCRMElement(
        "crmNewCustomers",
        newCustomers
    );


    updateCRMElement(
        "crmCustomerGrowth",
        `+${newCustomers} This Month`
    );


    updateCRMElement(
        "crmActiveRate",
        `${activeRate}% Active Rate`
    );


    updateCRMElement(
        "crmCustomerValue",
        `$${customerValue.toLocaleString()}`
    );

}


// ==========================================
// NOTES
// ==========================================

function renderCustomerNotes() {

    const container =
        document.getElementById(
            "customer-notes-container"
        );


    const customer =
        getSelectedCustomer();


    if (!container || !customer) {
        return;
    }


    const notes =
        customer.notes || [];


    container.innerHTML = `

        <section class="customer-notes">

            <div class="section-header">

                <h2>
                    📝 Customer Notes
                </h2>

                <button
                    type="button"
                    class="primary-btn"
                    id="addCustomerNoteBtn"
                >
                    ➕ Add Note
                </button>

            </div>


            <div class="notes-container">

                ${
                    notes.length === 0

                    ?

                    `
                    <div class="note-card">

                        <p>
                            No notes available.
                        </p>

                    </div>
                    `

                    :

                    notes.map(
                        note => `

                            <div class="note-card">

                                <h4>
                                    📝
                                    ${
                                        escapeCRMHTML(
                                            note.title ||
                                            "Customer Note"
                                        )
                                    }
                                </h4>

                                <p>
                                    ${
                                        escapeCRMHTML(
                                            note.text
                                        )
                                    }
                                </p>

                                <small>
                                    Added:
                                    ${note.date}
                                </small>

                            </div>

                        `
                    ).join("")

                }

            </div>

        </section>

    `;


    document
        .getElementById(
            "addCustomerNoteBtn"
        )
        ?.addEventListener(
            "click",
            addCustomerNote
        );

}


// ==========================================
// ADD NOTE
// ==========================================

function addCustomerNote() {

    const customer =
        getSelectedCustomer();


    if (!customer) {
        return;
    }


    const text =
        prompt(
            "Enter customer note:"
        );


    if (!text || !text.trim()) {
        return;
    }


    if (!customer.notes) {
        customer.notes = [];
    }


    customer.notes.unshift({

        id:
            Date.now().toString(),

        title:
            "Customer Note",

        text:
            text.trim(),

        date:
            new Date().toLocaleString()

    });


    saveCRMCustomers();

    renderCustomerNotes();

}


// ==========================================
// ACTIVITY
// ==========================================

function renderCustomerActivity() {

    const container =
        document.getElementById(
            "customer-activity-container"
        );


    const customer =
        getSelectedCustomer();


    if (!container || !customer) {
        return;
    }


    const activities =
        customer.activities || [];


    container.innerHTML = `

        <section class="customer-activity">

            <div class="section-header">

                <h2>
                    📜 Customer Activity Timeline
                </h2>

                <button
                    type="button"
                    class="primary-btn"
                    id="addCustomerActivityBtn"
                >
                    ➕ Add Activity
                </button>

            </div>


            <div class="timeline">

                ${
                    activities.length === 0

                    ?

                    `
                    <div class="timeline-item">

                        <div class="timeline-icon">
                            📌
                        </div>

                        <div class="timeline-content">

                            <h4>
                                Customer Added
                            </h4>

                            <p>
                                Customer profile
                                was created.
                            </p>

                            <small>
                                ${customer.date}
                            </small>

                        </div>

                    </div>
                    `

                    :

                    activities.map(
                        activity => `

                            <div class="timeline-item">

                                <div class="timeline-icon">
                                    ${
                                        activity.icon ||
                                        "📌"
                                    }
                                </div>

                                <div class="timeline-content">

                                    <h4>
                                        ${
                                            escapeCRMHTML(
                                                activity.title
                                            )
                                        }
                                    </h4>

                                    <p>
                                        ${
                                            escapeCRMHTML(
                                                activity.description
                                            )
                                        }
                                    </p>

                                    <small>
                                        ${activity.date}
                                    </small>

                                </div>

                            </div>

                        `
                    ).join("")

                }

            </div>

        </section>

    `;


    document
        .getElementById(
            "addCustomerActivityBtn"
        )
        ?.addEventListener(
            "click",
            addCustomerActivity
        );

}


// ==========================================
// ADD ACTIVITY
// ==========================================

function addCustomerActivity() {

    const customer =
        getSelectedCustomer();


    if (!customer) {
        return;
    }


    const title =
        prompt(
            "Activity title:"
        );


    if (!title || !title.trim()) {
        return;
    }


    const description =
        prompt(
            "Activity description:"
        );


    if (
        !description ||
        !description.trim()
    ) {

        return;

    }


    if (!customer.activities) {

        customer.activities = [];

    }


    customer.activities.unshift({

        id:
            Date.now().toString(),

        icon:
            "📌",

        title:
            title.trim(),

        description:
            description.trim(),

        date:
            new Date().toLocaleString()

    });


    saveCRMCustomers();

    renderCustomerActivity();

}


// ==========================================
// EXPORT CUSTOMERS
// ==========================================

function exportCustomers() {

    if (crmCustomers.length === 0) {

        alert(
            "No customers available to export."
        );

        return;

    }


    const headers = [

        "Name",
        "Company",
        "Email",
        "Phone",
        "Status",
        "Orders",
        "Customer Value",
        "Join Date"

    ];


    const rows =
        crmCustomers.map(
            customer => [

                customer.name || "",

                customer.company || "",

                customer.email || "",

                customer.phone || "",

                customer.status || "",

                customer.orders || 0,

                customer.value || 0,

                customer.date || ""

            ]
        );


    const csv = [

        headers,

        ...rows

    ]
        .map(
            row =>
                row
                    .map(
                        value =>
                            `"${String(value)
                                .replace(
                                    /"/g,
                                    '""'
                                )}"`
                    )
                    .join(",")
        )
        .join("\n");


    const blob =
        new Blob(
            [csv],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href =
        url;


    link.download =
        "synvora-crm-customers.csv";


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    URL.revokeObjectURL(
        url
    );

}


// ==========================================
// SAVE DATA
// ==========================================

function saveCRMCustomers() {

    localStorage.setItem(
        "synvoraCRMCustomers",
        JSON.stringify(
            crmCustomers
        )
    );

}


// ==========================================
// UPDATE ELEMENT
// ==========================================

function updateCRMElement(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }

}


// ==========================================
// HTML ESCAPE
// ==========================================

function escapeCRMHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}