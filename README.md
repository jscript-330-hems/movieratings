# movieratings
Javascript 330 Final Project - Movie Ratings

# Week 8 Progress Report
In the past one and a half sprint periods, our group has completed the tasks required to deploy a basic version of our API and our back-end database. First, we created models and DAOs for users, movies, theaters, and reviews. We have created routes for the login, movies, theaters and reviews. The login routes allow a  user to signup, login, logout, and change their password. The movie routes allow users to create, update, and delete movies, as well as, find a movie by the theater or movie’s ID, search for movies, and get all movies. The theater routes allow users with admin privileges to create, update, and delete theaters. The theater routes also allow any user to get all theaters, get theaters by a movie or theater’s ID, and search for theaters by zip code. The review routes allow users to get reviews by movie ID and create and delete a review with admin privileges. We used middleware to employ authentication and authorization. The middleware is used to validate credentials and associate roles and users. After ensuring that the routes worked correctly, we developed unit tests for each route. We are still in the process of adding more error handling through the unit test, adding more demo data.

On the front-end, we have made wireframes to plan out the visual direction of our pages. We currently have a simplistic site that allows users to sign in or create an account.  An initial menu displays based on the logged in/out state and offers a link to admins only.  Currently the home page displays a movie search, which will be developed more to include a theater search option. Through text search, a user can retrieve items from a movies collection that includes the movie title, genre and synopsis.  A movie listings component has also been started, showing aggregated review info and other movie details. We plan on creating additional pages for movie and theater details, a page with a form to add a review, and a page with a form add or update a theater when the user has the admin role.

# Access Steps
Hosting Information</br>
Database: Mongodb Atlas</br>
Frontend: Heroku - https://js330-movieratings-client.herokuapp.com/ (work in progress)</br>
Backend: Heroku - https://js330-movieratings.herokuapp.com/</br>

APIs Example: 
GET Movies:
https://js330-movieratings.herokuapp.com/movies
GET Theaters:
https://js330-movieratings.herokuapp.com/theaters
GET Reviews:
https://js330-movieratings.herokuapp.com/reviews/movie/610f1e2eec021067b1c4aa55
POST /signup (req.body provide JSON email and password)
https://js330-movieratings.herokuapp.com/login/signup
POST /login (req.body provide JSON email and password)
https://js330-movieratings.herokuapp.com/login

Note: For more information about API endpoints, refer to Routes section in README.

Frontend: 
https://js330-movieratings-client.herokuapp.com/#/

# Project Description
For our final project, our group aims to create a comprehensive platform that optimizes movie viewers’ experiences and movie theaters’ showings. Through text search, users will be able to find movies by searching movie titles, genres, and potentially actors’ names. The front-end of the web application will include a search bar that will return a list of the movie’s name and details. The web page will also include a search bar for the user to search theaters by zip code. Through authentication middleware, users will signup, login, and logout of their accounts. Authenticated users will be taken to an additional page if they wish to submit a movie review. We will employ aggregated data for the average review and review count of movies. Through our API, moviegoers will be able to make better decisions when choosing what movies to watch.

In addition to being a tool for the audience, theaters will be able to add movies, analyze the reviews of the movies they are showing, and remove reviews. Theaters will be given admin access through authorization middleware. On the front-end, users with theater admin access will have a page where they can manage the movies showing at their theater. The theater route will allow any user to access the movies playing at a specified theater and the movies’ aggregated data. Theaters will be able to refine their movie selection based on the reviews left by viewers. In sum, our API allows viewers to have a more curated experience at movie theaters, while giving theaters a better idea of how to appeal to their audiences. 


# Routes
The following are the proposed routes we intend to implement.  Others had been considered to support updating reviews and theaters and may be added as time permits.

## Movies

| METHOD | ROUTE                | DESCRIPTION                                                                                                         |
| ------ | -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| GET    | /movies              | Displays list of all movies and aggregated data (average reviews, review count)                                     |
| GET    | /movies/:id/theaters | Displays a list of theaters that are playing the specified movie                                                    |
| GET    | /movies/:id           | Displays details for a specified movie and aggregated data (average reviews, review count)                          |
| GET    | /movies/search?query       | Displays a list of movies where the search term appears in the movie title, genre, actor names, or movie synopsis.  |
| POST   | /movies <span style="color:red">*</span>            | Creates a movie                                                                                                     |
| PUT    | /movies/:id <span style="color:red">*</span>        | Updates a movie                                                                                                     |
| DELETE | /movies/:id <span style="color:red">*</span>        | Deletes a movie                                                                                                     |


## Theaters

| METHOD | ROUTE                | DESCRIPTION                                                                                                         |
| ------ | -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| GET    | /theaters            | Displays a list of all theaters                                                                                      |
| GET    | /theaters/:id/movies | Displays movies currently playing at the specified theater and aggregated movie data (average reviews, review count) |
| GET    | /theaters/zipcode/:id    | Displays a list of theaters by zip code                                                                              |
| POST   | /theaters <span style="color:red">**</span>          | Creates a theater                                                                                                    |
| PUT   | /theaters <span style="color:red">**</span>          | Updates a theater                                                                                                    |
| DELETE   | /theaters <span style="color:red">**</span>          | Deletes a theater                                                                                                    |


## Reviews

| METHOD | ROUTE                | DESCRIPTION                                                                                                         |
| ------ | -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| GET    | /reviews/movie/:id     | Displays reviews for specified movie                                                                                 |
| POST   | /reviews <span style="color:red">*</span>          | Creates a review for a specified movie                                                                               |
| DELETE | /reviews/:id <span style="color:red">**</span>      | Deletes a specified review                                                                                           |


## Login

| METHOD | ROUTE                | DESCRIPTION                                                                                                         |
| ------ | -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| POST   | /login               | When successful, returns a token                                                                                     |
| POST   | /login/signup        | Creates a user.  Possibly sends back a token, unless we want to force the user to log in                             |

<span style="color:red">*</span>  Only available to authenticated users<br />
<span style="color:red">**</span> Only available to a user in the Admin role
