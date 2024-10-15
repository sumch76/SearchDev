## authRouter
POST/signup
POST/login
POST/logout

## profileRouter
- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/password

## requestRouter
- POST/request/send/:status/:userId

- POST/request/review/:status/:requestId
 
## userRouter
- GET/user/connections
- GET/user/requests
- GET/user/feed -  gets you the profiles of other users on the platform

`Status` : ignored,interested,accepted,rejected
