# Data Redundancy Removal System

A web-based **Data Redundancy Removal System** designed to validate records, detect duplicate or potentially redundant data, and maintain cleaner and more reliable database records.

The system uses **Python, Flask, MySQL, HTML, CSS, and JavaScript** with rule-based validation and SHA-256 hashing for exact duplicate detection.

---

## 📌 Project Overview

The Data Redundancy Removal System helps prevent unnecessary duplicate data from entering a database.

It validates incoming records, checks unique identifiers, detects exact duplicates, and identifies records that may require manual review.

The system also provides an administrative dashboard for searching, filtering, reviewing, approving, and deleting stored records.

> 💡 **Note:** The system uses rule-based validation and classification. It does not use AI or machine learning.

---

## ✨ Features

- 📝 **Data Validation** — Validates required fields and input formats.
- 🔑 **Unique ID Protection** — Prevents duplicate unique identifiers.
- 🔍 **Duplicate Detection** — Detects exact duplicate records using SHA-256 hashing.
- ⚠️ **Review System** — Identifies potentially redundant records for manual review.
- 👨‍💼 **Admin Dashboard** — Provides management of stored records.
- 🔎 **Search** — Search records by ID, Unique ID, name, email, or phone.
- 🏷️ **Status Filtering** — Filter records by Valid or Review status.
- ✅ **Record Approval** — Review records can be marked as Valid.
- 🗑️ **Record Deletion** — Delete unwanted records with confirmation.
- 🔄 **Refresh Records** — Refresh the stored record list.
- 🗄️ **MySQL Database** — Provides structured and persistent data storage.
- 📱 **Responsive Interface** — Clean dashboard interface for record management.

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Python, Flask |
| Database | MySQL |
| ORM | Flask-SQLAlchemy |
| Database Driver | PyMySQL |
| Duplicate Detection | SHA-256 Hashing |
| Validation | Rule-Based |
| Configuration | Python-dotenv |
| Version Control | Git & GitHub |

---

## 📂 Project Structure

