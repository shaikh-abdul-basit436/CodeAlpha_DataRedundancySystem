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
