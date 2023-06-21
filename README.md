# anonymous-blog

Practice project for MongoDB, ExpressJS and OAuth. This is a project based on an assignment in The Odin Project.

This project serves to imitate a social media web app where users can login to create posts, comment on posts, and reply to comments. All posts are public.

Users can apply to become Premium members and/or Admins. Premium members are able to see each user's real name, and Admins have the power to delete posts.

This project has been deployed on Railway, [here](http://anonymous-blog-production.up.railway.app).
<br/>

Things to work on:

- API/frontend structure.
- Backend should conduct all logic and minimise conditional statements on front-end (whether currentUser == userToLookAt, visibility of first_name and last_name, etc)

Learning points:

- OAuth with passport-local, express-validations and form UX.
- Migrating Bootstrap from v4 to v5.
- Mongoose multi-level populate.
- Mongoose recursive modelling.
- Conditional rendering in Pug.
- Escaping vs unescaping data in Pug.
- Using conditional middlewares alongside express-validator.
- Mongoose multi-level deletion of linked database objects.
- CSRF prevention by sticking to REST rules.
- Splitting project into React front-end vs ExpressJS API back-end.
- React-redux toolkit.
- Creating togglable Dark Mode within Bootstrap v5.3.
- Forcing all logic into back-end, and passing only relevant data to front-end.
