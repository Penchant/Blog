# The Ugly but Functional Blog

The Ugly but Functional Blog is a blog project a blogging application made with a ASP.NET Core 3.0 with Entity Framework backend, Angular frontend, and MySQL database.  
 The blog includes the ability to create posts, archive them, unarchive them, and edit them as a logged in user.
 Any users can see the posts and comment on them.

## Usage
Quick start
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```
That will get you going with an empty blog running at port 4200 on your machine.

Configuration of some database properties, such as setting up a username and password can be modified by editing `example.env`.
Updates to the database configuration also need to update the corresponding values in `backend/appsettings.json` that the backend uses for database connections
Updating the port that the backend runs on also requires updating `frontend/proxy.conf.js` so the frontend appropriately proxies requests.

The blog is initialized with whatever data is in `structure.sql`. 
The included file only includes the database structure, hence the name.

## Areas that could be improved
 - Style: The ugly but functional blog clearly could have some improvement by becoming just the functional blog.
 - Authentication: 
    - The backend doesn't actually verify when data is requested that the request is authenticated.
    - Because something like a token isn't used, navigating via typing in the URL causes your login status to be lost when
    thus something like a JWT would enable the state to actually be maintained (and easy for the backend to validate).
 - Using text areas for things like the comment body and message body rather than an input.
 - More commenting in the code and better documentation.
