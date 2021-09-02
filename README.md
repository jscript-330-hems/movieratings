# movieratings
Javascript 330 Final Project - Movie Ratings

# Self Evaluation
## Project Summary
After the team was formed, a couple project ideas were initially discussed and a decision was made based on the assignment timeline, schedules, member availability, and project requirements. The team discussed the vision for the project and what functionality we wanted our service to offer. Our original project goal was to create and deploy a full-stack application and API that allowed users to review movies and access the theaters associated with specific movies in addition to allowing authorized administrator users to have special privileges. We identified the various routes that would be needed and discussed how the work would be broken down. The team used Trello to manage work, taking advantage of features such as sprints, user assignments, labels, and estimates.  After a short discussion, we decided to use one hour as a unit of work we would assign to individual tasks.  We identified and prioritized the core work that was needed to support the end goal, while leaving lower-prioritized work in later sprints.

One conundrum was how best to configure the repository(ies) for our work, because we had both a server project and a separate UI project. In the end, we decided to keep two separate repositories, as we believed it would be a cleaner way to manage our code. We then worked together to create the repositories, using a GitHub Organization, as recommended in class. This worked well to allow all of us the same access to the repository with no sense of single ownership. We configured GitHub to enforce pull requests and code reviews before merging to the Main branch. We discussed branching methodologies and followed a pattern where each developer worked in their own personal branch, then merged into a Dev branch.  When the code there was stable, we merged to the Main branch.  Automated deployment was then set up to push builds to the live sites.

Overall, the team worked very cohesively and effectively together.  Each team member had areas of focus and valuable contributions.  We decided that a daily standup was not necessary and instead opted for a weekly meeting on Zoom to go over remaining tasks and talk in some detail about which team member would do which tasks. We also utilized Slack group messages and kept our fellow group members up to date about what we were working on and any issues we faced. 

## Learning Takeaways
Throughout the course of completing the final project our team has acquired a great deal of knowledge, including development skills and project management practices, alike.
By creating testing scenarios through Jest, our team has learned that it's crucial to have thorough tests to ensure each endpoint works by design. The testing phase allowed us to unearth some problems with our code that we had not noticed before. Because multiple developers were continuously adding to the repositories, we learned that it is vital to embed tests into the workflow. Automating the necessary tests in the pipeline saved a great deal of time in the end. Throughout the development process we learned how to utilize MongoDB Compass, which helped us create and manage our database. Additionally, we learned how to deploy both our app’s front-end and back-end portions of the application through Heroku and how to connect our database to the application via MongoDB Atlas. Finally, we learned how to incorporate React.js into our project, allowing us to create a front-end application that communicates with the database and API we had already built. In React, we learned how to employ fetch and async await to access and preform CRUD operations on our data. 

In addition to invaluable development skills, our final project also taught us a myriad of useful project management tools. First, our group learned how to manage GitHub repositories. As mentioned above, we utilized personal dev branches, a group dev branch, and a main branch to eliminate the possibility of one of the group members pushing old code to GitHub. We also learned how to set up our GitHub Organization so that reviewers were required to check and approve the code prior to a merge. We also discovered many helpful tools for organizing and sharing our work. We used Trello to manage our tasks, timelines, and division of labor. We used GitHub to share all of our code throughout the development process. To manage READMEs and take notes during the brainstorming process, we utilized Google Docs. 

## Potential Improvements
Although our group would consider our application and API successes, there are a few areas we could have improved in to make our final project even more seamless. We believe that it could have been beneficial and a great learning opportunity to have done Test Driven Development for our project. If we had utilized Test Driven Development, we would have found errors immediately after we coded something locally, instead, we discovered errors after all of our back-end code had been completed. Test Driven Development would have accelerated our development process. We also see the value in holding more regular meetings, especially if our project had been larger. Incorporating a few standing meetings throughout the week could have made task management more efficient. Additionally, we could have been more dedicated to using Trello. Occasionally, we added things to the In-Progress deck a while after we had started the task. Overall, these improvements would have made our final project progress even more smoothly than it did.  

## Successes
Overall, our group was successful at building and deploying a full-stack web application using Express API. We owe our success to our planning, good communication, and each team member’s individual contribution to the development of the application. Early on, we had constructive discussions about our expectations for the project and identified the work needed to be completed. We had frequent communication through Slack that allowed all team members to be on the same page. In addition to Slack messages, the weekly meetings worked well to help us regroup and plan upcoming sprints. Overall, our use of project management tools helped us stay on track and meet deadlines. Finally, we had quick and streamlined deployment with CI/CD tool that made it easy to visualize our progress on the front-end and quickly fix any errors that emerged.  


# Week 8 Progress Report
In the past one and a half sprint periods, our group has completed the tasks required to deploy a basic version of our API and our back-end database. First, we created models and DAOs for users, movies, theaters, and reviews. We have created routes for the login, movies, theaters and reviews. The login routes allow a  user to signup, login, logout, and change their password. The movie routes allow users to create, update, and delete movies, as well as, find a movie by the theater or movie’s ID, search for movies, and get all movies. The theater routes allow users with admin privileges to create, update, and delete theaters. The theater routes also allow any user to get all theaters, get theaters by a movie or theater’s ID, and search for theaters by zip code. The review routes allow users to get reviews by movie ID and create and delete a review with admin privileges. We used middleware to employ authentication and authorization. The middleware is used to validate credentials and associate roles and users. After ensuring that the routes worked correctly, we developed unit tests for each route. We are still in the process of adding more error handling through the unit test, adding more demo data.

On the front-end, we have made wireframes to plan out the visual direction of our pages. We currently have a simplistic site that allows users to sign in or create an account.  An initial menu displays based on the logged in/out state and offers a link to admins only.  Currently the home page displays a movie search, which will be developed more to include a theater search option. Through text search, a user can retrieve items from a movies collection that includes the movie title, genre and synopsis.  A movie listings component has also been started, showing aggregated review info and other movie details. We plan on creating additional pages for movie and theater details, a page with a form to add a review, and a page with a form add or update a theater when the user has the admin role.

# Access Steps
Hosting Information</br>
Database: Mongodb Atlas</br>
Frontend: Heroku - https://js330-movieratings-client.herokuapp.com/ (work in progress)</br>
Backend: Heroku - https://js330-movieratings.herokuapp.com/</br>

APIs Example:</br>
GET Movies:</br>
https://js330-movieratings.herokuapp.com/movies</br>
GET Theaters:</br>
https://js330-movieratings.herokuapp.com/theaters</br>
GET Reviews:</br>
https://js330-movieratings.herokuapp.com/reviews/movie/610f1e2eec021067b1c4aa55</br>
POST /signup (req.body provide JSON email and password)</br>
https://js330-movieratings.herokuapp.com/login/signup</br>
POST /login (req.body provide JSON email and password)</br>
https://js330-movieratings.herokuapp.com/login</br>

Note: For more information about API endpoints, refer to <a href="https://github.com/jscript-330-hems/movieratings#routes">Routes</a> section in README.</br>

Frontend:</br>
https://js330-movieratings-client.herokuapp.com/#/</br>

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
