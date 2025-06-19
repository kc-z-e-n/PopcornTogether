<h1 style="text-align:center;">Orbital 25 Milestone 2</h1>
<h2 style="text-align:center;">Popcorn Together</h2>

![title](Images/PT_logo_copy.jpg)

<h2 style="text-align:center;">Apollo 11</h2>
<p style="text-align:center;">Gan Ting En</p>
<p style="text-align:center;">Kasey Choo</p>

<div style="page-break-after: always;"></div>

# Table of Contents

## [Project Overview](project-overview)
- [Objectives](#objectives)
- [Requirements](#requirements)
  - [Obesrvations](#observations)
  - [User Stories](#user-stories)
  - [Analysis](#analysis)
  - [Developer Requirements](#developer-requirements)
- [Development plan](#development-plan)
- [API Usage](#api-usage)

## **Features**
- [Account](#account)
- [Movie Search](#movie-search)
- [Watched List](#watched-list)
- [Wishlist](#wishlist)
- [Friends List](#friends-list)
- [Watch Statistics](#watch-statistics)
- [Community Reviews](#community-reviews)
- [Movie Match](#movie-match)

<div style="page-break-after: always;"></div>

## Project Overview
With the proliferation of movies in cinemas and streaming platforms, it may be overwhelming for users to identify what movies they would like to watch. This is especially so when they are searching with friends and family, trying to find a  film they can watch together.

Ever wondered what movies you have already watched or which of the hundreds of thousands should be next on your wishlist? Popcorn Together seeks to provide a solution to the Movie Weekend conundrum. 

Aditionally, the movie experience can be enhanced when undertaken with friends, making features that support this shared entertainment experience an even seamless one.

### Tech Stack

- **Backend**: MongoDB, Express, Node
- **Frontend**: React

### Popcorn Together's value
---

The proposed web application Popcorn Together seeks to create a platform where movie enjoyers can go to consolidate their movie-going journey, allowing them to record their watches, as well as track films they want to watch. Furthermore, with a friends list integration, we empower users to find common movies to watch with their friends.

### Personal note
---
Through this project, we aim to pick up industry relevant software engineering skills and practices. Additionally, the project is one that we believe can add value to one's leisure time by reducing the effort spent on collating one's watch history and finding movies.

## Objectives
This project aims to create a platform for users to maintain an account with information on movies they have and watched and want to watch. It also provides discovery functions where users can find movies through active searching or through friends they have connected with.

## Requirements
## Observations
| Identified area                   | User needs                                   |
|-------------------------------------------|---------------------------------------------|
|Unsure of what movie to watch|More avenues to discover movies that interest them |
|Forgot what movies they have watched|A way to track movies that they have already watched|
|Difficulty finding films to watch with friends|A feature to match movies two or more users would like to watch|


## User stories
- As a user who wants to find a movie that fits my mood today, I want to be able to type genres etc. I want to use  the search bar to find movies that apply.  
- As a user who wants to see if a movie is worth watching or not.  
- As a user who wants to remember what kind of movies I have watched and also want to watch.  
- As a user who wants to see what my friends are watching, I want to add them to my friends list to keep track and stay connected with them.  
- As a user who wants to find a movie both my friends and I will enjoy.

## Analysis
 Pain Point |  App Requirements |
|-----------------------------------------------|---------------------------------------------|
|Unsure of what movie to watch | Search functions made for active finding of specific movies that fit the user's preferences as well as passive methods to push movie recommendations for the user to discover |
|Forgot what movies they have watched|Allow users to find and record all films they have watched before|
|Difficulty finding films to watch with friends|A friends list with shareable records of previously watched movies and wishlisted movies, providing ways to narrow down their search for movies to watch together by eliminating previously wathced movies and by checking for matching wishlists|
|As a user who wants to see if a movie is worth watching or not|Include a communnity review function. While opinions on movies are quite subjective, allowing users to read reviews by others who have already watched the film can provide insight and help users decide if they want to watch the film|
|As a user who wants to remember what kind of movies I have watched and also want to watch|Develop a feature to record aspects of movies saved in a user's watched lsit into meaningful analytics for their use|

## Developer requirements
The crux of the issue we have identified is the ability to find new movies to watch. The most important thing to consider in achieving this is narrowing the options as much as possible. PopcornTogether will form a collaborative effort with the user in this filttering process. Users can actively search for new movies and record movies they ahve already watched, PopcornTogether will provide robust features that allows users to discover new movies through a variety of methods, each with its own strength. Furthermore, through the compilation of statistics of the user's watch habits, the user can have more insight into what type of movies they may prefer.

With so many funcitons serving different purposes, the user can become lost and not maximise the use of each one. There
should be dedicated pages for each function, and detailed information for each fucntion's usage. 

 Powerful search and filter functions enable easy user queries when searching for movies, while a robust profile system enables discovery of new movies to watch together with friends or simply by themselves. 

## Development plan
- **Milestone 1 (Week 1 - 3)**: Technical proof of concept  
  - A minimal working system with both frontend and backend integrated for core features   
  - Develop Login features
  - Watchlist and wishlist is able to store movie data  

- **Milestone 2 (Week 4 - 8)**: Prototype  
  - Database integration added  
  - Querying of database implemented 
  - A working system with the core features 
    - Account registration
    - Profile
    - Watchedlist
    - Wishlist
    - Movie Search
  - User has edit access for the watchedlist  
  - The app produces a list of movies given a set of filters  

- **Milestone 3 (Week 9 - 12)**: Extended system  
  - A working system with both the core and extension features  
  - Users can add reviews to movies, which are then stored and retrieved from the database  
  - Movie match feature implemented for alternate movie discovery  

- **Milestone 4**: Testing and debugging

## API Usage
MongoDB : database for storing user information
TMDB (The movie database) : database for querying movie information

## Completed features
- Webapp: Hosted locally on localhost
- Account registration: User data stored using  mongoDB integration
- Account login: Implemented using Express

## Features

| Feature | Description                   | Purpose                                   |
|----|-----------------------------------------------|---------------------------------------------|
| Account  | Allows user to maintain their data. |Serves as a way to track their movie journey |
| Movie Search  | Basic search function, allows users to search based on film title, genre, language or release date | Provides a way for users to search for a specific movie, or discover movies by specifying certain paramenters|
|Watched list | Stores all the movies the user has watched before |Allows the user to track their films, it serves as their record so they do not double watch movies. It can also give them inspiration for films they could watch based on what they have enjoyed in the past.|
|Wishlist|User can add movies they want to watch in the future here |Track movies that the user is interested in but hasnt gotten around to watching. With limited time to pursue leisure activities, users may nnot be able to watch every film immediately, the wishlist serves as a reminder for films they want to watch in the future|
|Friends list|Allows users to connect with one another, friends can view each others watched lists and wishlists|For friends who want inspiration, they can browse through their friends' lists. For friends looking for a movie to watch together, they can find common movies in their wishlists.|
|Watch Statistics|Tracks data based on movies they add to their watchedlist, for example, top genre|Gives the user some basic insights into what kind of movies they have enjoyed before, as well as their most watched genre. The watch statistics seek to provide users information on their watch habits for their movie hunt|
|Community reviews|Allow users to pool reviews on movies they have watched|Gives users a better idea of what they can expect from movies they are interested in|
|Movie Match|For users who are unsure of what movie they want to watch, they would be able to specify a set of filters and random films will be generated and suggested to the user. We aim to mimic a social media for-you page layout for this|With a general idea of what kind of film they want to watch, users can begin to browse for movies that interest them. This feature targets users who do not know the exact movie they want to watch or are just looking for more|

## Account
Core feature 

Users will first find themselves on the landing page where they can access the registration and login features. By creating an account, we are able to assign the user to their very own watched list and wishlists, as well as provide information on their watch statistics. 

<ins>Authentication page</ins>
![auth page](Images/auth_page.png)

Users will first arrive at this page where they can then create an account or login in with their existing account.

<ins>Register page</ins>
![register page](Images/register_page.png)

Users will register for an account on this registration page, or access the login page if they already have an account. The user information will be stored on MongoDb

<ins>MongoDB</ins>

![mongodb](Images/mongodb.png)

This project uses MongoDB Atlas, a cloud-hosted NoSQL database, to securely store and manage all user-related data. MongoDB’s flexible document structure makes it ideal for our needs, including handling dynamic user preferences and relationships.

This includes storing the below data in order to enable ths web application's features:

1. Users
```
{
  "_id": "...",
  "firstName": "Test",
  "lastName": "1",
  "username": "test1",
  "email": "test@example.com",
  "password": "...",
}
```

2. Watchedlists
```
{
  "userId": "ObjectId",
  "movies": [
    { "movieId": "123", "title": "Inception", "watchedAt": "2025-06-01T22:00:00Z" }
  ]
}
```

3. Wishlists
```
{
  "userId": "ObjectId",
  "movies": [
    { "movieId": "456", "title": "The Matrix" }
  ]
}
```

4. Friends list
```
{
  "userId": "ObjectId",
  "friends": [
    { "friendId": "ObjectId", "username": "janedoe" }
  ]
}
```

Furthermore, MongoDB provides certain security features such as hashing passwords using bycrypt before storing, and access to the MongoDB API being secured using environment variables and IP whitelisting.

<ins>Login page</ins>
![login page](Images/login_page.png)

Users will login through the login page

## Movie Search
Core feature

The movie search feature will be the main way users can search for movies, the basic search function. It makes use of The Movie Database (TMDB) to handle queries. We plan to include filters for the following:
1. Title
2. Genre
3. Release year
4. Language

<ins>The Movie Database (TMDB)</ins>

<img src="Images/Tmdb.new.logo.svg.png" alt="mongodb" width="250" height="200"/>


We use TMDB as our primary source of movie data. TMDB provides a robust and comprehensive API that allows us to access up-to-date information on thousands of movies, TV shows, cast members, genres, and more.

Upon user input (searching by title, genre, language, or year), our backend queries the TMDB API to retrieve relevant movie data. This data is then displayed on the frontend for user interaction.

 After successful query, the users will be able to view the following page which provides them with several actions. 

 1. Users can mark a movie as watched, which is then logged in the <ins>watchedlists</ins> collection for future reference or social sharing.
2. Users can save movies they are interested in watching later. This is stored in the MongoDB <ins>wishlists</ins> collection.

## Watched List
Core feature

This page will display all the movies that the user has marked as watched. The data will be stored in MongoDB. We will also make use of the movies added to the watchedlist to compile statistics for our watch statistics feature. This collects information on the movies the user has watched to provide insight into their watch preferences and history.

## Wishlist
Core feature

This page allows users to record down movies that they wish to watch in the future but do not have time for now. The purpose of this feature is:
1. Help the user track the movies they have not gotten around to watching.
2. Help friends discover common movies they can watch together

The data will be stored in MongoDB. 

Together, the watchedlists and wishlists address the user concern that we have identified
> As a user who wants to remember what kind of movies I have watched and also want to watch.  

## Friends List
Core feature

## Watch Statistics
Core feature

## Community Reviews
Extension

## Movie Match
Extension