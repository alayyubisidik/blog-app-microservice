## Categories API Spec

## Create

Endpoint : POST /api/categories

Headers :
- Content-Type : application/json,
- Cookie : exampleCookie

Request Body : 

```json
{
    "name" : "Sport",
}
```

Response Body Success : 

```json
{
    "success": true,
    "data": {
        "name": "Politic",
        "slug": "politic",
        "version": 0,
        "id": "664872fc88c223723408d7eb"
    }
}
```

Response Body Error : 

```json
{
    "errors" : [
        {
            "message" : "Name is required",
            "field" : "name"
        },
        {
            "message" : "Category already exist"
        }
    ]
}
```

## Update

Endpoint : PUT /api/categories/:slug

Headers :
- Content-Type : application/json,
- Cookie : exampleCookie

Request Body : 

```json
{
    "name" : "Sport",
}
```

Response Body Success : 

```json
{
    "success": true,
    "data": {
        "name": "Politic",
        "slug": "politic",
        "version": 0,
        "id": "664872fc88c223723408d7eb"
    }
}
```

Response Body Error : 

```json
{
    "errors" : [
        {
            "message" : "Name is required",
            "field" : "name"
        },
        {
            "message" : "Category already exist"
        }
    ]
}
```

## Show

Endpoint : GET /api/categories/:slug

Response Body Error : 

```json
{
    "errors" : [
        {
            "message" : "Category not found"
        }
    ]
}
```

## Index

Endpoint : GET /api/categories

Response Body Success : 

```json
{
    "success": true,
    "data": [
        {
            "name": "Politic",
            "slug": "politic",
            "version": 0,
            "id": "664872fc88c223723408d7eb"
        },
        {
            "name": "Economy",
            "slug": "economy",
            "version": 0,
            "id": "664872fc88c223723408d7eb"
        },
        {
            "name": "Sport",
            "slug": "sport",
            "version": 0,
            "id": "664872fc88c223723408d7eb"
        },
    ]
}
```

## Delete

Endpoint : DELETE /api/categories/:slug

Headers :
- Content-Type : application/json,
- Cookie : exampleCookie

Response Body Success : 

```json
{
    "success": true,
    "message": "Category successfully deleted",
    "data": {
        "name": "Politic",
        "slug": "politic",
        "version": 0,
        "id": "664872fc88c223723408d7eb"
    }
}
```

Response Body Error : 

```json
{
    "errors" : [
        {
            "message" : "Category not found"
        }
    ]
}
```
