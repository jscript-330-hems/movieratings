# movieratings
Javascript 330 Final Project - Movie Ratings

#Routes

| METHOD | ROUTE                | DESCRIPTION                                                                                                         |
| ------ | -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| GET    | /movies              | Displays list of all movies and aggregated data (average reviews, review count)                                     |
| GET    | /movies/theaters/:id | Displays a list of theaters that are playing the specified movie                                                    |
| GET    | /movies:id           | Displays details for a specified movie and aggregated data (average reviews, review count)                          |
| GET    | /movies?search       | Displays a list of movies where the search term appears in the movie title, genre, actor names, or movie synopsis.  |
| POST   | /movies *            | Creates a movie                                                                                                     |
| PUT    | /movies/:id *        | Updates a movie                                                                                                     |
| DELETE | /movies/:id *        | Deletes a movie                                                                                                     |

#Theaters

| GET    | /theaters            | Displays a list of all theaters                                                                                      |
| GET    | /theaters/:id/movies | Displays movies currently playing at the specified theater and aggregated movie data (average reviews, review count) |
| GET    | /theaters?zipcode    | Displays a list of theaters by zip code                                                                              |
| POST   | /theaters *          | Creates a theater                                                                                                    |

#Reviews

| GET    | /reviews?movieid     | Displays reviews for specified movie                                                                                 |
| POST   | /reviews/:id         | Creates a review for a specified movie                                                                               |
| DELETE | /reviews/:id **      | Deletes a specified review                                                                                           |

#Login

| POST   | /login               | When successful, returns a token                                                                                     |
| POST   | /login/signup        | Creates a user.  Possibly sends back a token, unless we want to force the user to log in                             |