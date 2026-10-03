const form = document.getElementById("recordForm");
const result = document.getElementById("result");
const recordsTableBody = document.getElementById("recordsTableBody");
const refreshRecords = document.getElementById("refreshRecords");

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

        recordsTableBody.innerHTML = "";

        if (!data.records || data.records.length === 0) {
            recordsTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty">No records found.</td>
                </tr>
            `;
            return;
        }

        data.records.forEach(record => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${record.id}</td>
                <td>${record.unique_id}</td>
                <td>${record.name}</td>
                <td>${record.email}</td>
                <td>${record.phone || "-"}</td>
                <td>
                    <span class="status ${record.status}">
                        ${record.status}
                    </span>
                </td>
                <td>${record.created_at || "-"}</td>
            `;

            recordsTableBody.appendChild(row);
        });

    } catch (error) {
        recordsTableBody.innerHTML = `
            <tr>
                <td colspan="7" class="empty">
                    Unable to load records.
                </td>
            </tr>
        `;
    }
}

refreshRecords.addEventListener("click", loadRecords);

loadRecords();

async function deleteRecord(recordId) {
    const confirmed = confirm("Are you sure you want to delete this record?");

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`/api/records/${recordId}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (data.status === "success") {
            loadRecords();
        } else {
            alert(data.message || "Unable to delete record.");
        }

    } catch (error) {
        alert("Unable to delete record.");
    }
}
