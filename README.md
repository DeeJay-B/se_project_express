# WTWR (What to Wear?): Back End
The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.
## Running the Project
`npm run start` — to launch the server 

`npm run dev` — to launch the server with the hot reload feature

### Testing
Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12


#### Features
Express-based server

MongoDB database integration

User authentication and authorization

CRUD operations for users and clothing items

Error handling and validation

API routes and controllers

# API Endpoints

## Users

GET /users - Get all users

GET /users/:userId - Get a user by ID

POST /users - Create a new user

### Clothing Items

GET /items - Get all items

POST /items - Create a new item

DELETE /items/:itemId - Delete an item by ID

#### Likes

PUT /items/:itemId/likes - Like an item

DELETE /items/:itemId/likes - Unlike an item

##### Error Handling

400 - Invalid data passed

404 - Resource not found

500 - Server error
