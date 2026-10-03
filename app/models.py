from .database import db

class Record(db.Model):
    __tablename__ = "records"

    id = db.Column(db.Integer, primary_key=True)
    unique_id = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(30))
    data_hash = db.Column(db.String(64), nullable=False)
    status = db.Column(db.Enum("valid", "duplicate", "review"), nullable=False, default="valid")
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())
