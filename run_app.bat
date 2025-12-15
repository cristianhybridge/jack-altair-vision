@echo off
REM Activate Python virtual environment
call backend\.venv\Scripts\activate

REM Start Flask backend
start cmd /k "cd backend && python app.py"

REM Start React frontend
cd frontend
npm run dev