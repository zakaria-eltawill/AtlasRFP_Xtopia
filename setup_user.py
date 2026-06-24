import requests

API_KEY = "AIzaSyB9p2VlbL35Q0TjjKvLc6qHt8IFqO7rfVU"
url = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={API_KEY}"

data = {
    "email": "Atlas@atlas.com",
    "password": "Welcome",
    "returnSecureToken": True
}

try:
    response = requests.post(url, json=data)
    result = response.json()
    if "error" in result:
        print(f"Error creating user: {result['error']['message']}")
    else:
        print(f"Successfully created user! UID: {result.get('localId')}")
except Exception as e:
    print(f"Exception: {e}")
