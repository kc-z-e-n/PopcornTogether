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

## **Features**
- [User-friendly interface and layout](#user-friendly-interface-and-layout)
- [User profile system](#user-profile-system)
- [Secure profile data](#secure-profile-data)
- [Discovering Mappings](#discovering-mappings)
- [Course reviews and comments](#course-reviews-and-comments)
- [Discussion forum](#discussion-forum)
- [Module planner](#module-planner)
- [Development plan](#development-plan)
- [API Usage](#api-usage)

<div style="page-break-after: always;"></div>

## Project Overview
With the proliferation of movies in cinemas and streaming platforms, it may be overwhelming for users to identify what movies they would like to watch. This is especially so when they are searching with friends and family, trying to find a  film they can watch together.

Ever wondered what movies you have already watched or which of the hundreds of thousands should be next on your wishlist? Popcorn Together seeks to provide a solution to the Movie Weekend conundrum. 

Aditionally, the movie experience can be enhanced when undertaken with friends, making features that support this shared entertainment experience an even seamless one.

### Popcorn Together's value
---

The proposed web application Popcorn Together seeks to create a platform where movie enjoyers can go to consolidate their movie-going journey, allowing them to record their watches, as well as track films they want to watch. Furthermore, with a friends list integration, we empower users to find common movies to watch with their friends.

### Personal note
---
Through this project, we aim to pick up industry relevant software engineering skills and practices. Additionally, the project is one that we believe can add value to one's leisure time by reducing the effort spent on collating one's watch history and finding movies.

## Objectives
This project aims to create a platform for users to maintain an account with information on movies they have and watched and want to watch. It also provides discovery functions where users can find movies through active searching or through friends they have connected with.

## Requirements

## Obesrvations
| Identified area                   | User needs                                   |
|-------------------------------------------|---------------------------------------------|
|Unsure of what movie to watch|More avenues to discover movies that interest them |
|Forgot what movies they have watched|A way to track movies that they have already watched|
|Difficulty finding films to watch with friends|A feature to match movies two or more users would like to watch|


## User stories
- As a user who wants to find a movie that fits my mood today, I want to be able to type genres or actors etc. I want to see into the search bar to find movies that apply.  
- As a user who wants to see if a movie is worth watching or not, I want to click into the community reviews section and see what other people are saying about it after watching.  
- As a user who wants to remember what movies I have watched and also want to watch, I want to enter the watch statistics page and view everything I have saved.  
- As a user who wants to see what my friends are watching, I want to add them to my friends list to keep track and stay connected with them.  
- As a user who wants to find a movie both my friends and I will enjoy, I hope to use the movie match feature to swipe on suggested movies together and see if there are any we both are interested in watching.

## Analysis


## Comleted features
- Webapp: Hosted locally on localhost
- Account registration: User data stored using  mongoDB integration
- Account login: Implemented using Express

## Features

| Feature | Description                   | Purpose                                   |
|----|-----------------------------------------------|---------------------------------------------|
| Account  | Allows user to maintain their data. |Serves as a way to track their movie journey |
| Movie Search  | Basic search function, allows users to search based on film title, genre, language or release date | Provides a way for users to search for a specific movie, or discover movies by specifying certain paramenters|
|Watchedlist | Stores all the movies the user has watched before |Allows the user to track their films, it serves as their record so they do not double watch movies. It can also give them inspiration for films they could watch based on what they have enjoyed in the past.|
|Wishlist|User can add movies they want to watch in the future here |Track movies that the user is interested in but hasnt gotten around to watching. With limited time to pursue leisure activities, users may nnot be able to watch every film immediately, the wishlist serves as a reminder for films they want to watch in the future|
|Friends list|Allows users to connect with one another, friends can view each others watched lists and wishlists|For friends who want inspiration, they can browse through their friends' lists. For friends looking for a movie to watch together, they can find common movies in their wishlists.|
|Watch Statistics|Tracks data based on movies they add to their watchedlist, for example, top genre|Gives the user some basic insights into what kind of movies they have enjoyed before, as well as their most watched genre. The watch statistics seek to provide users information on their watch habits for their movie hunt|
|Community reviews|Allow users to pool reviews on movies they have watched|Gives users a better idea of what they can expect from movies they are interested in|
|Movie Match|For users who are unsure of what movie they want to watch, they would be able to specify a set of filters and random films will be generated and suggested to the user. We aim to mimic a social media for-you page layout for this|With a general idea of what kind of film they want to watch, users can begin to browse for movies that interest them. This feature targets users who do not know the exact movie they want to watch or are just looking for more|

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