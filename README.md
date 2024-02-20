# Smartphone Management System

## Uses Technology:

This project is a basic Node.js Express application with MongoDB for smartphone management. It provides RESTful APIs for creating, retrieving, updating smartphone, and selling smartphone.
At first i have handle global error using Express middleware and there handled Zod and Mongoose validation error. I have use Zod for validation. Authentication and authorization using jwt , and bcryptjs used for password hashing.

### Objective:

The primary objective of the Smartphone Management Dashboard is to provide a comprehensive tool for efficiently managing smartphone inventory, tracking sales, and analyzing sales history. The dashboard incorporates features such as authentication, CRUD operations, state management, real-time UI updates, and advanced smartphone filtering.

Authentication:
Users are required to register and log in to access the dashboard securely. JSON Web Tokens (JWT) are used for authentication. The system currently has 3 different role such as Admin, Branch Manager and Seller,
The admin have all access to control this web application.
Branch Manager have to control product management like add, update, and delete.
And the last one is seller seller have just product selling access
representing a user responsible for managing the smartphone inventory.

# Functionality:

## User Management: (For Admin)

### CRUD Operations:

- Create Branch Manger
- Update Branch Manger
- Delete Branch Manger
- Create Seller
- Update Seller
- Delete Seller

## Smartphone Management: (For Branch Manager)

### CRUD Operations:

- Add a new smartphone to the inventory.
- Delete existing smartphones from the inventory.
- Update smartphone details.

* Enable users to efficiently manage their inventory by implementing a bulk delete feature for smartphones.
* Implement a "Duplicate & Edit" or "Create Variant" feature.
* Branch manager can duplicate an existing product and make modifications to create a new one.

## Smartphone Management: (For Seller)

### CRUD Operations:

- Seller can Sell products.
- Read and view the list of smartphones in the inventory

### Install Dependencies / Dependencies that i have used

1. express // for server creation
   - npm install express
2. mongoose // Mongoose ODM for connection building with mongoDB
   - npm install mongoose
3. zod // For validation users data
   - npm install zod
4. cors // helps you handle CORS-related issues when making requests from different domains
   - npm install cors
5. dotenv // For env variables
   - npm install dotenv
6. bcryptjs // for secure password
   - npm install bcryptjs
7. JWT or jsonwebtoken // for authentication and authorization
   - npm install jsonwebtoken
8. prettier // For code formation
   - npm install --save-dev prettier
9. eslint // For linting code

- npx eslint --init // config eslint
  - You can setup eslint and prettier from here https://blog.logrocket.com/linting-typescript-eslint-prettier/

### API DOCUMENTATION LINK

- URL- https://documenter.getpostman.com/view/24264729/2sA2r824DT

### LIVE URL

- SERVER - URL- https://sellsmanagement.vercel.app/
- CLIENT - URL- https://loquacious-horse-20d902.netlify.app/

### User Management // api

### i. Create Manager

- POST http://localhost:5000/api/v1/user/create-manager

```
Authorization: <ADMIN_JWT_TOKEN>
```

```json
// in below i am sharing a json data formate for register user
{
  "password": "123456789",
  "manager": {
    "name": {
      "firstName": "John",
      "middleName": "Doe",
      "lastName": "Smith"
    },
    "gender": "male",
    "dateOfBirth": "1990-01-01",
    "email": "johnManager@example.com",
    "contactNo": "1234567890",
    "emergencyContactNo": "0987654321",
    "bloodGroup": "A+",
    "presentAddress": "123 Main St, City, Country",
    "permanentAddress": "456 Park Ave, Town, Country",
    "branchName": "Main Branch",
    "branchLocation": "City Center"
  }
}
```

### ii. Create Seller

- POST http://localhost:5000/api/v1/user/create-seller

```
Authorization: <ADMIN_JWT_TOKEN>
```

```json
// in below i am sharing a json data formate for login user
{
  "password": "59824857",
  "seller": {
    "name": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "gender": "male",
    "email": "johndoeSeller2@example.com",
    "contactNo": "1234567890",
    "emergencyContactNo": "9876543210",
    "location": {
      "country": "USA",
      "city": "New York",
      "home": "123 Main St"
    }
  }
}
```

### Product Management // api

### i. For include a product in inventory

- POST http://localhost:5000/api/v1/product

```
Authorization: <ADMIN_JWT_TOKEN or MANAGER_JWT_TOKEN>
```

```json
// in below i am sharing a json data formate for creating course
{
  "product_name": "Smartphone B",
  "product_image": "https://i.ibb.co/Y3X3PT3/Samsung-Galaxy-S24-Ultra-grey-new.webp",
  "price": 17000,
  "quantity": 50,
  "release_date": "2022-01-15",
  "brand": "BrandX",
  "model": "Model123",
  "operating_system": "Android",
  "storage_capacity": "128GB",
  "screen_size": "6.5 inches",
  "battery_type": "Li-ion",
  "colors": "Black",
  "display_resolution": "1080x2400",
  "material": "Metal and Glass",
  "network": "4G",
  "manager": "65b2917331a723346bfab71e",
  "ram": "8GB",
  "camera_quality": "Triple camera setup",
  "battery_life": "Up to 24 hours"
}
```

