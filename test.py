import requests, json

headers = {
    "Content-Type": "application/json"
}

data = json.dumps({
  "patient": "Hello",
  "medication": "Generic",
})


response = requests.post("http://127.0.0.1:5001/dose", data=data, headers=headers)
response = requests.get("http://127.0.0.1:5001/getAllDoses", headers=headers)
# response = requests.get("http://127.0.0.1:5001/dose/5", headers=headers)

print(response.status_code)
print(response.text)