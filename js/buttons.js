/* =========================================================
   SYNVORA AI
   GLOBAL BUTTON SYSTEM
   + CRM BUTTON MANAGER
========================================================= */

"use strict";

console.log("Synvora AI - Global Button System Loaded");


/* =========================================================
   GLOBAL BUTTON LOADING
========================================================= */

function setButtonLoading(button, loading = true) {

    if (!button) return;

    if (loading) {

        if (!button.dataset.originalText) {

            button.dataset.originalText =
                button.innerHTML;

        }

        button.innerHTML =
            "⏳ Please wait...";

        button.disabled = true;

    }
    else {

        button.innerHTML =
            button.dataset.originalText || "Done";

        button.disabled = false;

    }

}


/* =========================================================
   DISABLE BUTTON
========================================================= */

function disableButton(button) {

    if (!button) return;

    button.disabled = true;

    button.style.opacity = "0.6";

    button.style.pointerEvents = "none";

}


/* =========================================================
   ENABLE BUTTON
========================================================= */

function enableButton(button) {

    if (!button) return;

    button.disabled = false;

    button.style.opacity = "";

    button.style.pointerEvents = "";

}


/* =========================================================
   GLOBAL DISABLED BUTTON PROTECTION
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest("button");

        if (!button) return;

        if (button.disabled) {

            event.preventDefault();

            event.stopPropagation();

            return;

        }

    },
    true
);


/* =========================================================
   CRM BUTTON MANAGER
========================================================= */

