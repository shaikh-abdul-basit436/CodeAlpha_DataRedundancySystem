# Data Redundancy Removal System

A Flask and MySQL-based data quality system designed to validate incoming records, detect redundant data, prevent duplicate database entries, and provide administrators with tools to review and manage stored records.

## Features

- Record validation
- Required-field validation
- Email format validation
- Phone format validation
- Unique ID protection
- SHA-256 based exact duplicate detection
- Same-email redundancy detection
- Review status for potentially redundant records
- Admin approval of review records
- Admin deletion of unwanted records
- Search records
- Filter records by status
- MySQL database storage
- Web-based administration dashboard

## Technology Stack

- Python
- Flask
- Flask-SQLAlchemy
- MySQL
- PyMySQL
- HTML
- CSS
- JavaScript

## System Workflow

New Record
    |
    v
Input Validation
    |
    v
Unique ID Check
    |
    v
SHA-256 Duplicate Check
    |
    +---- Exact Match ----> Duplicate / Reject
    |
    v
Same Email Check
    |
    +---- Same Email ----> Review
    |
    v
Valid Record
    |
    v
MySQL Database

## Admin Workflow

Stored Records
    |
    v
Admin Dashboard
    |
    +---- Search
    |
    +---- Status Filter
    |
    +---- Review Record
    |        |
    |        +---- Keep -> Valid
    |        |
    |        +---- Delete
    |
    +---- Delete Unwanted Record

## Status Classification

### Valid

The record passes the defined validation checks, is not an exact duplicate, and does not trigger the same-email review rule.

### Review

The record has a different data hash but uses an email address already present in the database. The administrator can review the record and either keep it or delete it.

### Duplicate

The incoming record matches an existing record based on the generated SHA-256 data hash.

## Project Structure

```text
DataRedundancySystem/
|
├── app/
│   ├── app.py
│   ├── database.py
│   ├── models.py
│   ├── redundancy.py
│   ├── validation.py
│   |
│   ├── templates/
│   │   └── index.html
│   |
│   └── static/
│       ├── css/
│       │   └── style.css
│       |
│       └── js/
│           └── app.js
|
├── .env
├── requirements.txt
└── run.py

## Architecture

The system follows a simple three-layer web application architecture:

```text
┌──────────────────────────────────────────────┐
│              Frontend Layer                  │
│        HTML + CSS + JavaScript               │
│                                              │
│  • Record Input                              │
│  • Search & Filtering                        │
│  • Status Display                            │
│  • Admin Record Management                   │
└──────────────────────┬───────────────────────┘
                       │ HTTP / REST API
                       ▼
┌──────────────────────────────────────────────┐
│              Application Layer               │
│                   Flask                     │
│                                              │
│  • Request Handling                          │
│  • Input Validation                          │
│  • Duplicate Detection                       │
│  • Redundancy Classification                 │
│  • Record Management                         │
└──────────────────────┬───────────────────────┘
                       │ SQLAlchemy / PyMySQL
                       ▼
┌──────────────────────────────────────────────┐
│                Database Layer                │
│                   MySQL                     │
│                                              │
│              records table                   │
│  • Unique ID                                 │
│  • Name                                      │
│  • Email                                     │
│  • Phone                                     │
│  • SHA-256 Data Hash                         │
│  • Status                                    │
│  • Created Timestamp                         │
└──────────────────────────────────────────────┘
```

## Component Responsibilities

| Component       | Responsibility                                                                 |
| --------------- | ------------------------------------------------------------------------------ |
| `app.py`        | Flask application, API routes, database operations and request handling        |
| `database.py`   | Flask-SQLAlchemy database initialization                                       |
| `models.py`     | Database model definition for records                                          |
| `validation.py` | Required-field, email, phone and SHA-256 hash generation logic                 |
| `redundancy.py` | Redundancy classification logic                                                |
| `index.html`    | Main dashboard and record management interface                                 |
| `style.css`     | Dashboard styling and responsive layout                                        |
| `app.js`        | API communication, record loading, searching, filtering, approval and deletion |
| `run.py`        | Application entry point                                                        |

## Core Data Validation

Before a record is stored, the application performs rule-based validation.

The following checks are implemented:

* Unique ID must be provided.
* Name must be provided.
* Email must be provided.
* Email must follow the expected email format.
* Phone number is optional.
* If a phone number is provided, it must follow the accepted phone-number format.

Invalid records are rejected before database insertion.

> **Note:** `VALID` indicates that the record passed the validation and redundancy rules implemented by this application. It does not represent external or factual verification of the submitted information.

## Duplicate Detection

The system uses **SHA-256 hashing** to identify exact redundant records.

The following fields are normalized before generating the hash:

```text
Name + Email + Phone
```

Normalization includes:

* Removing leading and trailing spaces.
* Converting name and email values to lowercase.
* Creating a consistent combined representation.
* Generating a SHA-256 hash from the normalized data.

Example:

```text
Input Record
     │
     ▼
