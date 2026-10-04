# Data Redundancy Removal System

A web-based **Data Redundancy Removal System** designed to validate records, detect duplicate or potentially redundant data, and maintain clean and reliable database records.

The system uses **Python, Flask, MySQL, HTML, CSS, and JavaScript**, with **rule-based validation** and **SHA-256 hashing** for exact duplicate detection.

---

## 📌 Project Overview

The **Data Redundancy Removal System** helps prevent unnecessary duplicate records from entering a database.

It validates incoming records, checks unique identifiers, detects exact duplicates, and identifies records that may require **manual administrative review**.

The system also provides an administrative dashboard for searching, filtering, reviewing, approving, and deleting stored records.

> **Note:** This project uses rule-based validation and classification. It does **not** use Artificial Intelligence or Machine Learning.

---

## ✨ Key Features

- 📝 **Data Validation** — Validates required fields and input formats.
- 🔑 **Unique ID Protection** — Prevents duplicate unique identifiers.
- 🔍 **Exact Duplicate Detection** — Uses SHA-256 hashing to identify exact duplicates.
- ⚠️ **Review System** — Identifies potentially redundant records for manual review.
- 👨‍💼 **Admin Dashboard** — Provides centralized record management.
- 🔎 **Search Records** — Search by ID, Unique ID, name, email, or phone.
- 🏷️ **Status Filtering** — Filter records by `VALID` or `REVIEW`.
- ✅ **Record Approval** — Convert review records to valid records.
- 🗑️ **Record Deletion** — Remove unwanted records with confirmation.
- 🔄 **Refresh Records** — Refresh the record list.
- 🗄️ **MySQL Database** — Provides persistent structured data storage.
- 📱 **Responsive Interface** — Clean and responsive dashboard UI.

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| **Frontend** | HTML, CSS, JavaScript |
| **Backend** | Python, Flask |
| **Database** | MySQL |
| **ORM** | Flask-SQLAlchemy |
| **Database Driver** | PyMySQL |
| **Duplicate Detection** | SHA-256 Hashing |
| **Validation** | Rule-Based Validation |
| **Configuration** | Python-dotenv |
| **Version Control** | Git & GitHub |

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
```
The system follows a rule-based validation and classification pipeline.

                User Input
                    │
                    ▼
            Data Validation
                    │
                    ▼
           Unique ID Check
                    │
                    ▼
          Duplicate Detection
                    │
                    ▼
       Redundancy Classification
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
        VALID     REVIEW   DUPLICATE
          │         │         │
          ▼         ▼         ▼
       Store     Admin     Reject
       Record    Review     Record
## ⚙️ Process

1. 📝 User enters a new record.
2. ✅ System validates the submitted information.
3. 🔑 Unique ID is checked against existing records.
4. 🔍 Incoming data is compared with stored records.
5. #️⃣ SHA-256 hashing is used for exact duplicate detection.
6. ⚠️ Records with an existing email but different details are marked for review.
7. 💾 Valid records are stored in the database.
8. 👨‍💼 Administrators can review and manage records through the dashboard.

---

# 🧠 Redundancy Classification

## ✅ VALID

A record is classified as **VALID** when:

- Required fields pass validation.
- The Unique ID does not already exist.
- The record does not match an existing record.
- No implemented redundancy rule flags the record for review.

---

## ⚠️ REVIEW

A record is classified as **REVIEW** when:

- The email already exists in the database.
- However, the complete record is not an exact duplicate.

The administrator can manually review the record and decide whether it should be retained.

---

## 🚫 DUPLICATE

A record is classified as **DUPLICATE** when its normalized data matches an existing record.

Exact duplicate records are rejected to prevent redundant data from entering the database.

---

# 🔐 Duplicate Detection

The system uses **SHA-256 hashing** to detect exact duplicate records.

The following fields are normalized before generating the hash:

- Name
- Email
- Phone

### Detection Process

```text
Record Data
     │
     ▼
Normalize Data
     │
     ▼
Generate SHA-256 Hash
     │
     ▼
Compare With Existing Hashes
     │
     ├── Match ──► DUPLICATE
     │
     └── No Match ──► Continue Validation
👨‍💼 Admin Dashboard

The administrative dashboard provides centralized control over stored records.

Available Operations
🔎 Search records
🏷️ Filter records by status
👀 Review potentially redundant records
✅ Approve review records
🗑️ Delete unwanted records
🔄 Refresh the record list
Searchable Fields

