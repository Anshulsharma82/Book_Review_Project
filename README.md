# 📚 Book Review API
A RESTful Node.js application to manage books, reviews, and user authentication using JWT. Includes features like user registration/login, book CRUD, review system, and filtered search.

##  Project setup instructions
### 1. Clone the repository
```bash
git clone https://github.com/Anshulsharma82/Book_Review_Project.git
cd Book_Review_Project
```
### 2. Install Dependencies
```bash
npm i 
```

### 3. Setup Environment Variables
Create a .env file in the root of your project and add the following:
```bash
PORT = 3000
JWT_SECRET_TOKEN = 'secret-jwt-token'
DB_URL = mongodb://localhost:27017/book-review-db
```
## How to run locally
### 1. Start the server
```bash
npm run start
```

## Example API requests

### 1. Register a user
**Request Method**: `POST`
 **Request URL**:  `http://localhost:3000/signup`
**Request Body**:
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 2. Login
**Request Method**: `POST`
 **Request URL**:  `http://localhost:3000/login`
**Request Body**:
```json
{
  "username": "Anshul5",
  "password": "Test123@"
}
```

### 3. Create Book
**Request Method**: `POST`
 **Request URL**:  `http://localhost:3000/books`
**Request Body**:
```json
{
  "title": "Book1",
  "genre": "Horror",
  "content": "Book Content"
}
```

### 4. Add review to a book
**Request Method**: `POST`
 **Request URL**:  `http://localhost:3000/books/682c1947e186a53edfaeee95/reviews`
**Request Body**:
```json
{
    "rating": 4,
    "review": "Good book."
}
```

### 5. Fetch all books
**Request Method**: `GET`
**Request URL**: `http://localhost:3000/books?author=Anshul Sharma&page=2&genre=Comedy`

### 6. Fetch book by Id
**Request Method**: `GET`
**Request URL**: `http://localhost:3000/books/682c1947e186a53edfaeee95`

### 7. Update Review
**Request Method**: `PUT`
**Request URL**:  `http://localhost:3000/review/682c1947e186a53edfaeee95`
**Request Body**:
```json
{
    "review": "updated content"
}
```

### 8. Delete Review
**Request Method**: `DELETE`
**Request URL**:  `http://localhost:3000/review/682c1947e186a53edfaeee95`

### 9. Search
**Request Method**: `GET`
**Request URL**:  `http://localhost:3000/search?title=book2&author=Anshul`


## Design Decision

The Signup API (POST /signup) accepts name, username, email, phoneNumber, and password in the request body to register a new user. Each book created is linked to the user who added it by storing a reference to the user in the book document. Similarly, when a user adds a review, it is linked to both the corresponding book and the user by referencing their IDs. Upon review creation, the review ID is pushed into the reviews array of both the book and the user. When a review is deleted, its ID is pulled from both the user and the book documents to maintain consistency.

## Schema Design 

### 1. User Schema

name: String (required)
username: String (required, unique)
email: String (required, unique, email format)
phoneNumber: Number (required)
password: String (minLength: 8)
reviewIds: Array of ObjectIds referencing reviews the user has submitted
bookIds: Array of ObjectIds referencing books created by the user
timestamps: Automatically adds createdAt and updatedAt

### 2. Book schema

title: String (required)
author: String (required)
genre: String (required)
content: String (required)
reviewIds: Array of ObjectIds referencing related reviews
createdBy: ObjectId referencing the user who created the book
timestamps: Automatically adds createdAt and updatedAt

### 3. Review Schema

review: String (required)
rating: Number (required)
bookId: ObjectId referencing the book being reviewed
userId: ObjectId referencing the user who wrote the review
timestamps: Automatically adds createdAt and updatedAt

### Relationships

A user can create multiple books and reviews.
A book is created by a single user and can have many reviews.
A review belongs to one user and one book.
When a review is added or removed, its ID is pushed/pulled from both the associated user's and book's document arrays (reviewIds).