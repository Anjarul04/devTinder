<<<<<<< HEAD
# Devtinder API's
=======
# DevTinder APIs
>>>>>>> 90142875d100f5cfe45a95750fa3cc0f0691a1ec

## authRouter
- POST /signup
- POST /login
<<<<<<< HEAD
- Post / logout
=======
- POST /Logout
>>>>>>> 90142875d100f5cfe45a95750fa3cc0f0691a1ec

## profileRouter
- GET /profile/view
- PATCH /profile/edit
<<<<<<< HEAD
- PATCH /Profile/password

## connectionRequestRouter
- POST /request/send /:status /:userId
- POST /request/send /ignore /:userId
- POST /request/review /accepted /:requestId
- POST /request/review /rejected /:requestId

## userRouter 
- GET /user/connections/receive
- GET /user/request
- GET /user/feed - get you profile of other users on platforms

- Status => ignored instrested accepted rejected

=======
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId


## userRouter
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platf

Status: ignore, interested, accepted, rejected
>>>>>>> 90142875d100f5cfe45a95750fa3cc0f0691a1ec
