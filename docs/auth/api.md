## Auth API Spec

## Sign Up

Endpoint : POST /api/users/signup

Headers :
- Content-Type : application/json

Request Body : 

```json
{
    "email" : "ayyub@gmail.com",
    "password" : "password",
    "username": "ayyub",
    "full_name": "Al Ayyubi Sidik"
}
```

Response Body Success : 

```json
{
    "success": true,
    "data": {
        "email": "messi@gmail.com",
        "username": "messi",
        "full_name": "Al Ayyubi Sidik",
        "role": "author",
        "access_status" : true,
        "created_at": "2024-05-18T09:07:43.655Z",
        "id": "66486fdf0c6aeba63144a2fd",
        "version": 0
    }
}
```

Response Body Error : 

```json
{
    "errors" : [
        {
            "message" : "Username is required",
            "field" : "username"
        },
        {
            "message" : "Email must be valid",
            "field" : "email"
        }
    ]
}
```

## Sign In

Endpoint : POST /api/users/signin

Headers :
- Content-Type : application/json

Request Body : 

```json
{
    "email" : "ayyub@gmail.com",
    "password" : "password"
}
```

Response Body Success : 

```json
{
    "success": true,
    "data": {
        "email": "messi@gmail.com",
        "username": "messi",
        "full_name": "Al Ayyubi Sidik",
        "role": "author",
        "access_status" : true,
        "created_at": "2024-05-18T09:07:43.655Z",
        "id": "66486fdf0c6aeba63144a2fd",
        "version": 0
    }
}
```

Response Body Error : 

```json
{
    "errors" : [
        {
            "message" : "Invalid credentials",
        },
        {
            "message" : "You have been blocked",
        }
    ]
}
```

## Sign out

Endpoint : POST /api/users/logout

Headers :
- Content-Type : application/json,
- Cookie : exampleCookie

Response Body Success : 

```json
{
    "success": true,
    "message": "User signed out successfully"
}
```

## Current User

Endpoint : GET /api/users/currentuser

Headers : 
- Cookie : exampleCookie

Response Body Success : 

```json
{
    "success": true,
    "data": {
        "id": "66486fdf0c6aeba63144a2fd",
        "email": "messi@gmail.com",
        "username" : "messi",
        "full_name" : "Messi",
        "role": "author",
    }
}
```

## Index / get all

Endpoint : GET /api/users

```json
{
    "success": true,
    "data": [
        {
            "id": "66486fdf0c6aeba63144a2fd",
            "email": "messi@gmail.com",
            "username" : "messi",
            "full_name" : "Messi",
            "access_status" : true,
            "role": "author",
            "version": 0
        },
        {
            "id": "66486fdf0c6aeba63144a2fd",
            "email": "ayyub@gmail.com",
            "username" : "ayyub",
            "full_name" : "Ayyub",
            "access_status" : true,
            "role": "author",
            "version": 0
        },
        {
            "id": "66486fdf0c6aeba63144a2fd",
            "email": "neymar@gmail.com",
            "username" : "neymar",
            "full_name" : "Neymar",
            "access_status" : true,
            "role": "author",
            "version": 0
        },
    ]
}
```

## Update

Endpoint : POST /api/users/update/:username

Headers :
- Content-Type : application/json,
- Cookie : exampleCookie

Request Body : 

```json
{
    "email" : "ayyub@gmail.com",
    "username" : "ayyub",
    "full_name" : "Ayyub"
}
```

Response Body Success : 

```json
{
    "success": true,
    "data": {
        "email": "messi@gmail.com",
        "username": "messi",
        "full_name": "Al Ayyubi Sidik",
        "role": "author",
        "access_status" : true,
        "created_at": "2024-05-18T09:07:43.655Z",
        "id": "66486fdf0c6aeba63144a2fd",
        "version": 0
    }
}
```

Response Body Error : 

```json
{
    "errors" : [
        {
            "message" : "User not found",
        },
        {
            "message" : "Username in use",
        }
    ]
}
```

## Change access status

Endpoint : POST /api/users/change-access-status/:username

Headers :
- Content-Type : application/json,
- Cookie : exampleCookie

Request Body : 

```json
{
    "access_status" : true,
}
```

Response Body Success : 

```json
{
    "success": true,
    "data": {
        "email": "messi@gmail.com",
        "username": "messi",
        "full_name": "Al Ayyubi Sidik",
        "role": "author",
        "access_status" : true,
        "created_at": "2024-05-18T09:07:43.655Z",
        "id": "66486fdf0c6aeba63144a2fd",
        "version": 0
    }
}
```

Response Body Error : 

```json
{
    "errors" : [
        {
            "message" : "User not found",
        },
        {
            "message" : "Username in use",
        }
    ]
}
```









