const form = document.getElementById("recordForm");
const result = document.getElementById("result");
const recordsTableBody = document.getElementById("recordsTableBody");
const refreshRecords = document.getElementById("refreshRecords");
const searchRecords = document.getElementById("searchRecords");
const statusFilter = document.getElementById("statusFilter");
let allRecords = [];

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
        unique_id: document.getElementById("unique_id").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };

    try {
        const response = await fetch("/api/records", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        result.textContent = data.message || data.errors?.join(" ");

        if (data.status === "success") {
            result.className = "success";
            form.reset();
            loadRecords();
        } else if (data.status === "duplicate") {
            result.className = "duplicate";
        } else if (data.status === "review") {
            result.className = "review";
        } else {
            result.className = "error";
        }

    } catch (error) {
        result.textContent = "Unable to process the request.";
        result.className = "error";
    }
});


async function loadRecords() {
    try {
        const response = await fetch("/api/records");
        const data = await response.json();

        allRecords = data.records || [];
        displayRecords();

        if (!data.records || data.records.length === 0) {
            recordsTableBody.innerHTML = `
                <tr>
                    <td colspan="8" class="empty">
                        No records found.
                    </td>
                </tr>
            `;
            return;
        }



    } catch (error) {

        recordsTableBody.innerHTML = `
            <tr>
                <td colspan="8" class="empty">
                    Unable to load records.
                </td>
            </tr>
        `;
    }
}



function displayRecords() {
    const searchText = searchRecords.value.toLowerCase().trim();
    const selectedStatus = statusFilter.value;

    const filteredRecords = allRecords.filter(record => {
        const matchesSearch =
            String(record.id).toLowerCase().includes(searchText) ||
            record.unique_id.toLowerCase().includes(searchText) ||
            record.name.toLowerCase().includes(searchText) ||
            record.email.toLowerCase().includes(searchText) ||
            (record.phone || "").toLowerCase().includes(searchText);

        const matchesStatus =
            selectedStatus === "all" ||
            record.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    recordsTableBody.innerHTML = "";

    if (filteredRecords.length === 0) {
        recordsTableBody.innerHTML = `
            <tr>
                <td colspan="8" class="empty">
                    No matching records found.
                </td>
            </tr>
        `;
        return;
    }

    filteredRecords.forEach(record => {
        const approveButton = record.status === "review"
            ? `<button class="approve-btn" onclick="approveRecord(${record.id})">Keep</button>`
            : "";

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.unique_id}</td>
            <td>${record.name}</td>
            <td>${record.email}</td>
            <td>${record.phone || "-"}</td>
            <td>
                <span class="status ${record.status}">
                    ${record.status.toUpperCase()}
                </span>
            </td>
            <td>${record.created_at || "-"}</td>
            <td class="actions">
                ${approveButton}
                <button class="delete-btn" onclick="deleteRecord(${record.id})">
                    Delete
                </button>
            </td>
        `;

        recordsTableBody.appendChild(row);
    });
}
async function approveRecord(recordId) {

    const confirmed = confirm(
        "Keep this record?\n\nIts status will be changed from REVIEW to VALID."
    );

    if (!confirmed) {
        return;
    }

    try {

        const response = await fetch(
            `/api/records/${recordId}/approve`,
            {
                method: "PATCH"
            }
        );

        const data = await response.json();

        if (data.status === "success") {
            alert("Record marked as VALID.");
            loadRecords();
        } else {
            alert(data.message || "Unable to approve record.");
        }

    } catch (error) {
        alert("Unable to approve record.");
    }
}


async function deleteRecord(recordId) {

    const confirmed = confirm(
        "Are you sure you want to DELETE this record?\n\nThis action cannot be undone."
    );

    if (!confirmed) {
        return;
    }

    try {

        const response = await fetch(
            `/api/records/${recordId}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (data.status === "success") {
            alert("Record deleted successfully.");
            loadRecords();
        } else {
            alert(data.message || "Unable to delete record.");
        }

    } catch (error) {
        alert("Unable to delete record.");
    }
}


refreshRecords.addEventListener("click", loadRecords);

loadRecords();

searchRecords.addEventListener("input", displayRecords);
statusFilter.addEventListener("change", displayRecords);
