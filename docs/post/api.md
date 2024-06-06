## Post API Spec

## Index

Endpoint : GET /api/posts

Response Body Success : 

```json
{
    "success": true,
    "data": [
        {
            "title": "Politic",
            "slug": "politic",
            "content" : "test",
            "user": {
                "username" : "test",
                "full_name" : "test",
                "version" : 0
            },
            "category" : {
                "name" : "test",
                "slug" : "test",
                "version" : "test"
            },
            "created_at" : "test",
            "version": 0,
            "id": "664872fc88c223723408d7eb"
        },
        {
            "title": "Politic",
            "slug": "politic",
            "content" : "test",
            "user": {
                "username" : "test",
                "full_name" : "test",
                "version" : 0
            },
            "category" : {
                "name" : "test",
                "slug" : "test",
                "version" : "test"
            },
            "created_at" : "test",
            "version": 0,
            "id": "664872fc88c223723408d7eb"
        },
        {
            "title": "Politic",
            "slug": "politic",
            "content" : "test",
            "user": {
                "username" : "test",
                "full_name" : "test",
                "version" : 0
            },
            "category" : {
                "name" : "test",
                "slug" : "test",
                "version" : "test"
            },
            "created_at" : "test",
            "version": 0,
            "id": "664872fc88c223723408d7eb"
        },
    ]
}
```

Response Body Error : 

```json
{
    "errors" : [
        {
            "message" : "Posst not found",
        }
    ]
}
```

## Show

Endpoint : GET /api/posts/:slug

Response Body Success : 

```json
{
    "success": true,
    "data": {
        "title": "Politic",
        "slug": "politic",
        "content" : "test",
        "user": {
            "username" : "test",
            "full_name" : "test",
            "version" : 0
        },
        "category" : {
            "name" : "test",
            "slug" : "test",
            "version" : "test"
        },
        "created_at" : "test",
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
            "message" : "Post not found"
        }
    ]
}
```

## Create

Endpoint : POST /api/posts

Headers :
- Content-Type : application/json,
- Cookie : exampleCookie

Request Body : 

```json
{
    "title" : "Sport",
    "content" : "test",
    "category_id" : "test",
    "user_id" : "test",
}
```

Response Body Success : 

```json
{
    "success": true,
    "data": {
        "title": "Politic",
        "slug": "politic",
        "content" : "test",
        "user": "test",
        "category" : "test",
        "created_at" : "test",
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
            "message" : "Category not found",
        },
        {
            "message" : "Post already exist"
        }
    ]
}
```

## Update

Endpoint : PUT /api/posts/:slug

Headers :
- Content-Type : application/json,
- Cookie : exampleCookie

Request Body : 

```json
{
    "title" : "Sport",
    "content" : "test",
    "category_id" : "test"
}
```

Response Body Success : 

```json
{
    "success": true,
    "data": {
        "title": "Politic",
        "slug": "politic",
        "content" : "test",
        "user": "test",
        "category" : "test",
        "created_at" : "test",
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
            "message" : "Post not found",
        },
        {
            "message" : "Post already exist"
        }
    ]
}
```

## Delete

Endpoint : DELETE /api/posts/:slug

Headers :
- Content-Type : application/json,
- Cookie : exampleCookie

Response Body Success : 

```json
{
    "success": true,
    "message": "Post successfully deleted",
    "data": {
        "title": "Politic",
        "slug": "politic",
        "content" : "test",
        "user": "test",
        "category" : "test",
        "created_at" : "test",
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
            "message" : "Post not found",
        }
    ]
}
```

## Get by user

Endpoint : GET /api/posts/user/:userId

Response Body Success : 

```json
{
    "success": true,
    "data": {
        "title": "Politic",
        "slug": "politic",
        "content" : "test",
        "user": {
            "username" : "test",
            "full_name" : "test",
            "version" : 0
        },
        "category" : {
            "name" : "test",
            "slug" : "test",
            "version" : "test"
        },
        "created_at" : "test",
        "version": 0,
        "id": "664872fc88c223723408d7eb"
    }
}
```

## Related post

Endpoint : GET /api/posts/related-posts/:postId/:userId/:categoryId

Response Body Success : 

```json
{
    "success": true,
    "data": [
        {
            "title": "Politic",
            "slug": "politic",
            "content" : "test",
            "user": {
                "username" : "test",
                "full_name" : "test",
                "version" : 0
            },
            "category" : {
                "name" : "test",
                "slug" : "test",
                "version" : "test"
            },
            "created_at" : "test",
            "version": 0,
            "id": "664872fc88c223723408d7eb"
        },
        {
            "title": "Politic",
            "slug": "politic",
            "content" : "test",
            "user": {
                "username" : "test",
                "full_name" : "test",
                "version" : 0
            },
            "category" : {
                "name" : "test",
                "slug" : "test",
                "version" : "test"
            },
            "created_at" : "test",
            "version": 0,
            "id": "664872fc88c223723408d7eb"
        },
        {
            "title": "Politic",
            "slug": "politic",
            "content" : "test",
            "user": {
                "username" : "test",
                "full_name" : "test",
                "version" : 0
            },
            "category" : {
                "name" : "test",
                "slug" : "test",
                "version" : "test"
            },
            "created_at" : "test",
            "version": 0,
            "id": "664872fc88c223723408d7eb"
        }
    ]
}
```












