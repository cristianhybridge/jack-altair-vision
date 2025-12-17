from routes.face_detection_routes import face_detection_bp

from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app, supports_credentials=True)

app.register_blueprint(face_detection_bp, url_prefix="/api/face-detection")

@app.route("/")
def home():
    return "Welcome to Jack Assistant. API Running..."

if __name__ == "__main__":
    # app.run(debug=True)
    app.run(host="0.0.0.0", port=5000, debug=True)