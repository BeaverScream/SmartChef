@echo off
echo Starting SmartChef backend...
start cmd /k "cd backend && python app.py"

echo Starting SmartChef frontend...
start cmd /k "cd frontend && npm run dev"

echo Both backend and frontend have been started.
pause