Normalize Data
     │
     ▼
Name + Email + Phone
     │
     ▼
SHA-256 Hash
     │
     ▼
Compare With Existing Records
```

If the generated hash matches an existing record, the incoming record is treated as an exact duplicate and is rejected.

## Redundancy Classification

The application uses rule-based classification rather than machine learning or artificial intelligence.

### 1. Valid

A record is classified as valid when:

* Required fields are valid.
* The Unique ID does not already exist.
* The generated SHA-256 hash does not match an existing record.
* The email does not trigger the review rule.

### 2. Review

A record is classified as `REVIEW` when:

* The record is not an exact duplicate.
* However, the email address already exists in the database.

This allows an administrator to manually decide whether the record should be retained.

### 3. Duplicate

A record is classified as a duplicate when its generated SHA-256 hash matches an existing record.

Exact duplicates are rejected before being inserted into the database.

## Admin Data Management

The dashboard provides basic administrative controls for stored records.

### Search

Administrators can search records using:

* Database ID
* Unique ID
* Name
* Email
* Phone

### Status Filtering

Records can be filtered using:

* All Status
* Valid
* Review

### Review Management

Records marked as `REVIEW` provide a **Keep** action.

Selecting **Keep** changes the record status from:

```text
REVIEW → VALID
```

### Record Deletion

Administrators can delete unwanted records through the dashboard.

A confirmation prompt is displayed before deletion to reduce accidental data removal.

## Database Design

The application uses MySQL for persistent data storage.

### `records` Table

| Column       | Type         | Description                                |
| ------------ | ------------ | ------------------------------------------ |
| `id`         | INT          | Auto-increment database identifier         |
| `unique_id`  | VARCHAR(100) | Unique identifier supplied with the record |
| `name`       | VARCHAR(150) | Record name                                |
| `email`      | VARCHAR(255) | Email address                              |
| `phone`      | VARCHAR(30)  | Optional phone number                      |
| `data_hash`  | VARCHAR(64)  | SHA-256 hash used for duplicate detection  |
| `status`     | ENUM         | `valid`, `duplicate`, or `review`          |
| `created_at` | TIMESTAMP    | Record creation timestamp                  |

The `unique_id` field is protected by a database-level uniqueness constraint.

The database `id` is an auto-increment identifier. Deleted IDs are not reused, which is expected behavior for database identifiers.

## API Documentation

The Flask backend exposes REST-style API endpoints for record management.

### Create Record

```http
POST /api/records
```

Creates a new record after validation and redundancy checks.

#### Request Body

```json
{
    "unique_id": "USR001",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210"
}
```

#### Possible Responses

**Successful record creation**

```json
{
    "status": "success",
    "message": "Record added successfully."
}
```

**Validation failure**

```json
{
    "status": "error",
    "errors": [
        "Unique ID is required."
    ]
}
```

**Duplicate**

```json
{
    "status": "duplicate",
    "message": "Duplicate record detected."
}
```

**Review**

```json
{
    "status": "review",
    "message": "Record requires review."
}
```

### Get Records

```http
GET /api/records
```

Returns the stored records ordered by database ID.

### Delete Record

```http
DELETE /api/records/<record_id>
```

Deletes a specific record from the database.

### Approve Review Record

```http
PATCH /api/records/<record_id>/approve
```

Changes a review record's status to `valid`.

## HTTP Status Codes

| Status Code | Meaning                                |
| ----------- | -------------------------------------- |
| `200`       | Request completed successfully         |
| `201`       | Record created successfully            |
| `400`       | Invalid input or validation failure    |
| `404`       | Requested record was not found         |
| `409`       | Duplicate or review condition detected |
| `500`       | Unexpected server-side error           |

## Installation

### Prerequisites

Make sure the following are installed:

* Python 3.x
* MySQL 8.x
* Git
* A modern web browser

### Clone the Repository

```powershell
git clone https://github.com/shaikh-abdul-basit436/DataRedundancySystem.git
cd DataRedundancySystem
```

### Create Virtual Environment

```powershell
python -m venv venv
```

Activate the virtual environment:

```powershell
.\venv\Scripts\Activate.ps1
```

### Install Dependencies

```powershell
pip install -r requirements.txt
```

## Database Configuration

Create a MySQL database named:

```text
data_redundancy_db
```

The application expects the database connection details to be provided through environment variables.

Create a `.env` file in the project root:

```env
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=data_redundancy_db
```

> **Security:** Never commit the `.env` file or expose database credentials in source control.

## Running the Application

Activate the virtual environment and start the Flask application:

```powershell
python run.py
```

The application will start on the local Flask development server.

Open the displayed local server address in your browser to access the dashboard.

## Usage

### Add a Record

1. Open the dashboard.
2. Enter the Unique ID.
3. Enter the name.
4. Enter the email address.
5. Optionally enter a phone number.
6. Submit the record.
7. The system validates and classifies the record.

### Handling a Duplicate

If an exact duplicate is detected, the system rejects the new record and displays a duplicate message.

### Handling a Review Record

If the email already exists but the complete record is not an exact duplicate:

1. The record is classified as `REVIEW`.
2. The record is stored for administrative review.
3. The administrator can select **Keep** to mark it as `VALID`.
4. The administrator can select **Delete** if the record should not be retained.

### Managing Existing Records

Administrators can:

* Search records.
* Filter by status.
* Review records.
* Keep review records.
* Delete records.
* Refresh the record list.

## Data Integrity Strategy

The system uses multiple layers of protection against redundant data:

```text
Input Validation
       ↓
