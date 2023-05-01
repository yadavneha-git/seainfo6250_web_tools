# Twitter Clone

This project is a clone of the popular social media platform Twitter, built using React for the front-end and Node.js with Express for the back-end. It allows users to login, post tweets, delete tweets, follow other users, and view their timelines. User can also view users they follow. Users can reply to their own posts and post of the users they follow. The project also includes input validation and error reporting, as well as user authentication and authorization.

## Features

* User authentication and authorization.
* Create posts.
* Delete posts
* Reply to their own posts.
* Reply to post of the users they follow.
* Follow and unfollow other users.
* Search for users.

## How to use

To use this project, you must have Node.js and npm installed on your computer.
1. Clone this repository to your local machine.
2. In the root directory of the project, run npm install to install all dependencies.
3. Run npm run build to build the React front-end.
4. Run npm start by going inside the server directory to start the back-end server and serve the built front-end files as static files.
5. Navigate to http://localhost:4000 in your web browser to use the application.

## Dependencies

### Front-end

* React
* create-react-app
* uuid

### Back-end

* Express
* cookie-parser
* uuid
* nodemon (development only)

## Security

This project includes user authentication and authorization using tokens and session IDs. User input is also sanitized to prevent insertion attacks.

#### License
* Images are used from the [Unsplash](https://unsplash.com/) under MIT License
* The CSS adapted from [css.gg](https://css.gg) under the MIT License