(function () {

    console.log(
        "Synvora AI - CRM Button Manager Loading..."
    );


    /* =====================================================
       CRM DATA
    ===================================================== */

    function getCustomers() {

        try {

            const data =
                localStorage.getItem("customers");

            if (!data) return [];

            const customers =
                JSON.parse(data);

            return Array.isArray(customers)
                ? customers
                : [];

        }
        catch (error) {

            console.error(
                "CRM Customer Data Error:",
                error
            );

            return [];

        }

    }


    /* =====================================================
       SAVE CUSTOMERS
    ===================================================== */

    function saveCustomers(customers) {

        localStorage.setItem(
            "customers",
            JSON.stringify(customers)
        );

    }


    /* =====================================================
       GENERATE CUSTOMER ID
    ===================================================== */

    function generateCustomerId() {

        return (
            "CUS-" +
            Date.now() +
            "-" +
            Math.floor(
                Math.random() * 1000
            )
        );

    }


    /* =====================================================
       ADD CUSTOMER MODAL
    ===================================================== */

    function openAddCustomerModal() {

        /*
           Agar modal already open hai
           to duplicate modal mat banao.
        */

        if (
            document.getElementById(
                "crmAddCustomerModal"
            )
        ) {

            return;

        }


        const modal =
            document.createElement("div");

        modal.id =
            "crmAddCustomerModal";

        modal.className =
            "crm-modal-overlay";


        modal.innerHTML = `

            <div class="crm-modal">

                <div class="crm-modal-header">

                    <div>

                        <span class="crm-eyebrow">
                            CRM MANAGEMENT
                        </span>

                        <h2>
                            ➕ Add Customer
                        </h2>

                    </div>


                    <button
                        type="button"
                        class="crm-modal-close"
                        data-crm-action="close-modal">

                        ✕

                    </button>

                </div>


                <form id="crmAddCustomerForm">

                    <div class="crm-form-grid">


                        <div class="crm-form-group">

                            <label>
                                Customer Name
                            </label>

                            <input
                                type="text"
                                id="crmCustomerName"
                                required
                                placeholder="Enter customer name"
                            >

                        </div>


                        <div class="crm-form-group">

                            <label>
                                Company
                            </label>

                            <input
                                type="text"
                                id="crmCustomerCompany"
                                placeholder="Company name"
                            >

                        </div>


                        <div class="crm-form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                id="crmCustomerEmail"
                                placeholder="customer@email.com"
                            >

                        </div>


                        <div class="crm-form-group">

                            <label>
                                Phone
                            </label>

                            <input
                                type="text"
                                id="crmCustomerPhone"
                                placeholder="+92 300 1234567"
                            >

                        </div>


                        <div class="crm-form-group">

                            <label>
                                Status
                            </label>

                            <select id="crmCustomerStatus">

                                <option value="active">
                                    Active
                                </option>

                                <option value="inactive">
                                    Inactive
                                </option>

                            </select>

                        </div>


                        <div class="crm-form-group">

                            <label>
                                Address
                            </label>

                            <input
                                type="text"
                                id="crmCustomerAddress"
                                placeholder="Karachi, Pakistan"
                            >

                        </div>


                    </div>


                    <div class="crm-modal-actions">


                        <button
                            type="button"
                            class="secondary-btn"
                            data-crm-action="close-modal">

                            Cancel

                        </button>


                        <button
                            type="submit"
                            class="primary-btn"
                            id="saveCRMCustomerBtn">

                            ➕ Save Customer

                        </button>


                    </div>


                </form>

            </div>

        `;


        document.body.appendChild(modal);


        const form =
            document.getElementById(
                "crmAddCustomerForm"
            );


        if (form) {

            form.addEventListener(
                "submit",
                handleAddCustomer
            );

        }


        setTimeout(function () {

            const nameInput =
                document.getElementById(
                    "crmCustomerName"
                );

            if (nameInput) {

                nameInput.focus();

            }

        }, 100);

    }


    /* =====================================================
       ADD CUSTOMER
    ===================================================== */

    function handleAddCustomer(event) {

        event.preventDefault();


        const nameInput =
            document.getElementById(
                "crmCustomerName"
            );

        const companyInput =
            document.getElementById(
                "crmCustomerCompany"
            );

        const emailInput =
            document.getElementById(
                "crmCustomerEmail"
            );

        const phoneInput =
            document.getElementById(
                "crmCustomerPhone"
            );

        const statusInput =
            document.getElementById(
                "crmCustomerStatus"
            );

        const addressInput =
            document.getElementById(
                "crmCustomerAddress"
            );


        if (!nameInput) {

            console.error(
                "CRM Customer Name input not found."
            );

            return;

        }


        const name =
            nameInput.value.trim();


        const company =
            companyInput
                ? companyInput.value.trim()
                : "";


        const email =
            emailInput
                ? emailInput.value.trim()
                : "";


        const phone =
            phoneInput
                ? phoneInput.value.trim()
                : "";


        const status =
            statusInput
                ? statusInput.value
                : "active";


        const address =
            addressInput
                ? addressInput.value.trim()
                : "";


        if (!name) {

            alert(
                "Please enter customer name."
            );

            return;

        }


        const customers =
            getCustomers();


        const customer = {

            id:
                generateCustomerId(),

            name:
                name,

            company:
                company,

            email:
                email,

            phone:
                phone,

            status:
                status,

            address:
                address,

            orders:
                0,

            totalSpending:
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


        customers.push(
            customer
        );


        saveCustomers(
            customers
        );


        closeCRMModal();


        refreshCRM();


        selectCRMCustomer(
            customer.id
        );


        showCRMMessage(
            "Customer added successfully."
        );

    }


    /* =====================================================
       CLOSE CRM MODAL
    ===================================================== */

    function closeCRMModal() {

        const modal =
            document.getElementById(
                "crmAddCustomerModal"
            );


        if (modal) {

            modal.remove();

        }

    }


    /* =====================================================
       SEARCH CUSTOMERS
    ===================================================== */

    function searchCustomers() {

        const input =
            document.getElementById(
                "crmSearchInput"
            );


        if (!input) {

            console.warn(
                "CRM Search input not found."
            );

            return;

        }


        const search =
            input.value
                .trim()
                .toLowerCase();


        const rows =
            document.querySelectorAll(
                "#customerTableBody tr"
            );


        rows.forEach(function (row) {

            const text =
                row.innerText
                    .toLowerCase();


            if (
                !search ||
                text.includes(search)
            ) {

                row.style.display = "";

            }
            else {

                row.style.display =
                    "none";

            }

        });


        showCRMMessage(
            search
                ? "Search completed."
                : "Showing all customers."
        );

    }


    /* =====================================================
       EXPORT CUSTOMERS
    ===================================================== */

    function exportCustomers() {

        const customers =
            getCustomers();


        if (!customers.length) {

            alert(
                "No customers available to export."
            );

            return;

        }


        const headers = [

            "ID",
            "Name",
            "Company",
            "Email",
            "Phone",
            "Status",
            "Orders",
            "Total Spending",
            "Customer Level",
            "Join Date"

        ];


        const rows =
            customers.map(function (customer) {

                return [

                    customer.id || "",

                    customer.name || "",

                    customer.company || "",

                    customer.email || "",

                    customer.phone || "",

                    customer.status || "",

                    customer.orders || 0,

                    customer.totalSpending || 0,

                    customer.level || "",

                    customer.date || ""

                ];

            });


        const csv = [

            headers,

            ...rows

        ]
        .map(function (row) {

            return row
                .map(function (value) {

                    const safeValue =
                        String(value)
                            .replace(
                                /"/g,
                                '""'
                            );

                    return `"${safeValue}"`;

                })
                .join(",");

        })
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
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


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


        showCRMMessage(
            "Customers exported successfully."
        );

    }


    /* =====================================================
       SELECT CUSTOMER
    ===================================================== */

    function selectCRMCustomer(customerId) {

        const customers =
            getCustomers();


        const customer =
            customers.find(
                function (item) {

                    return item.id ===
                        customerId;

                }
            );


        if (!customer) {

            console.warn(
                "CRM customer not found:",
                customerId
            );

            return;

        }


        localStorage.setItem(
            "selectedCRMCustomer",
            customerId
        );


        renderCustomerProfile(
            customer
        );


        renderCustomerNotes(
            customer
        );


        renderCustomerActivity(
            customer
        );

    }


    /* =====================================================
       CUSTOMER PROFILE
    ===================================================== */

    function renderCustomerProfile(customer) {

        const container =
            document.getElementById(
                "customer-profile-container"
            );


        if (!container) return;


        container.innerHTML = `

            <section class="customer-profile">

                <div class="section-header">

                    <h2>
                        👤 Customer Profile
                    </h2>


                    <button
                        type="button"
                        class="primary-btn"
                        data-crm-action="edit-profile">

                        ✏ Edit Profile

                    </button>

                </div>


                <div class="profile-card">


                    <div class="profile-avatar">
                        👤
                    </div>


                    <div class="profile-details">

                        <h3>
                            ${escapeHTML(customer.name)}
                        </h3>


                        <p>
                            <strong>Company:</strong>
                            ${escapeHTML(
                                customer.company || "-"
                            )}
                        </p>


                        <p>
                            <strong>Email:</strong>
                            ${escapeHTML(
                                customer.email || "-"
                            )}
                        </p>


                        <p>
                            <strong>Phone:</strong>
                            ${escapeHTML(
                                customer.phone || "-"
                            )}
                        </p>


                        <p>
                            <strong>Address:</strong>
                            ${escapeHTML(
                                customer.address || "-"
                            )}
                        </p>


                        <p>
                            <strong>Customer Since:</strong>
                            ${escapeHTML(
                                customer.date || "-"
                            )}
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
                                    customer.totalSpending || 0
                                ).toLocaleString()}
                            </h3>

                            <p>
                                Total Spending
                            </p>

                        </div>


                        <div class="summary-box">

                            <h3>
                                ${escapeHTML(
                                    customer.level ||
                                    "Regular"
                                )}
                            </h3>

                            <p>
                                Customer Level
                            </p>

                        </div>


                    </div>

                </div>

            </section>

        `;

    }


    /* =====================================================
       EDIT CUSTOMER
    ===================================================== */

    function editCustomerProfile() {

        const selectedId =
            localStorage.getItem(
                "selectedCRMCustomer"
            );


        if (!selectedId) {

            showCRMMessage(
                "Please select a customer first."
            );

            return;

        }


        const customers =
            getCustomers();


        const customer =
            customers.find(
                function (item) {

                    return item.id ===
                        selectedId;

                }
            );


        if (!customer) {

            showCRMMessage(
                "Customer not found."
            );

            return;

        }


        openEditCustomerModal(
            customer
        );

    }


    /* =====================================================
       EDIT CUSTOMER MODAL
    ===================================================== */

    function openEditCustomerModal(customer) {

        openAddCustomerModal();


        const modal =
            document.getElementById(
                "crmAddCustomerModal"
            );


        if (!modal) return;


        const title =
            modal.querySelector("h2");


        if (title) {

            title.textContent =
                "✏ Edit Customer";

        }


        const name =
            modal.querySelector(
                "#crmCustomerName"
            );

        const company =
            modal.querySelector(
                "#crmCustomerCompany"
            );

        const email =
            modal.querySelector(
                "#crmCustomerEmail"
            );

        const phone =
            modal.querySelector(
                "#crmCustomerPhone"
            );

        const status =
            modal.querySelector(
                "#crmCustomerStatus"
            );

        const address =
            modal.querySelector(
                "#crmCustomerAddress"
            );


        if (name)
            name.value =
                customer.name || "";


        if (company)
            company.value =
                customer.company || "";


        if (email)
            email.value =
                customer.email || "";


        if (phone)
            phone.value =
                customer.phone || "";


        if (status)
            status.value =
                customer.status || "active";


        if (address)
            address.value =
                customer.address || "";


        const form =
            modal.querySelector(
                "#crmAddCustomerForm"
            );


        if (!form) return;


        /*
           IMPORTANT:
           Existing Add Customer submit
           handler ko remove kar rahe hain.
        */

        form.removeEventListener(
            "submit",
            handleAddCustomer
        );


        /*
           Edit submit handler
        */

        form.addEventListener(
            "submit",
            function editSubmit(event) {

                event.preventDefault();


                const customers =
                    getCustomers();


                const index =
                    customers.findIndex(
                        function (item) {

                            return item.id ===
                                customer.id;

                        }
                    );


                if (index === -1) {

                    showCRMMessage(
                        "Customer not found."
                    );

                    return;

                }


                customers[index].name =
                    name.value.trim();


                customers[index].company =
                    company.value.trim();


                customers[index].email =
                    email.value.trim();


                customers[index].phone =
                    phone.value.trim();


                customers[index].status =
                    status.value;


                customers[index].address =
                    address.value.trim();


                saveCustomers(
                    customers
                );


                closeCRMModal();


                refreshCRM();


                selectCRMCustomer(
                    customer.id
                );


                showCRMMessage(
                    "Customer profile updated."
                );

            }
        );

    }


    /* =====================================================
       CUSTOMER NOTES
    ===================================================== */

    function renderCustomerNotes(customer) {

        const container =
            document.getElementById(
                "customer-notes-container"
            );


        if (!container) return;


        const notes =
            Array.isArray(customer.notes)
                ? customer.notes
                : [];


        container.innerHTML = `

            <section class="customer-notes">

                <div class="section-header">

                    <h2>
                        📝 Customer Notes
                    </h2>


                    <button
                        type="button"
                        class="primary-btn"
                        data-crm-action="add-note">

                        ➕ Add Note

                    </button>

                </div>


                <div class="notes-container">

                    ${
                        notes.length

                        ?

                        notes.map(
                            function (note) {

                                return `

                                    <div class="note-card">

                                        <h4>
                                            📝
                                            ${escapeHTML(
                                                note.title
                                            )}
                                        </h4>

                                        <p>
                                            ${escapeHTML(
                                                note.text
                                            )}
                                        </p>

                                        <small>
                                            Added:
                                            ${escapeHTML(
                                                note.date
                                            )}
                                        </small>

                                    </div>

                                `;

                            }
                        ).join("")

                        :

                        `

                            <div class="note-card">

                                <h4>
                                    📝 No Notes
                                </h4>

                                <p>
                                    No customer notes have
                                    been added yet.
                                </p>

                            </div>

                        `
                    }

                </div>

            </section>

        `;

    }


    /* =====================================================
       ADD CUSTOMER NOTE
    ===================================================== */

    function addCustomerNote() {

        const selectedId =
            localStorage.getItem(
                "selectedCRMCustomer"
            );


        if (!selectedId) {

            showCRMMessage(
                "Please select a customer first."
            );

            return;

        }


        const title =
            prompt(
                "Enter note title:"
            );


        if (!title) return;


        const text =
            prompt(
                "Enter customer note:"
            );


        if (!text) return;


        const customers =
            getCustomers();


        const customer =
            customers.find(
                function (item) {

                    return item.id ===
                        selectedId;

                }
            );


        if (!customer) return;


        if (!Array.isArray(customer.notes)) {

            customer.notes = [];

        }


        customer.notes.unshift({

            title:
                title.trim(),

            text:
                text.trim(),

            date:
                new Date()
                    .toLocaleString()

        });


        saveCustomers(
            customers
        );


        renderCustomerNotes(
            customer
        );


        showCRMMessage(
            "Customer note added."
        );

    }


    /* =====================================================
       CUSTOMER ACTIVITY
    ===================================================== */

    function renderCustomerActivity(customer) {

        const container =
            document.getElementById(
                "customer-activity-container"
            );


        if (!container) return;


        const activities =
            Array.isArray(customer.activities)
                ? customer.activities
                : [];


        container.innerHTML = `

            <section class="customer-activity">

                <div class="section-header">

                    <h2>
                        📜 Customer Activity Timeline
                    </h2>


                    <button
                        type="button"
                        class="primary-btn"
                        data-crm-action="full-history">

                        View Full History

                    </button>

                </div>


                <div class="timeline">

                    ${
                        activities.length

                        ?

                        activities.map(
                            function (activity) {

                                return `

                                    <div class="timeline-item">

                                        <div class="timeline-icon">

                                            ${
                                                activity.icon ||
                                                "📌"
                                            }

                                        </div>


                                        <div class="timeline-content">

                                            <h4>
                                                ${escapeHTML(
                                                    activity.title
                                                )}
                                            </h4>


                                            <p>
                                                ${escapeHTML(
                                                    activity.description
                                                )}
                                            </p>


                                            <small>
                                                ${escapeHTML(
                                                    activity.date
                                                )}
                                            </small>

                                        </div>

                                    </div>

                                `;

                            }
                        ).join("")

                        :

                        `

                            <div class="timeline-item">

                                <div class="timeline-icon">
                                    👤
                                </div>


                                <div class="timeline-content">

                                    <h4>
                                        Customer Created
                                    </h4>


                                    <p>
                                        Customer profile
                                        created in CRM.
                                    </p>


                                    <small>
                                        ${escapeHTML(
                                            customer.date || ""
                                        )}
                                    </small>

                                </div>

                            </div>

                        `
                    }

                </div>

            </section>

        `;

    }


    /* =====================================================
       FULL HISTORY
    ===================================================== */

    function viewFullHistory() {

        const selectedId =
            localStorage.getItem(
                "selectedCRMCustomer"
            );


        if (!selectedId) {

            showCRMMessage(
                "Please select a customer first."
            );

            return;

        }


        const customers =
            getCustomers();


        const customer =
            customers.find(
                function (item) {

                    return item.id ===
                        selectedId;

                }
            );


        if (!customer) return;


        const activities =
            Array.isArray(
                customer.activities
            )
                ? customer.activities
                : [];


        alert(

            "Customer History\n\n" +

            "Customer: " +
            customer.name +

            "\n\n" +

            (
                activities.length

                ?

                activities
                    .map(
                        function (activity) {

                            return (
                                activity.title +
                                " - " +
                                activity.date
                            );

                        }
                    )
                    .join("\n")

                :

                "No additional activity found."
            )

        );

    }


    /* =====================================================
       REFRESH CRM
    ===================================================== */

    function refreshCRM() {

        if (
            typeof window.displayCustomers ===
            "function"
        ) {

            window.displayCustomers();

        }


        if (
            typeof window.updateCRMStats ===
            "function"
        ) {

            window.updateCRMStats();

        }


        document.dispatchEvent(
            new CustomEvent(
                "crm:refresh"
            )
        );

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(
            value || ""
        )
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


    /* =====================================================
       CRM MESSAGE
    ===================================================== */

    function showCRMMessage(message) {

        const old =
            document.getElementById(
                "crmMessage"
            );


        if (old) {

            old.remove();

        }


        const messageBox =
            document.createElement(
                "div"
            );


        messageBox.id =
            "crmMessage";


        messageBox.className =
            "crm-message";


        messageBox.textContent =
            message;


        document.body.appendChild(
            messageBox
        );


        setTimeout(function () {

            messageBox.classList.add(
                "show"
            );

        }, 10);


        setTimeout(function () {

            messageBox.classList.remove(
                "show"
            );


            setTimeout(function () {

                if (messageBox) {

                    messageBox.remove();

                }

            }, 300);

        }, 2500);

    }


    /* =====================================================
       CRM BUTTON CLICK MANAGER
       
       IMPORTANT:
       Ye ek hi central click handler hai.
       Dynamic HTML buttons bhi kaam karenge.
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "button"
                );


            if (!button) return;


            /* =============================================
               CLOSE MODAL
            ============================================= */

            if (
                button.dataset.crmAction ===
                "close-modal"
            ) {

                event.preventDefault();

                closeCRMModal();

                return;

            }


            /* =============================================
               ADD CUSTOMER
               
               Supported:
               #addCustomerBtn
               #customerTableAddBtn
               data-crm-action="add-customer"
               ============================================= */

            if (

                button.id ===
                "addCustomerBtn"

                ||

                button.id ===
                "customerTableAddBtn"

                ||

                button.dataset.crmAction ===
                "add-customer"

                ||

                button.classList.contains(
                    "add-customer-btn"
                )

                ||

                (
                    button.closest(
                        ".crm-dashboard"
                    )

                    &&

                    button.textContent
                        .toLowerCase()
                        .includes(
                            "add customer"
                        )
                )

            ) {

                event.preventDefault();

                openAddCustomerModal();

                return;

            }


            /* =============================================
               SEARCH
            ============================================= */

            if (

                button.id ===
                "crmSearchBtn"

                ||

                button.dataset.crmAction ===
                "search"

            ) {

                event.preventDefault();

                searchCustomers();

                return;

            }


            /* =============================================
               EXPORT
            ============================================= */

            if (

                button.id ===
                "exportCustomersBtn"

                ||

                button.dataset.crmAction ===
                "export-customers"

            ) {

                event.preventDefault();

                exportCustomers();

                return;

            }


            /* =============================================
               EDIT PROFILE
            ============================================= */

            if (
                button.dataset.crmAction ===
                "edit-profile"
            ) {

                event.preventDefault();

                editCustomerProfile();

                return;

            }


            /* =============================================
               ADD NOTE
            ============================================= */

            if (
                button.dataset.crmAction ===
                "add-note"
            ) {

                event.preventDefault();

                addCustomerNote();

                return;

            }


            /* =============================================
               FULL HISTORY
            ============================================= */

            if (
                button.dataset.crmAction ===
                "full-history"
            ) {

                event.preventDefault();

                viewFullHistory();

                return;

            }

        }
    );


    /* =====================================================
       SEARCH ENTER KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !== "Enter"
            ) {

                return;

            }


            if (
                document.activeElement &&
                document.activeElement.id ===
                "crmSearchInput"
            ) {

                event.preventDefault();

                searchCustomers();

            }

        }
    );


    /* =====================================================
       ESC CLOSE MODAL
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                closeCRMModal();

            }

        }
    );


    /* =====================================================
       EXPOSE CRM FUNCTIONS
    ===================================================== */

    window.openAddCustomerModal =
        openAddCustomerModal;


    window.searchCRMCustomers =
        searchCustomers;


    window.exportCRMCustomers =
        exportCustomers;


    window.selectCRMCustomer =
        selectCRMCustomer;


    window.refreshCRM =
        refreshCRM;


    window.editCRMCustomer =
        editCustomerProfile;


    window.addCRMCustomerNote =
        addCustomerNote;


    window.viewCRMHistory =
        viewFullHistory;


    window.closeCRMModal =
        closeCRMModal;


    window.showCRMMessage =
        showCRMMessage;


    console.log(
        "Synvora AI - CRM Button Manager Loaded Successfully"
    );

})();

