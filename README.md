# Expense-Tracker-API

## Installation
1. Clone the repository
 - git clone https://github.com/chakritrr/Expense-Tracker-API.git
 - cd Expense-Tracker-API
2. Install dependencies
 - npm install

## Running the Application
 - npm run start
 - http://localhost:3000 || Port in file .env

# API Documentation

## Swagger Documentation
- http://localhost:3000/doc

## Postman Collection
1. ดาวน์โหลดไฟล์ Collection
 - docs/postman/expense-tracker-api.postman_collection.json
2. นำเข้า Collection ใน Postman
 - เปิด Postman
 - คลิก "Import"
 - ลาก หรือ เลือกไฟล์ Collection ที่ดาวน์โหลด
3. ตั้งค่า Environment Variables ใน Collection 
 - BASE_URL: http://localhost:3000/api
 - เรียกใช้งาน BASE_URL ใน request path ด้วย {{base_url}}/v1/expense

## Authentication

| Endpoint                            | Method | Description        | Body                                                 |
|-------------------------------------|--------|--------------------|------------------------------------------------------|
| `/api/v1/login`                     | POST   | Login user         | `{ "email": "tam@tam", "password": "1234" }`         |
| `/api/v1/register`                  | POST   | Register user      | `{ "email": "tam@tam", "password": "1234" }`         |


## Expense

| Endpoint                            | Method | Description                           | Body                                                                                                    |
|-------------------------------------|--------|---------------------------------------|---------------------------------------------------------------------------------------------------------|
| `/api/v1/expense`                   | POST   | Create expense                        | `{"title": "Conserto de carro", "amount": 80.00,"category": "Food","notes": "test"}`                    |
| `/api/v1/expense`                   | GET    | Get expense list                      | None                                                                                                    |
| `/api/v1/expense/:id`               | PATCH  | Update expense by ID                  | `{"title": "Conserto de carro", "amount": 50.00,"category": "Food","notes": "test"}`                    |
| `/api/v1/expense/:id`               | DELETE | Delete expense by ID                  | None                                                                                                    |
| `/api/v1/expense/report`            | POST   | Get expense report of total expenses  | `{"startDate": "2024-10-28", "endDate": "2024-11-02"}`                                                  |
| `/api/v1/expense/filter`            | POST   | Get expense list filter date          | `{"startDate": "2024-10-28", "endDate": "2024-11-02", "category": "limentação"}`                        |
| `/api/v1/expense/paging`            | POST   | Get pagination for listing expenses   | `{"startDate": "2024-10-28", "endDate": "2024-11-02", "category": "limentação", "page": 1, "limit": 10}`|

## Testing
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Generate test coverage report
npm run test:coverage