Administrators can search using:

Database ID
Unique ID
Name
Email
Phone
🛡️ Data Integrity

The system uses multiple layers of validation to maintain database quality.

Check	Purpose
🔑 Unique ID Protection	Prevents duplicate identifiers
✅ Input Validation	Ensures valid input
#️⃣ SHA-256 Hashing	Detects exact duplicates
⚠️ Manual Review	Handles potentially redundant records
🗄️ MySQL Storage	Maintains structured persistent data
🚀 Getting Started
📋 Prerequisites

Make sure the following are installed:

🐍 Python 3.x
🗄️ MySQL 8.x
🔧 Git
🌐 Modern Web Browser
1. Clone the Repository
git clone https://github.com/shaikh-abdul-basit436/DataRedundancySystem.git
cd DataRedundancySystem
2. Create a Virtual Environment
python -m venv venv
3. Activate the Virtual Environment
Windows PowerShell
.\venv\Scripts\Activate.ps1
Windows CMD
venv\Scripts\activate
4. Install Dependencies
pip install -r requirements.txt
5. Configure Environment Variables

Create a .env file in the project root and configure your MySQL database connection.

Example:

DATABASE_URL=mysql+pymysql://username:password@localhost/database_name

🔒 Security: Never commit database credentials, passwords, API keys, or other sensitive information to GitHub.

Add the following to .gitignore:

.env
venv/
__pycache__/
6. Start the Application
python run.py

The Flask server will start locally.

Open the local server URL displayed in the terminal in your web browser.

🖥️ Using the Application
➕ Add a Record
Enter the Unique ID.
Enter the Name.
Enter the Email Address.
Optionally enter the Phone Number.
Submit the record.
The system validates and classifies the record.
🔍 Exact Duplicate

If an exact duplicate is detected:

Incoming Record
       ↓
SHA-256 Comparison
       ↓
Existing Hash Found
       ↓
DUPLICATE
       ↓
Record Rejected

The system prevents the redundant record from being inserted.

⚠️ Review Record

If the email already exists but the complete record is different:

Existing Email Found
        ↓
Record Is Not Exact Duplicate
        ↓
REVIEW
        ↓
Admin Dashboard

The administrator can:

✅ Keep the record and mark it as VALID
🗑️ Delete the record
🔎 Search & Filtering

The admin dashboard supports searching records by:

Database ID
Unique ID
Name
Email
Phone

Records can also be filtered by status:

ALL
VALID
REVIEW
📊 Project Highlights
Area	Implementation
Data Validation	Rule-Based Validation
Duplicate Detection	SHA-256 Hashing
Database	MySQL
Backend	Flask
Frontend	HTML, CSS & JavaScript
ORM	Flask-SQLAlchemy
Database Driver	PyMySQL
Record Management	Search, Filter, Review & Delete
Configuration	Environment Variables
Version Control	Git & GitHub
🎯 Project Objective

The primary objective of this project is to develop a system that helps maintain clean, consistent, and non-redundant database records.

The system focuses on:

Validating incoming records
Preventing duplicate identifiers
Detecting exact duplicate records
Identifying potentially redundant information
Providing administrative review
Maintaining structured database storage
Supporting efficient record management
📚 Learning Outcomes

Through this project, practical experience was gained in:

🐍 Python and Flask
🗄️ MySQL database integration
🌐 Frontend and backend integration
🔐 Data validation and hashing
🔍 Duplicate detection
👨‍💻 CRUD operations
🛠️ Git and GitHub
📦 Python virtual environments
🔧 Environment-based configuration
🗃️ Database management
🔮 Future Enhancements

Possible future improvements include:

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

The current version includes:

✅ Data validation
✅ Unique ID protection
✅ Exact duplicate detection
✅ SHA-256 hashing
✅ Redundancy classification
✅ MySQL database storage
✅ Record search
✅ Status filtering
✅ Administrative review
✅ Record approval
✅ Record deletion
✅ Responsive interface
🔗 Repository & Live Demo
GitHub Repository

https://github.com/shaikh-abdul-basit436/DataRedundancySystem

🌐 Live Demo

https://data-redundancy-system-w21x.onrender.com

👨‍💻 Developed For

This project was developed as part of the CodeAlpha Internship to demonstrate practical skills in:

Python
Flask
MySQL
HTML/CSS/JavaScript
Data validation
Duplicate detection
Database management
Git & GitHub
📄 License

This project was developed for educational and internship purposes.
