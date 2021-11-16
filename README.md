## Dice game - API Node server + JWT + MySQL + MongoDB
Dependency injection, DDD and some hexagonal pattern.  
Separate business logic and persistence in database

To test these routes, have the Postman log in the repo: "REST_API_JWT_MONGODB.postman_collection", "REST_API_JWT_MYSQL.postman_collection"  
You can use the same paths for both ORMs, but using the mongo and mysql id and not a uuid, these are very different. This way, you don't need to be changing a lot of the data in the example.  
You can import it into Postman.

## How to run

Commands:
```
npm start
```
Initialize the server with nodemon and connection to mongodb database by default.
```
npm run mysql
```
Initialize the server with nodemon and connection to mysql database.
```
npm run mongo
```
Initialize the server with nodemon and connection to mongodb database.

Scripts autorun:
```json
    "scripts": {
        "start": "nodemon api/app.js",
        "mysql": "set DB_ENV=MYSQL& nodemon api/app.js",
        "mongo": "set DB_ENV=MONGO& nodemon api/app.js"
    },
```

## Configuration


In the root directory there is the .env file, in which you have to replace the values ​​of the global variables with your own.  
You can make use of a single database. No need to enter mongo and mysql data simultaneously. Make sure you run the correct command.
```
MYSQL_DB=test
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=1234
MYSQL_PORT=3306
MONGO_DB=api
MONGO_HOST=localhost
MONGO_PORT=27017
ACCESS_TOKEN_SECRET=HELLOWORLD
```

## How to use

### Endpoints  
---
### `Create a player - POST`  
```
http://localhost:3000/api/players/
```
Server receives a json with a "username" field and the player's username as value.  
Example: 

```json
{
    "username" : "Cristian"
}
```
If everything goes well, server returns: 
```json
{
    "id": "61354cab0ef7bc872876e918",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTM1NGNhYjBlZjdiYzg3Mjg3NmU5MTgiLCJ1c2VybmFtZSI6IkNyaXN0aWFuIiwiaWF0IjoxNjMwODgyOTg3LCJleHAiOjE2MzA5NjkzODd9.x9gc-w4TULgo0zS1l5kMQmxsQCs2_T2JiS2qHQAuyC0"
}
```
A token with an expiration day and the id, **in our case it is important save it, because we are not use a password**  

If the user exists, server returns: 

```json
{
    "error": "Username 'Cristian' already exist in the system!"
}
```
---
### `Get players - GET - Protected route` 
```
http://localhost:3000/api/players
```

You need to use token as authorization

If the token is valid, server returns a player list. Only username and successRate of them.

```json
[
    {
        "username": "Cristian2",
        "successRate": 0
    },
    {
        "username": "Cristian3",
        "successRate": 0
    },
    {
        "username": "Cristian",
        "successRate": 0
    }
]
```
---
### `Get player by Id - GET - Protected route` 

```
http://localhost:3000/api/players/61354cab0ef7bc872876e918
```
You need to use token as authorization

**Only the player with his own token will be able to view his spins**  
If the token is valid and belongs to the player id, server returns:

```json
{
    "_id": "61354cab0ef7bc872876e918",
    "username": "Cristian",
    "games": [
        {
            "_id": "61354fbe0ef7bc872876e91e",
            "diceOne": 3,
            "diceTwo": 6,
            "result": 9,
            "won": 0
        },
        {
            "_id": "61354fc40ef7bc872876e921",
            "diceOne": 4,
            "diceTwo": 1,
            "result": 5,
            "won": 0
        },
        {
            "diceOne": 4,
            "diceTwo": 3,
            "result": 7,
            "won": 1
        }
    ],
    "success_rate": 0.3333333333333333
}
```
---
### `Update player by id - PUT - Protected route` 
```
http://localhost:3000/api/players/61354cab0ef7bc872876e918
```

You need to use token as authorization.  
**Only the player with his own token will be able to change his username**  
Server receives a json with a "username" field and the player's username
```
{
    "username" : "Cristian4"
}
```
If the token is valid and belongs to the player id, server returns:

```
"Player has updated his username to 'Cristian4' successfully"
```
---
### `New game player - POST - Protected route` 
```
http://localhost:3000/api/players/61354cab0ef7bc872876e918/games
```

You need to use token as authorization.  
**Only the player with his own token will be able to play**  
If the token is valid and belongs to the player id, server returns the game result:

```json
{
    "diceOne": 4,
    "diceTwo": 1,
    "result": 5,
    "won": 0
}
```
---
### `Delete games player - DELETE - Protected route` 
```
http://localhost:3000/api/players/61354cab0ef7bc872876e918/games
```

You need to use token as authorization.  
**Only the player with his own token will be able to delete his games**  
If the token is valid and belongs to the player id, server returns the game result:

```json
{
    "message": "Games deleted",
    "player": {
        "_id": "61354cab0ef7bc872876e918",
        "username": "Cristian4",
        "games": [],
        "__v": 3
    }
}
```
---
### `Get Ranking - GET - Protected route` 
```
http://localhost:3000/api/players/ranking
```
You need to use token as authorization.  
If the token is valid, the server returns the games ranking and the total success rate of the PLAYERS:
```json
[
    {
        "total_games_played": 3,
        "success_rate": 0.3333333333333333
    }
]
```
---
### `Get Winner - GET - Protected route` 
```
http://localhost:3000/api/players/ranking/winner
```
You need to use token as authorization.  
If the token is valid, the server returns the player with the highest success rate in the games:
```json
[
    {
        "username": "Cristian4",
        "success_rate": 0.3333333333333333
    }
]
```
---
### `Get Looser - GET - Protected route` 
```
http://localhost:3000/api/players/ranking/looser
```
You need to use token as authorization.  
If the token is valid, the server returns the player with the lowest success rate in the games:
```json
[
    {
        "username": "Cristian2",
        "success_rate": 0
    }
]
```
--- 
### `Login - POST` 

Creates a new token
```
http://localhost:3000/api/players/login
```
It is necessary to send to the server the username and the id that you got in the creation of the same player.  
In this case, the id works as a password.

```json
{
    "_id": "61354cab0ef7bc872876e918",
    "username" : "Cristian4"
}
```
If the credentials are correct, the server will return a new token with an expiration of one day:

```json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTM1NGNhYjBlZjdiYzg3Mjg3NmU5MTgiLCJ1c2VybmFtZSI6IkNyaXN0aWFuNCIsImlhdCI6MTYzMDg4NTIzMywiZXhwIjoxNjMwOTcxNjMzfQ.FfhVQmjdcu9RldUK_C5YADhhwC1V4IZRT1duVQ_hjjA"
```

---
### Server responds with bad credentials, jwt expired, jwt must be provided and unauthorized player errors
---