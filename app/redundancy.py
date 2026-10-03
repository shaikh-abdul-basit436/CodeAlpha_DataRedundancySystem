from .validation import generate_data_hash

def classify_redundancy(existing_record, incoming_data):
    incoming_hash = generate_data_hash(incoming_data)

    if existing_record.data_hash == incoming_hash:
        return "duplicate"

    if existing_record.email.strip().lower() == incoming_data["email"].strip().lower():
        return "review"

    return "valid"
