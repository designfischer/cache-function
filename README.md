# API REST with Cache Function (Redis)
 API Rest NodeJS + Express + MongoDB + Redis (for caching responses)

## FEATURES & ENDPOINTS

### Creating a Book - POST

url/books

Body: {
    "bookTitle" (required),
    "bookAuthor" (required),
    "bookPublisher (required)
}

### Listing a Book - GET

url/books/:book_id

No-Body

### Replacing a Book - PUT

url/books/:book_id

Body: {
    "bookTitle" (required),
    "bookAuthor" (required),
    "bookPublisher (required)
}

### Updating a Book - PATCH

url/books/:book_id

Body: {
    "bookTitle" (optional),
    "bookAuthor" (optional),
    "bookPublisher (optional)
}

### Deleting a Book - DELETE

url/books/:book_id

No-Body

## CACHING

The API uses Redis to cache responses, enhancing its speed (10x +) and performance. 

Cache keys are configured to expire in 60 seconds.

Cache keys are set whenever a book is created, replaced or updated.

Cache keys are deleted whenever a book is deleted.

Cache keys are loaded (if existing) whenever a request is made to the List Book Endpoint

## .ENV CONFIG EXAMPLE

LOCAL_APP_PORT = XXXX

LOCAL_REDIS_PORT = XXXX

LOCAL_REDIS_HOST = XXXX

DB_URI = database_url_string