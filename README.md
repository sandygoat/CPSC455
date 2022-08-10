# Rate the Turf

## App Description

Top of README – clear description of app (can be like an elevator pitch!) [2-3 sentences]: !!! <br>
This application allows users to find a turf based on the rating of the turf and the distance from the location of the user to the turf. User is also able to view the image of the turf to see if it fits their preference.

## Project Goals
### Minimal:
1. :heavy_check_mark: Search: 
  - Find the turf or playland or anywhere green on Map that provides leisure activities.
2. :heavy_check_mark: Comment: 
  - Allow users to leave comments on a specific nearby location.
  - All users are able to read others' comments.
  - Allow users to delete their comments
3. :heavy_check_mark: Raing:
  - Allow individual user to rate the the turf and keep the record for future reference, which could also be shared with other users later
4. :heavy_check_mark: Favorite:
  - Users are able to save/unsave places by clicking the favorite button
5. :heavy_check_mark: User System:
  - Registeration for new users and log in system for returning users
 
### Standard:
1.  Filter results based on ratings
2.  Sort by distance from user [Amended]:
 - Initially, we planned to show the distance from the user's current location to the selected place. We improve this goal by introducing Trip Planner feature where users are able to get the route to the chosen place.  
3. :heavy_check_mark: Add Pictures
4. :heavy_check_mark: Trip Planner:
  - In the favorite tab, users can directly find the route to the destination via the trip planner tool. In this tool, routes by multiple transportation tools can be provided as well as a link directly to the goole map with desinated route loaded.
5. :heavy_check_mark: Enable session cookies

### Advanced:
1. :heavy_check_mark: Add friends[partially completed]:
  - Partially completed by the subscrib and notify feature, where subscribers will be updated by the latest ratings from their following users. 
2. Create chatting/meetup function
3. Third-party login
4.  :heavy_check_mark: Subscribe and Notify feature:
  - Users can subscribe other users by searching their username in the Subscribe tab. Upon subcription, the subcribers will be notified by the new ratings made by the watched users.

## Tech Stack
### Unit 1: HTML, CSS, JS
- HTML is used within TSX to render React components.
- CSS is used for styling.
- JavaScript is used to implement both front end and back end.

### Unit 2: React & Redux
 - React: In the front end, React is used to create multiple reusable react components such as the FavoriteCards, PlaceModal, and UserComment. 
 - Redux: Redux is used to store and manage the states of the application in one place, such as addReviews, addFavorite, removeFromFavoriteList etc.

### Unit 3 - MongoDB 
 - Used MongoDB to store our key data components including places id, pictures, comments, ratings, favorite list, trip options within the trip planner, and the     suggestions made by other users. 
 - As MongoDB is a non-relational, document oriented database management system, we were able to flexibly define the schema fitted our needs and access our data more speedily compared to the traditional RDBS. 

### Unit 4 - Node & Express 
 - Used Node.js to implement our backend services as well as the server-side logic. 
 - Used Express to handle the API requests from our front-end and rout it to the specified handler function.
 - Integrated Node.js and Express with our MongoDB with Mongoose for data storing and data manipulation.

### Unit 5: Release Engineering
 - Deployed and hosted rateMyTurf website on Heroku as it is beginner friendly and provides quick start up. 
 - Used Heroku's automatic deploy from Github feature for higher reliability and potentially fewer build errors.

## Above and Beyond
- Google Map API
  - Used Google Map api to look up location, placeid, geolocation, pictures, and different transportation route options. 
  - Enabled our users to search for the nearby grassfields given a rough location, see what the places look like, how to get there, and then make decision on     whether they would like to go there or not.

- Real time Responsive notification
  - Used RabbitMQ and redis to manage asynchronous notification of the subscribee’s newly added rating to the subscriber.
  - Allows the user to keep on using the app without having to wait for confirmation on whether subscriber has received the update.
  - Once updated, subscriber is able to see it immediately in their subcribed user list, which provides a real time responsive notification feature.


- Session cookie
  - Impemented session cookie in our backend. 
  - User is able to login to the account and the backend will store their unique session ID. 
  - No need to enter the login info again next time visiting the app since the browser is able to re-identify the user using the session ID from the server.


## Next Steps
- Add more details on each place card:
  - a tag to indicate whehter this place is pet-friendly or not
  - allow user to upload pictures in the comment section.
  - Hours section to show the opening and closing time 
- Enable Third-Party login: allows users to log in through third party account instead of creating new accounts
- Add friend and chat: Enrich the social function of this app by allowing users to add other uers as friends and chat with thier friends.Currently, our subcribe and notify function has done part of this work by allowing users to follow other users' update on this app. By adding friend and chat function, we want to expand on the this system and build strong community connections among users.

## List of contributions
Highlight areas where each team member contributed significantly. [2-3 sentences per team member]
It is very clear which team member worked on which parts of the application. The documentation describes at least one area/issue/technology where each team member took a substantial leadership role, and that team member’s contribution is reflected in the project.
