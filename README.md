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
> endpoint: "/"
> **optional** header:
>
> - Authorization: Bearer some_jwt_token

Example response:

```
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
    }
  ]
}
```

### User Detail Page

> **GET**
> endpoint: "/users/:id"
> **optional** header:
>
> - Authorization: Bearer some_jwt_token

Example response:

```
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
    posts: [<posts made by thommy>],
}
```

```
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
