This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### `deploy to heroku`
* git add .
* git commit -m "example"
* git push heroku master

### `The Api created from firebase cloud`

For more information see the api functions repository.<br />
https://github.com/ArielCalisaya/Firebase_Functions

```json
{
    "Api_routes": {
        "Main_Url_Reference": ["https://us-central1-social-media-d9c51.cloudfunctions.net/api", [
            {
            "comments_Route": {
                "GET_All_Comments": "/comments",
                "GET_commnetBy_ID": "/comment/:commentId",
                "POST_Comment": "/newComment",
                "DELETE_commentBy_ID": "/comment/:commentId",
                "POST_Comment_in_userComment": "/comment:commentId/userInComment",
                "GET_Like": "/comment/:commentId/like",
                "GET_unLike": "/comment/:commentId/unLike"
            },
            "user_route": {
                "POST_singup": "/signup",
                "POST_signin": "/signin",
                "POST_userDetails": "/user",
                "POST_userImage": "/user/image",
                "GET_UserInfo": "/user",
                "GET_UserDetails": "/user/:handle"
            }
            }]
        ]
    }
}
```