Unique ID Constraint
       ↓
SHA-256 Exact Duplicate Detection
       ↓
Same-Email Review Detection
       ↓
Database Insertion
```

This layered approach prevents invalid and exact duplicate records from being inserted while allowing potentially related records to be reviewed manually.

## Security Considerations

The application follows several basic security practices:

* Database credentials are stored using environment variables.
* `.env` should not be committed to version control.
* Database operations are handled through SQLAlchemy.
* Input validation is performed before insertion.
* Unique IDs are protected by a database-level uniqueness constraint.
* Duplicate detection uses deterministic SHA-256 hashing.
* Administrative deletion requires user confirmation.

This project is intended as an educational/internship implementation and should undergo additional security hardening before production deployment.

## Testing and Verification

The implemented functionality can be verified using the following scenarios:

| Test Case                             | Expected Result                         |
| ------------------------------------- | --------------------------------------- |
| Valid new record                      | Record is stored as `VALID`             |
| Missing required field                | Validation error                        |
| Invalid email                         | Validation error                        |
| Invalid phone format                  | Validation error                        |
| Existing Unique ID                    | Duplicate request rejected              |
| Exact matching record                 | Duplicate request rejected              |
| Existing email with different details | Record marked `REVIEW`                  |
| Keep review record                    | Status changes to `VALID`               |
| Delete record                         | Record is removed after confirmation    |
| Search                                | Matching records are displayed          |
| Status filter                         | Records are filtered by selected status |

## Limitations

The current implementation has intentionally simple rule-based redundancy detection.

Current limitations include:

* Exact duplicate detection is based on normalized name, email and phone values.
* Same-email records are sent for manual review.
* The system does not perform semantic or fuzzy duplicate detection.
* The system does not use machine learning or AI for classification.
* Authentication and role-based authorization are not implemented.
* The application is designed primarily as an educational/internship project.

## Future Enhancements

Possible future improvements include:

* Fuzzy matching for similar names and contact details.
* Configurable duplicate detection rules.
* Authentication and role-based access control.
* Bulk CSV/Excel record import.
* Bulk duplicate analysis.
* Data quality reporting and dashboards.
* Audit logs for administrative actions.
* Pagination for large datasets.
* Advanced filtering and sorting.
* Production deployment with a secure WSGI server.
* Automated test coverage.

## Project Goals

The project demonstrates how a web-based system can improve data quality by combining:

* Input validation
* Unique identifier protection
* Hash-based duplicate detection
* Rule-based redundancy classification
* Database constraints
* Administrative review
* Record management

The primary objective is to prevent unnecessary duplicate data from entering the database while providing administrators with visibility and control over potentially redundant records.

## Learning Outcomes

Through this project, the following concepts were implemented and practiced:

* Flask application development
* REST API development
* MySQL database integration
* Flask-SQLAlchemy
* Database modeling
* Data validation
* SHA-256 hashing
* Duplicate detection
* Rule-based classification
* JavaScript API integration
* CRUD operations
* Environment-based configuration
* Git and GitHub project management

## Project Status

**Status: Completed**

The current version includes the core data validation, duplicate detection, redundancy review, database storage, search, filtering and administrative record-management functionality required for the project.

## Repository

**GitHub:**
https://github.com/shaikh-abdul-basit436/DataRedundancySystem

## License

This project was developed for educational and internship purposes.

## Acknowledgement

This project was developed as part of the **CodeAlpha Internship** to demonstrate practical implementation of data validation, redundancy detection, database management and web application development.
