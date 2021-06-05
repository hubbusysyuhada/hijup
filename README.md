# Hijup Application
- A Javascript based server to manage hijup e-commerce
- By Muhammad Hafidz Hubbusysyuhada as Assessment Project for Hijup
- Git repository : https://github.com/hubbusysyuhada/hijup
- Heroku server : https://hijup.herokuapp.com
  
# Features :
 - CRUD for products
 - Create Order Item with code/token will automatically and randomly generated
 - Read all ordered items placed by user/client
 - Add or remove 1 quantity of certain item from items ordered by user/client
 - Remove 1 item from order placed
 - Empty the order/cart

 # Back End Tech Stack
 - Cors
 - Dotenv
 - Express
 - PostgreSQL
 - Sequelize
 - Sequelize CLI

# REST API endpoints
  
## GET /
> Get the home page
  
Response (200 - success case)
```json
"Welcome to Hijup"
```

## GET /products
> Get all products sold by Hijup
  
Response (200 - success case)
```json
[
    {
        "id": <given id by system>,
        "name": <product name>
    },
    {
        "id": <given id by system>,
        "name": <product name>
    }
]
```

Response (500 - internal server error)
```json
    {"message" : "internal server error"}
```

## GET /product/:id
> Get certain product sold by Hijup defined by id
  
Request Params
```json
{
    "id": <product id>
}
```

Response (200 - success case)
```json
{
    "id": <given id by system>,
    "name": <product name>
}
```

Response (404 - not found)
```json
    {"message" : "not found"}
```

## POST /product
> Post a new product into database

Request Body
```json
{
    "name": <product name given by user/client>
}
```
  
Response (201 - success case)
```json
{
    "id": <given id by system>,
    "name": <product name>,
    "updatedAt": <timestamp given by system>,
    "createdAt": <timestamp given by system>
}
```

Response (400 - bad request)
```json
    {"message" : "bad request"}
```

## PUT /product/:id
> Update a product in database defined by id

Request Body
```json
{
    "name": <product name given by user/client>
}
```

Request Params
```json
{
    "id": <product id>
}
```
  
Response (200 - success case)
```json
{
    "id": <given id by system>,
    "name": <product name>,
    "createdAt": <timestamp given by system>,
    "updatedAt": <timestamp given by system>
}
```

Response (400 - bad request)
```json
    {"message" : "bad request"}
```

Response (404 - not found)
```json
    {"message" : "not found"}
```

## DELETE /product/:id
> Delete a product in database defined by id

Request Params
```json
{
    "id": <product id>
}
```
  
Response (200 - success case)
```json
{
    "message" : "delete success"
}
```

Response (404 - not found)
```json
    {"message" : "not found"}
```

## GET /order
> Get all items ordered by user/client
  
Response (200 - success case)
```json
[
    {
        "ProductName": <product name>,
        "ProductId": <product id>,
        "Quantity": <number of this item ordered>,
        "OrderCodeList": [
            <token/order code given automatically by system>
        ]
    }
]
```

Response (500 - internal server error)
```json
    {"message" : "internal server error"}
```

## POST /order
> Place new order of items into ordered items
  
Request Body
```json
{
    "ProductId" <product id separate with commas if more than 1>
}
```

Response (201 - success case)
```json
{
    "message": "order created successfully"
}
```

Response (400 - bad request)
```json
    {"message" : "bad request"}
```

## DELETE /order/:id
> Reduce the quantity by 1 of current Items Ordered defined by id

Request Params
```json
{
    "id" <product id>
}
```

Response (200 - success case)
```json
{
    "message": "Product id no. <product id> quantity minus by 1 successfully"
}
```

Response (404 - not found)
```json
    {"message" : "not found"}
```

## DELETE /order/clear/:id
> Remove items defined by id from ordered items list

Request Params
```json
{
    "id" <product id>
}
```

Response (200 - success case)
```json
{
    "message": "Product id no. <product id> is now removed from order item list"
}
```

Response (404 - not found)
```json
    {"message" : "not found"}
```

## DELETE /order
> Remove all and empty ordered items list


Response (200 - success case)
```json
{
    "message": "Successful empty order list"
}
```

Response (500 - internal server error)
```json
    {"message" : "internal server error"}
```