```text
DataRedundancySystem/
│
├── app/
│   ├── app.py
│   ├── database.py
│   ├── models.py
│   ├── redundancy.py
│   ├── validation.py
│   │
│   ├── templates/
│   │   └── index.html
│   │
│   └── static/
│       ├── css/
│       │   └── style.css
│       │
│       └── js/
│           └── app.js
│
├── .env
├── requirements.txt
├── run.py
└── README.md

⚙️ How It Works

The system follows a rule-based process to validate and classify incoming records.

User Input
    ↓
Data Validation
    ↓
Unique ID Check
    ↓
Duplicate Detection
    ↓
Redundancy Classification
    ↓
Database Storage / Review / Rejection
Process
📝 The user enters a new record.
✅ The system validates the submitted information.
🔑 The Unique ID is checked against existing records.
🔍 The system compares the incoming record with stored data.
#️⃣ SHA-256 hashing is used to detect exact duplicate records.
⚠️ Records with an existing email but different details are marked for review.
💾 Valid records are stored in the database.
👨‍💼 Administrators can manage stored records through the dashboard.
🧠 Redundancy Classification
✅ Valid

A record is classified as Valid when it passes the implemented validation and redundancy checks and does not match an existing record.

⚠️ Review

A record is classified as Review when the email already exists in the database but the complete record is not an exact duplicate.

The administrator can review the record and decide whether to keep it.

🚫 Duplicate

A record is treated as a Duplicate when its normalized data matches an existing record.

Exact duplicate records are rejected to prevent redundant data from entering the database.

🔐 Duplicate Detection

The system uses SHA-256 hashing to detect exact duplicate records.

The following information is normalized and used to generate the hash:

Name
Email
Phone

The generated hash is compared with existing records.

If the hash matches an existing record, the incoming record is identified as an exact duplicate.

👨‍💼 Admin Dashboard

The administration section provides control over stored records.

Administrators can:

🔎 Search records
🏷️ Filter records by status
👀 Review potentially redundant records
✅ Keep review records and mark them as Valid
🗑️ Delete records
🔄 Refresh the record list

This provides a simple way to maintain data quality after records have been submitted.

🛡️ Data Integrity

The system uses multiple checks to maintain database accuracy:

🔑 Unique identifier protection
✅ Input validation
#️⃣ SHA-256-based duplicate detection
⚠️ Manual review for potentially related records
🗄️ Structured database storage

These checks help reduce invalid and redundant data while maintaining administrative control over stored records.

🚀 Getting Started
📋 Prerequisites

Make sure the following are installed:

🐍 Python 3.x
🗄️ MySQL 8.x
🔧 Git
🌐 Modern web browser
📥 Installation
1. Clone the Repository
git clone https://github.com/shaikh-abdul-basit436/DataRedundancySystem.git
cd DataRedundancySystem
2. Create a Virtual Environment
python -m venv venv
3. Activate the Virtual Environment
.\venv\Scripts\Activate.ps1
4. Install Dependencies
pip install -r requirements.txt
5. Configure Environment Variables

Create a .env file in the project root and configure the required MySQL database connection details.

🔒 Security: Do not commit database credentials or other sensitive information to GitHub.

6. Start the Application
python run.py

Open the local Flask server address displayed in the terminal in your web browser.

🖥️ Using the Application
➕ Add a Record
Enter the Unique ID.
Enter the name.
Enter the email address.
Optionally enter a phone number.
Submit the record.
The system validates and classifies the record.
🔍 Duplicate Record

If an exact duplicate is detected, the system rejects the new record and displays a duplicate notification.

⚠️ Review Record

If the email already exists but the complete record is different:

The record is classified as REVIEW.
The record is displayed in the admin dashboard.
The administrator can select Keep to mark it as VALID.
The administrator can delete the record if it should not be retained.
🔎 Search and Filter

Administrators can search records using:

Database ID
Unique ID
Name
Email
Phone

Records can also be filtered by status.

🎯 Project Objective

The main objective of this project is to build a system that helps maintain clean, consistent, and non-redundant data.

The system focuses on:

Validating incoming records
Preventing duplicate identifiers
Detecting exact duplicate records
Identifying potentially redundant information
Providing administrative control over stored records
📊 Project Highlights
Area	Implementation
Data Validation	Rule-Based Validation
Duplicate Detection	SHA-256 Hashing
Database	MySQL
Backend	Flask
Frontend	HTML, CSS & JavaScript
Record Management	Search, Filter, Review & Delete
Data Storage	MySQL
Configuration	Environment Variables
📚 Learning Outcomes

This project provided practical experience with:

🐍 Python and Flask
🗄️ MySQL database integration
🌐 Frontend and backend integration
🔐 Data validation and hashing
🔍 Duplicate detection
👨‍💻 CRUD operations
🛠️ Git and GitHub
📦 Python virtual environments
🔧 Environment-based configuration
🔮 Future Enhancements

Possible improvements for future versions include:

🤖 Fuzzy duplicate detection
📂 Bulk CSV/Excel data import
📊 Data quality reports and analytics
🔐 Authentication and role-based access control
📋 Audit logs
⚡ Improved handling of large datasets
🧪 Automated testing
🚀 Production deployment
📌 Project Status

✅ Completed

The current version includes the core functionality for:

Data validation
Duplicate detection
Redundancy classification
MySQL database storage
Record search and filtering
Administrative review
Record approval
Record deletion
🔗 Repository

GitHub:
https://github.com/shaikh-abdul-basit436/DataRedundancySystem

👨‍💻 Developed For

This project was developed as part of the CodeAlpha Internship to demonstrate practical skills in:

Python
Flask
MySQL
HTML/CSS/JavaScript
Data validation
Duplicate detection
Database management
📄 License

This project was developed for educational and internship purposes.
