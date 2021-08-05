# movieratings
Javascript 330 Final Project - Movie Ratings

# Project Description
For our final project, our group aims to create a comprehensive platform that optimizes movie viewers’ experiences and movie theaters’ showings. Our API will allow moviegoers to search for movies by name or genre, see where movies are playing by zip code, and leave reviews for movies they have viewed. Through our API, moviegoers will be able to make better decisions when choosing what movies to watch. In addition to being a tool for the audience, theaters will be able to add movies, analyze the reviews of the movies they are showing, and remove reviews. Theaters will be able to refine their movie selection based on the reviews left by viewers. In sum, our API allows viewers to have a more curated experience at movie theaters, while giving theaters a better idea of how to appeal to their audiences. 


# Routes
The following are the proposed routes we intend to implement.  Others had been considered to support updating reviews and theaters and may be added as time permits.

| METHOD | ROUTE                | DESCRIPTION                                                                                                         |
| ------ | -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| GET    | /movies              | Displays list of all movies and aggregated data (average reviews, review count)                                     |
| GET    | /movies/theaters/:id | Displays a list of theaters that are playing the specified movie                                                    |
| GET    | /movies:id           | Displays details for a specified movie and aggregated data (average reviews, review count)                          |
| GET    | /movies?search       | Displays a list of movies where the search term appears in the movie title, genre, actor names, or movie synopsis.  |
| POST   | /movies <span style="color:red">*</span>            | Creates a movie                                                                                                     |
| PUT    | /movies/:id <span style="color:red">*</span>        | Updates a movie                                                                                                     |
| DELETE | /movies/:id <span style="color:red">*</span>        | Deletes a movie                                                                                                     |


# Theaters

| METHOD | ROUTE                | DESCRIPTION                                                                                                         |
| ------ | -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| GET    | /theaters            | Displays a list of all theaters                                                                                      |
| GET    | /theaters/:id/movies | Displays movies currently playing at the specified theater and aggregated movie data (average reviews, review count) |
| GET    | /theaters?zipcode    | Displays a list of theaters by zip code                                                                              |
| POST   | /theaters <span style="color:red">*</span>          | Creates a theater                                                                                                    |


# Reviews

| METHOD | ROUTE                | DESCRIPTION                                                                                                         |
| ------ | -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| GET    | /reviews?movieid     | Displays reviews for specified movie                                                                                 |
| POST   | /reviews/:id         | Creates a review for a specified movie                                                                               |
| DELETE | /reviews/:id <span style="color:red">**</span>      | Deletes a specified review                                                                                           |


# Login

| METHOD | ROUTE                | DESCRIPTION                                                                                                         |
| ------ | -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| POST   | /login               | When successful, returns a token                                                                                     |
| POST   | /login/signup        | Creates a user.  Possibly sends back a token, unless we want to force the user to log in                             |

<span style="color:red">*</span>  Only available to authenticated users<br />
<span style="color:red">**</span> Only available to a user in the Admin role
