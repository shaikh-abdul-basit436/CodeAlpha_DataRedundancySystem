from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
from .database import db
from .models import Record
from .validation import validate_record, generate_data_hash
from .redundancy import classify_redundancy
import os
from urllib.parse import quote_plus

load_dotenv()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"mysql+pymysql://{os.getenv('DB_USER')}:{quote_plus(os.getenv('DB_PASSWORD', ''))}"
    f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/records", methods=["POST"])
def create_record():
    data = request.get_json(silent=True) or {}

    errors = validate_record(data)

    if errors:
        return jsonify({"status": "error", "errors": errors}), 400

    unique_id = data["unique_id"].strip()
    email = data["email"].strip().lower()

    if Record.query.filter_by(unique_id=unique_id).first():
        return jsonify({
            "status": "duplicate",
            "message": "A record with this unique ID already exists."
        }), 409

    incoming_hash = generate_data_hash(data)

    if Record.query.filter_by(data_hash=incoming_hash).first():
        return jsonify({
            "status": "duplicate",
            "message": "An identical record already exists."
        }), 409

    existing_by_email = Record.query.filter_by(email=email).first()

    if existing_by_email:
        classification = classify_redundancy(existing_by_email, data)

        if classification == "review":
            return jsonify({
                "status": "review",
                "message": "A record with the same email already exists and requires review."
            }), 409

    record = Record(
        unique_id=unique_id,
        name=data["name"].strip(),
        email=email,
        phone=data.get("phone", "").strip(),
        data_hash=incoming_hash,
        status="valid"
    )

    db.session.add(record)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Record stored successfully.",
        "record_id": record.id
    }), 201

@app.route("/api/records", methods=["GET"])
def get_records():
    records = Record.query.order_by(Record.id.desc()).all()

    return jsonify({
        "status": "success",
        "records": [
            {
                "id": record.id,
                "unique_id": record.unique_id,
                "name": record.name,
                "email": record.email,
                "phone": record.phone,
                "status": record.status,
                "created_at": record.created_at.strftime("%Y-%m-%d %H:%M:%S") if record.created_at else None
            }
            for record in records
        ]
    })


@app.route("/api/records/<int:record_id>", methods=["DELETE"])
def delete_record(record_id):
    record = Record.query.get(record_id)

    if not record:
        return jsonify({
            "status": "error",
            "message": "Record not found."
        }), 404

    db.session.delete(record)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Record deleted successfully."
    })

@app.route("/api/records/<int:record_id>/approve", methods=["PATCH"])
def approve_record(record_id):
    record = Record.query.get(record_id)

    if not record:
        return jsonify({
            "status": "error",
            "message": "Record not found."
        }), 404

    record.status = "valid"
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Record marked as valid."
    })
if __name__ == "__main__":
    app.run(debug=True)