// =========================================================
// SYNVORA AI
// EMPLOYEE BUTTON MANAGER
// =========================================================

document.addEventListener("click", function (event) {

    const button = event.target.closest("button");

    if (!button) return;


    // =====================================================
    // ADD EMPLOYEE
    // =====================================================

    if (button.id === "addEmployeeBtn") {

        event.preventDefault();

        if (typeof window.addEmployee === "function") {

            window.addEmployee();

        } else {

            console.error(
                "addEmployee() function not found"
            );

        }

        return;
    }


    // =====================================================
// INDIVIDUAL EMPLOYEE ATTENDANCE
// =====================================================

if (
    button.classList.contains("action-attendance") ||
    button.dataset.employeeAction === "attendance"
) {

    event.preventDefault();

    const employeeId =
        button.dataset.employeeId;

    if (!employeeId) {

        console.error(
            "Employee ID not found for attendance button."
        );

        return;
    }

    const employees =
        JSON.parse(
            localStorage.getItem("employees") || "[]"
        );

    const employeeIndex =
        employees.findIndex(function (employee) {

            return String(employee.id) ===
                String(employeeId);

        });

    if (employeeIndex === -1) {

        console.error(
            "Employee not found:",
            employeeId
        );

        return;
    }

    if (
        typeof window.openAttendanceModal ===
        "function"
    ) {

        window.openAttendanceModal(
            employeeIndex
        );

    } else {

        console.error(
            "openAttendanceModal() function not found."
        );

    }

    return;
}


    // =====================================================
    // ATTENDANCE HISTORY
    // =====================================================

    if (
        button.id === "attendanceHistoryBtn" ||
        button.dataset.employeeAction === "attendance-history"
    ) {

        event.preventDefault();

        if (
            typeof window.openAttendanceHistory ===
            "function"
        ) {

            window.openAttendanceHistory();

        } else {

            console.error(
                "openAttendanceHistory() function not found."
            );

        }

        return;
    }

});

