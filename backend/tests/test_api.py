import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "Backend Infrastructure Online", "version": "2.0.0"}

def test_login_invalid_credentials():
    response = client.post(
        "/api/auth/login",
        data={"username": "invalid@test.com", "password": "wrongpassword"}
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "Incorrect username or password"

def test_create_incident_validation_error():
    response = client.post(
        "/api/incidents/",
        json={"type": "fire"} # Missing required fields
    )
    assert response.status_code == 422 # Pydantic validation error