### 2. Update Product

- PATCH http://localhost:5000/api/v1/product/:id

```
Authorization: <ADMIN_JWT_TOKEN or MANAGER_JWT_TOKEN>
```

```json
{
  "product_name": "Smartphone B",
  "price": 17000,
  "quantity": 50,
  "release_date": "2022-01-15",
  "brand": "BrandX",
  "model": "Model123",
  "operating_system": "Android",
  "storage_capacity": "128GB",
  "screen_size": "6.5 inches",
  "battery_type": "Li-ion",
  "colors": "Black",
  "display_resolution": "1080x2400",
  "material": "Metal and Glass",
  "network": "4G"
}
```

### 3. Get Product

- GET http://localhost:5000/api/v1/product

```
Authorization: <ADMIN_JWT_TOKEN And MANAGER_JWT_TOKEN and SELLER_JWT_TOKEN>
```

```json
Response:
{
    "success": true,
    "message": "all products  retrieve successfully",
    "data": {
        "meta": {
            "page": 1,
            "limit": 5,
            "total": 14
        },
        "result": [

            {
                "status": "in-stock",
                "isDelete": false,
                "_id": "65b890b351beca4e32def4a1",
                "product_name": "Google Pixel 8 Pro",
                "price": 102999,
                "quantity": 130,
                "release_date": "2024-01-14",
                "brand": "Google",
                "model": "Google Pixel 8 Pro",
                "operating_system": "Android",
                "storage_capacity": "256GB",
                "screen_size": "6.5 inches",
                "battery_type": "Li-ion",
                "colors": "White",
                "display_resolution": "1080x2400",
                "material": "Gorilla Glass Armor front, Gorilla Glass back, titanium frame",
                "network": "4G",
                "manager": {
                    "_id": "65b2917331a723346bfab71e",
                    "name": "Mahin",
                    "email": "mdmahin1310@gmail.com",
                    "isDeleted": false,
                    "role": "user",
                    "status": "in-progress",
                    "createdAt": "2024-01-25T16:50:59.422Z",
                    "updatedAt": "2024-01-25T16:50:59.422Z",
                    "__v": 0
                },
                "ram": "8GB",
                "camera_quality": "Triple camera setup",
                "battery_life": "Up to 24 hours",
                "product_image": "https://www.mobiledokan.com/wp-content/uploads/2023/09/Google-Pixel-8-Pro-white.webp",
                "updatedAt": "2024-01-30T06:12:05.347Z"
            },
        ]
    }
}
```

### 4. Bulk Delete Or Single Delete product

- DELETE http://localhost:5000/api/v1/product

```
Authorization: <ADMIN_JWT_TOKEN And MANAGER_JWT_TOKEN>
```

```json
{
  "ids": [
    "65b63b0e0aba671a4ed1c7c2",
    "65b63b610aba671a4ed1c7ca",
    "65b63c290aba671a4ed1c7d9"
  ]
}
```

### Sells Management

### 1. Sell Product

- POST http://localhost:5000/api/v1/seles

```
Authorization: <SELLER_JWT_TOKEN>
```

```json
{
  "nameOfBuyer": "Jamal Bhuiyan",
  "sellerId": "65b5531d57544485bac2d32c",
  "productId": "65b52d85d3fb2ecf7b789089",
  "selsDate": "January 16th, 2024",
  "quantity": 20
}
```

### 1. Get Sells Product

- GET http://localhost:5000/api/v1/seles?monthly=monthly

```
Authorization: <SELLER_JWT_TOKEN>
```

```json
{
  "nameOfBuyer": "Jamal Bhuiyan",
  "sellerId": "65b5531d57544485bac2d32c",
  "productId": "65b52d85d3fb2ecf7b789089",
  "selsDate": "January 16th, 2024",
  "quantity": 20
}
```

### Branch Management

### 1. Create Branch

- POST http://localhost:5000/api/v1/branch

```
Authorization: <ADMIN_JWT_TOKEN>
```

```json
{
  "branchName": "Somthing",
  "branchLocation": "Somthing"
}
```

### 1. Get Branch

- GET http://localhost:5000/api/v1/branch

```
Authorization: <ADMIN_JWT_TOKEN>
```

```json
{
  "success": true,
  "message": "successfully get all branches",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 2,
    "totalPage": 1
  },
  "data": [
    {
      "_id": "65d1dbcc3bf5b9439a1db2c4",
      "branchName": "Out Door",
      "branchLocation": "Bhuapur",
      "isDeleted": false,
      "createdAt": "2024-02-18T10:28:28.951Z",
      "updatedAt": "2024-02-18T10:28:28.951Z",
      "__v": 0
    },
    {
      "_id": "65d1dc603bf5b9439a1db2ca",
      "branchName": "Simone Telicome",
      "branchLocation": "Tangail",
      "isDeleted": false,
      "createdAt": "2024-02-18T10:30:56.620Z",
      "updatedAt": "2024-02-18T10:30:56.620Z",
      "__v": 0
    }
  ]
}
```
