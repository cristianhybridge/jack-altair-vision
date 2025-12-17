import os
import tempfile

from flask import Blueprint, request, jsonify
from deepface import DeepFace

FACES_DIR = ".\\storage\\faces\\"

face_detection_bp = Blueprint("face-detection", __name__)
@face_detection_bp.post("/verify/<int:userId>")
def verify_face(userId):
    MIN_CONFIDENCE = 80.00
    
    print(f"userId: {userId}")
    requesterFace = request.files["requester-face"]
    db_face_path = os.path.join(FACES_DIR, f"img-{userId}.jpg")
    print(f"db_face_path: {db_face_path}")
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

        if result["verified"] and result["confidence"] > MIN_CONFIDENCE:
            return jsonify({"verified": True}), 200
        else:
            return jsonify({
                "verified": False,
                "confidence": result.get("confidence"),
                "error": "Face verification failed"
            }), 401

    except ValueError as e:
        return jsonify({
            "verified": False,
            "error": str(e)
        }), 400

    finally:
        os.remove(temp_path)