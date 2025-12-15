import os
import tempfile

from flask import Blueprint, request, jsonify
from deepface import DeepFace

FACES_DIR = ".\\storage\\faces\\"

face_detection_bp = Blueprint("face-detection", __name__)
@face_detection_bp.post("/verify/<int:userId>")
def verify_face(userId):
    print(f"userId: {userId}")
    requesterFace = request.files["sample_face"]
    db_face_path = os.path.join(FACES_DIR, f"img-{userId}.jpg")
    print(f"db_face_path: {db_face_path}")
    sample_face_path = os.path.join(FACES_DIR, f"sample_face.jpg")
    print(f"sample_face_path: {sample_face_path}")
    if not os.path.exists(db_face_path):
        return jsonify({"error": "User face doesn't exist"}), 404

    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp:
        requesterFace.save(temp.name)
        temp_path = temp.name

    try:
        result = DeepFace.verify(
            img1_path=db_face_path,
            # img2_path=sample_face_path,
            img2_path=temp_path,
            model_name="ArcFace",
            detector_backend="retinaface",
            enforce_detection=True
        )
        return jsonify(result)

    finally:
        print("OK")