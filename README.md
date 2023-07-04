# Back-end component of Anonymous Blog project

Practice project for MongoDB, ExpressJS and OAuth. This is a project based on an assignment in The Odin Project.

This project serves to imitate a social media site where users can login to create posts, comment on posts, and reply to comments. All posts are public.

Users can apply to become Premium members and/or Admins. Premium members are able to see each user's real name, and Admins have the power to delete posts.

This repo is only the API of the project, and it has been deployed on Railway, [here](http://anonymous-blog-production.up.railway.app).
<br/>

The Front-end site is located [here](https://anonymous-blog-production-93e5.up.railway.app/).
<br/>

## Learning points:

- Splitting project into React front-end vs ExpressJS API back-end.
- Forcing all logic into back-end, and passing only relevant data to front-end.
- Deploying back-end and front-end separately in Railway, as separate repos.

- OAuth with passport-local, express-validations and form UX.
- Migrating Bootstrap from v4 to v5.
- Mongoose multi-level populate.
- Mongoose recursive modelling.
- Conditional rendering in Pug.
- Escaping vs unescaping data in Pug.
- Using conditional middlewares alongside express-validator.
- Mongoose multi-level deletion of linked database objects.
- CSRF prevention by sticking to REST rules.
- Expanding DB models for new features.

## How to use API

### Homepage

> **GET**
>
> **endpoint**: "/"
>
> **optional** header:
>
> - Authorization: "Bearer\<space\>some_jwt_token"

Example response:

```javascript
status 200
{
 posts: [
    {
    title: "some_post_title",
    text: "some optional text in the post",
    user: ObjectId(1234567890),
    date_of_post: 2023-06-05T09:35:28.499+00:00,
    comments: [
                ObjectId(1029589671056),
                ObjectId(1025811025905)
            ],
    },
    {
    title: "another_post_title",
    text: "more optional text",
    user: ObjectId(987654321),
    date_of_post: 2023-05-04T12:26:28.499+00:00,
    comments: [
                ObjectId(5678956794679),
                ObjectId(2304896571346)
            ],
    },
  ]
}
```

### User Detail Page

> **GET**
>
> **endpoint**: "/users/:id"
>
> **optional** header:
>
> - Authorization: "Bearer\<space\>some_jwt_token"

Example response:

```javascript
status 200
{
    userToLookAt: {
        _id: ObjectId(987654321),
        first_name: "Thommy", //if you are not authenticated with a JWT token or your account is "Basic", your response for first_name will be ""
        last_name: "Lim", //if you are not authenticated with a JWT token or your account is "Basic", your response for last_name will be ""
        full_name: "Thommy Lim", //if you are not authenticated with a JWT token or your account is "Basic", your response for full_name will be ""
        username: "Thommy_lim_123",
        member_status: "Basic",
        url: "/users/987654321",
    },
    sameUser: false, //
    posts: [
        {first post made by Thommy},
        {second post made by Thommy},
        {third post made by Thommy}
    ],
}
```

```javascript
status 404
{
    errors: [
        {
            path: "generic",
            message: "User could not be found"
        }
    ],
}
```

### Logging In

> **GET**
>
> **endpoint**: "/auth/login"

Example response:

```javascript
status 200
{ message: "Login page" }
```

### Logging In

> **POST**
>
> **endpoint**: "/auth/login"
>
> **required** header:
>
> - Content-Type: application/json
> - Body:
>   {
>   "username": "username123",
>   "password": "mypassword"
>   "confirmpassword": "mypassword"
>   }

Example response:

```javascript
status 200
{
    user: {
        _id: ObjectId(987654321),
        first_name: "myname",
        last_name: "myothername",
        full_name: "myname myothername",
        username: "username123",
        password: "some_hashed_password_SHA256_with_salt",
        member_status: "Basic",
        url: "/users/987654321",
        auth_tokens: [{ token: "some_jwt_token" }, { token: "some_jwt_token" }], // these are the tokens currently used by the user, across any device
    },
    token: "some_jwt_token"
}
```

```javascript
form validation errors detected
{
    errors: [
        {
            path: "username",
            msg: "Username must be 5 to 20 characters long"
        },
        {
            path: "confirmpassword",
            msg: "Password confirmation must be identical to password input"
        },
    ],
}
```

### Signing Up

> **GET**
>
> **endpoint**: "/auth/signup"

Example response:

```javascript
status 200
{ message: "Sign up page" }
```

### Signing Up

> **POST**
>
> **endpoint**: "/auth/signup"
>
> **required** header:
>
> - Content-Type: application/json
> - Body:
>   {
>   "first_name": "Thommy",
>   "last_name": "Lim",
>   "username": "username123",
>   "password": "mypassword"
>   "confirmpassword": "mypassword"
>   }

Example response:

```javascript
status 200
{
    user: {
        _id: ObjectId(987654321),
        first_name: "Thommy",
        last_name: "Lim",
        full_name: "Thommy Lim",
        username: "username123",
        password: "some_hashed_password_SHA256_with_salt",
        member_status: "Basic",
        url: "/users/987654321",
        auth_tokens: [{ token: "some_jwt_token" }, { token: "some_jwt_token" }], // these are the tokens currently used by the user, across any device
    },
    token: "some_jwt_token"
}
```

```javascript
form validation errors detected
{
    errors: [
        {
            path: "first_name",
            msg: "First name can only contain alphabets, spaces and hypens."
        },
        {
            path: "last_name",
            msg: "Last name must be 1 to 30 characters long"
        },
    ],
}
```

### Logging Out

> **POST**
>
> **endpoint**: "/auth/loggingout/:id"
>
> **required** header:
>
> - Content-Type: application/json
> - Authorization: "Bearer\<space\>some_jwt_token"

Example response:

```javascript
status 200
{
    message: `Logging out thommy_lim_123`,
    user: {
        _id: ObjectId(987654321),
        first_name: "Thommy",
        last_name: "Lim",
        full_name: "Thommy Lim",
        username: "thommy_lim_123",
        password: "some_hashed_password_SHA256_with_salt",
        member_status: "Basic",
        url: "/users/987654321",
        auth_tokens: [{ token: "some_jwt_token" }, { token: "some_jwt_token" }], // these are the tokens currently used by the user, across any device
    },
    removedToken: \<some_jwt_token\>,
}
```

```javascript
status 401 for missing auth token
{ errors: [{ message: "Authorization Token Failed" }] }
```

```javascript
status 403 for invalid auth token
{ errors: [{ message: "Auth token could not be found: <the_invalid_token_used>" }] }
```

### Page after successful Log Out

> **GET**
>
> **endpoint**: "/auth/logout"

Example response:

```javascript
status 200
{
    message: `Logout page`,

```

### Post Detail Page

> **GET**
>
> **endpoint**: "/posts/:id"
>
> **optional** header:
>
> - Authorization: "Bearer\<space\>some_jwt_token"

Example response:

```javascript
status 200
{
    post: {
        title: "some_post_title",
        text: "some optional text in the post",
        user: ObjectId(1234567890),
        date_of_post: 2023-06-05T09:35:28.499+00:00,
        comments: [
                    ObjectId(1029589671056),
                    ObjectId(1025811025905)
                ],
    },
      ownPost: false, // will only be true if you are accessing this endpoint as the authorized user of this post
      canDelete: false, // will only be true if you are accessing this endpoint as an authorized user with "Admin" membership,
}
```

```javascript
status 404
{
    errors: [
        {
            error: "Post could not be found"
        }
    ],
}
```

### Creating a new Post

> **GET**
>
> **endpoint**: "/posts/create"
>
> **required** header:
>
> - Authorization: "Bearer\<space\>some_jwt_token"

Example response:

```javascript
status 200
{}
```

### Creating a new Post

> **POST**
>
> **endpoint**: "/posts/create"
>
> **required** header:
>
> - Authorization: "Bearer\<space\>some_jwt_token"
> - Content-Type: application/json
> - Body:
>   {
>   "title": "testing out a post creation by backend",
>   "text": "this is suppose to be the text of the post. Is it readable in the DB?"
>   }

Example response:

```javascript
status 200
{}
```

```javascript
form validation errors detected
{
    errors: [
        {
            path: "title",
            msg: "Title must be 1 to 90 characters long"
        },
        {
            path: "text",
            msg: "Text must be maximum of 300 characters"
        },
    ],
}
```

### Deleting a Post

> **DELETE**
>
> **endpoint**: "/posts/:id/delete"
>
> **required** header:
>
> - Authorization: "Bearer\<space\>some_jwt_token"

Example response:

```javascript
status 200
{
    post: {
        title: "some_post_title",
        text: "some optional text in the post",
        user: ObjectId(1234567890),
        date_of_post: 2023-06-05T09:35:28.499+00:00,
        comments: [
            ObjectId(1029589671056),
            ObjectId(1025811025905)
        ],
    },
    directCommentsId: [1029589671056, 1025811025905],
    indirectCommentsId [2362362367237, 1235151235512, 1920348720591],
    }
```

```javascript
status 403 // gets triggered if authorized user is not an Admin
{ message: "Unauthorized to perform this action." }
```

```javascript
status 404
{ error: "Post could not be found" }
```

### Creating a new Comment

> **POST**
>
> **endpoint**: "/posts/:id/comments/create"
>
> **required** header:
>
> - Authorization: "Bearer\<space\>some_jwt_token"
> - Content-Type: application/json
> - Body:
>
>   "new_comment": "Some random new comment",
>   }

Example response:

```javascript
status 201
{
    newComment: {
        text: "Some random new comment",
        user: ObjectId(0987654321),
        date_of_comment: 2023-06-05T09:35:28.499+00:00,
        isPoster: false, //will be true if newComment.user._id === post.user._id
    }
    post: {
        title: "some_post_title",
        text: "some optional text in the post",
        user: ObjectId(1234567890),
        date_of_post: 2023-06-05T09:35:28.499+00:00,
        comments: [
            ObjectId(1029589671056),
        ],
    }
}
```

```javascript
form validation errors detected
{
    errors: [
        {
            path: "new_comment",
            msg: "Comment must be between 1 to 300 characters"
        },
    ],
}
```

```javascript
status 404
{ error: "Post could not be found" }
```

### Creating a new Reply

> **POST**
>
> **endpoint**: "/posts/:postid/comments/:commentid/reply"
>
> **required** header:
>
> - Authorization: "Bearer\<space\>some_jwt_token"
> - Content-Type: application/json
> - Body:
>   {
>   "new_reply": "some new reply to a particular comment",
>   }

Example response:

```javascript
status 201
{
    newReply: {
        text: "Some new reply",
        user: ObjectId(1251261366),
        date_of_comment: 2023-06-05T09:35:28.499+00:00,
        isPoster: false, //will be true if newReply.user._id === post.user._id
    },
    currentComment: {
        text: "Some random new comment",
        user: ObjectId(0987654321),
        date_of_comment: 2023-06-05T09:35:28.499+00:00,
        isPoster: false, //will be true if newReply.user._id === post.user._id
    }
}
```

```javascript
form validation errors detected
{
    errors: [
        {
            path: "new_reply",
            msg: "Reply must be between 1 to 100 characters"
        },
    ],
}
```

```javascript
status 404
{ error: "Post could not be found" }
```