/* AI BUSINESS ADVISOR CHAT */
(function () {
    const conversation = [];

    function addAdvisorMessage(role, text) {
        const messages = document.getElementById("advisorChatMessages");
        if (!messages) return null;

        const message = document.createElement("div");
        message.className =
            "advisor-chat-message " +
            (role === "user"
                ? "advisor-chat-user"
                : "advisor-chat-assistant");

        message.textContent = text;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;

        return message;
    }

    document.addEventListener("click", function (event) {
        const button = event.target.closest("[data-ai-action]");
        if (!button) return;

        if (button.dataset.aiAction === "ask") {
            const panel = document.getElementById("advisorChatPanel");
            const input = document.getElementById("advisorChatInput");

            if (!panel) return;

            panel.hidden = false;
            button.setAttribute("aria-expanded", "true");
            panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
            input?.focus();
        }

        if (button.dataset.aiAction === "close") {
            const panel = document.getElementById("advisorChatPanel");
            const askButton =
                document.getElementById("askBusinessAdvisorBtn");

            if (!panel) return;

            panel.hidden = true;
            askButton?.setAttribute("aria-expanded", "false");
            askButton?.focus();
        }
    });

    document.addEventListener("submit", async function (event) {
        if (event.target.id !== "advisorChatForm") return;

        event.preventDefault();

        const input = document.getElementById("advisorChatInput");
        const sendButton = document.getElementById("advisorSendBtn");
        const status = document.getElementById("advisorChatStatus");

        const question = input?.value.trim();
        if (!question || !sendButton) return;

        addAdvisorMessage("user", question);
        conversation.push({ role: "user", text: question });

        input.value = "";
        sendButton.disabled = true;

        if (status) status.textContent = "Advisor is thinking...";

        const replyMessage = addAdvisorMessage("assistant", "Thinking...");

        const message = conversation
            .slice(-12)
            .map(function (item) {
                const speaker =
                    item.role === "user" ? "Business owner" : "Advisor";
                return speaker + ": " + item.text;
            })
            .join("\n\n");

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: message })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.reply || data.error || "The advisor request failed."
                );
            }

            const reply = data.reply || "I couldn't generate a reply.";

            if (replyMessage) replyMessage.textContent = reply;
            conversation.push({ role: "assistant", text: reply });

            if (status) status.textContent = "";
        } catch (error) {
            if (replyMessage) {
                replyMessage.textContent =
                    "Sorry, I couldn't get an answer right now. Please try again.";
            }

            if (status) status.textContent = error.message;
        } finally {
            sendButton.disabled = false;
            input?.focus();
        }
    });
})();

function showBusinessOSModule(moduleName) {
    const sections = document.querySelectorAll("[data-business-module]");

    if (!sections.length) {
        console.error(
            "Business OS sections par data-business-module attributes nahi mile."
        );
        return;
    }

    sections.forEach((section) => {
        const isSelected = section.dataset.businessModule === moduleName;

        section.hidden = !isSelected;

        if (isSelected) {
            section.style.removeProperty("display");
        } else {
            section.style.setProperty("display", "none", "important");
        }
    });

    document.querySelectorAll(".business-os-nav-btn").forEach((button) => {
        const isActive =
            button.dataset.businessModuleTarget === moduleName;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

document.addEventListener("click", (event) => {
    const button = event.target.closest(
        ".business-os-nav-btn[data-business-module-target]"
    );

    if (!button) return;

    showBusinessOSModule(button.dataset.businessModuleTarget);
});

// Page khulte hi sirf Overview dikhao
showBusinessOSModule("overview");