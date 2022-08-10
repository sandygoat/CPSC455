# Rate the Turf

## App Description
Tired of isolating at home? Try our app to find the perfect grass fields to hang out with your friends. Our app also helps you plan the best route to the destination via various transportation tools. Besides, you will be updated by the accounts you are following. And many more for your discovery...

## Project Goals
### Minimal:
1. :heavy_check_mark: Search:
  - Find the turf or playland or anywhere green on Map that provides leisure activities.
2. :heavy_check_mark: Comment:
  - Allow users to leave comments on a specific nearby location.
  - All users are able to read others' comments.
  - Allow users to delete their comments
3. :heavy_check_mark: Rating:
  - Allow individual users to rate the turf and keep the record for future reference, which could also be shared with other users later
4. :heavy_check_mark: Favorite:
  - Users are able to save/unsave places by clicking the favorite button
5. :heavy_check_mark: User System:
  - Registration for new users and log-in system for returning users
 
### Standard:
1.  Filter results based on ratings
2.  Sort by distance from user [Amended]:
 - Initially, we planned to show the distance from the user's current location to the selected place. We improve this goal by introducing the Trip Planner feature where users are able to get the route to the chosen place.  
3. :heavy_check_mark: Add Pictures
4. :heavy_check_mark: Trip Planner:
  - In the favorite tab, users can directly find the route to the destination via the trip planner tool. In this tool, routes by multiple transportation tools can be provided as well as a link directly to the google map with the designated route loaded.
5. :heavy_check_mark: Enable session cookies

### Advanced:
1. :heavy_check_mark: Add friends[partially completed]:
  - Partially completed by the subscribe and notify feature, where subscribers will be updated by the latest ratings from their following users.
2. Create a chatting/meetup function
3. Third-party login
4.  :heavy_check_mark: Subscribe and Notify feature:
  - Users can subscribe to other users by searching their username in the Subscribe tab. Upon subscription, the subscribers will be notified of the new ratings made by the watched users.

## Tech Stack
### Unit 1: HTML, CSS, JS
- HTML is used within TSX to render React components.
- CSS is used for styling.
- JavaScript is used to implement both the front end and back end.

### Unit 2: React & Redux
 - React: In the front end, React is used to create reusable react components such as the FavoriteCards, PlaceModal, and UserComment.
 - Redux: Redux is used to store and manage the states of the application in one place, such as addReviews, addFavorite, removeFromFavoriteList etc.

### Unit 3 - MongoDB
 - Used MongoDB to store our key data components including places id, pictures, comments, ratings, favorite lists, trip options within the trip planner, and the suggestions made by other users.
 - As MongoDB is a non-relational, document-oriented database management system, we were able to flexibly define the schema that fitted our needs and access our data more speedily compared to the traditional RDBS.

### Unit 4 - Node & Express
 - Used Node.js to implement our backend services as well as the server-side logic.
 - Used Express to handle the API requests from our front-end and rout it to the specified handler function.
 - Integrated Node.js and Express with our MongoDB with Mongoose for data storing and data manipulation.

### Unit 5: Release Engineering
 - Deployed and hosted rateMyTurf website on Heroku as it is beginner friendly and provides a quick start-up.
 - Used Heroku's automatic deploy from Github feature for higher reliability and potentially fewer build errors.

## Above and Beyond
- Google Map API
  - Used Google Map API to look up the location, placeid, geolocation, pictures, and different transportation route options.
  - Enabled our users to search for the nearby grass fields given a rough location, see what the places look like, how to get there, and then make the decision on whether they would like to go there or not.

- Real-time Responsive notification
  - Used RabbitMQ and Redis to manage asynchronous notification of the subscribee's newly added rating to the subscriber.
  - Allows the user to keep on using the app without having to wait for confirmation on whether the subscriber has received the update.
  - Once updated, the subscriber is able to see it immediately in their subscribed user list, which provides a real-time responsive notification feature.


- Session cookie
  - Implemented session cookie in our backend.
  - User is able to log in to the account and the backend will store their unique session ID.
  - No need to enter the login info again next time visiting the app since the browser is able to re-identify the user using the session ID from the server.


## Next Steps
- Add more details on each place card:
  - a tag to indicate whether this place is pet-friendly or not
  - allow users to upload pictures in the comment section.
  - Hours section to show the opening and closing time
- Enable Third-Party login: allows users to log in through third-party account instead of creating new accounts
- Add friends and chat: Enrich the social function of this app by allowing users to add other users as friends and chat with their friends. Currently, our subscribe and notify function has done part of this work by allowing users to follow other users' updates on this app. By adding friend and chat functions, we want to expand on this system and build strong community connections among users.

## List of contributions
Shuge Luo:
- Implemented the Home list of location pictures, scrolling feature, the left three routing tabs on the left.
- Implemented the final login page that allows user input, verification on successful registration and layout.
- Implemented the session cookie in the backend and tested out using different user accounts.
- Implemented the subscribe function using RabbitMD and Redis in the backend and tested the real time notfifcation by using differnt browser to make ratings.
- Co-Implemented the deployment on Heroku as well as degugging.
- Keep track of the entire project progress and facilitate the areas in need of technical assistance.

Jack Hwang:
- Implemented the initial front-end FavCard component and the Favorite page with pictures, location, comments, and star ratings. Generate documents and weekly scrum reports. 
- Wrote documentation

Fei Long:
- Implemented initial front-end login page that included multiple fields for user info, login page layout, and captcha. Keep the communication flow between each group member.
- Wrote documentation

Sandy Wu:
- Implemented the GoogleMap api and the extraction of all the relevant returned information. 
- Implemented the search function on the home page, layout, pins on the map, pop up image on the the pin, and the like button that adds location to favorite list.
- Implemented the trip planner function including travel options, current user location, and remove favorite from favorite list function. 
- Co-Implemented the deployment on Heroku.

