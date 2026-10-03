import hashlib
import re

def validate_record(data):
    errors = []

    unique_id = str(data.get("unique_id", "")).strip()
    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    phone = str(data.get("phone", "")).strip()

    if not unique_id:
        errors.append("Unique ID is required.")

    if not name:
        errors.append("Name is required.")

    if not email:
        errors.append("Email is required.")
    elif not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email):
        errors.append("Invalid email format.")

    if phone and not re.fullmatch(r"[0-9+\-\s()]{7,20}", phone):
        errors.append("Invalid phone format.")

    return errors


def generate_data_hash(data):
    normalized = "|".join([
        str(data.get("name", "")).strip().lower(),
        str(data.get("email", "")).strip().lower(),
        str(data.get("phone", "")).strip()
    ])

    return hashlib.sha256(normalized.encode("utf-8")).hexdigest()
