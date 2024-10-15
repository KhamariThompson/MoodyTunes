Moodify 🎵
Moodify is a simple application that recommends playlists or songs based on the user's current mood. The app is built with Java using Spring Boot for the backend and utilizes Firebase Firestore as the database for storing user and mood data.

📖 Table of Contents
Overview
Schema
Data Models
Networking
Sprint Planning
Resources
Overview
Moodify aims to enhance the user's music experience by suggesting playlists that match their mood. Users can select their current mood from a list, and the app will recommend appropriate playlists or songs.

📊 Schema
Data Models
Firestore Collections and Documents
1. Users Collection
   Purpose: Store user information and preferences.

Document ID: userId (Unique identifier for each user)

Fields:

Field	Type	Description
username	String	User's display name
email	String	User's email address
favoriteMoods	Array of Strings	List of user's favorite moods
createdAt	Timestamp	Account creation date
updatedAt	Timestamp	Last update date
Sample Document:


2. Moods Collection
   Purpose: Store available moods for selection.

Document ID: moodId (Unique identifier for each mood)

Fields:

Field	Type	Description
name	String	Name of the mood (e.g., "Happy")
description	String	Description of the mood
createdAt	Timestamp	Date the mood was added
Sample Document:


3. UserMoods Collection (Optional)
   Purpose: Track mood selections by users over time.

Document ID: Auto-generated

Fields:

Field	Type	Description
userId	String	Reference to the user
moodId	String	Reference to the mood
selectedAt	Timestamp	When the mood was selected
Sample Document:



Networking
Planned Network Requests
At this stage, we are planning out the network requests that will be needed to create, store, and read data for our app. The external API integration (e.g., Spotify API) will be considered in future development phases.

Firestore Requests
Authenticate User

Method: Handled by Firebase Authentication
Description: Register new users or sign in existing users.
Fetch Available Moods

Method: GET
Endpoint: Firestore collection Moods
Description: Retrieve the list of moods available for selection.
Record User Mood Selection (Optional)

Method: POST
Endpoint: Firestore collection UserMoods
Description: Store the mood selected by the user along with a timestamp.
Update User's Favorite Moods

Method: PUT
Endpoint: Firestore document Users/{userId}
Description: Update the user's list of favorite moods.
External API Requests (Planned for Future Development)
Note: Integration with external APIs like Spotify will be planned and implemented in upcoming sprints. The following are the anticipated network requests:
Search for Playlists by Mood

Method: GET
Endpoint: /search
Parameters:
q: Mood name
type: playlist
Description: Fetch playlists that match the selected mood.
Get Playlist Details

Method: GET
Endpoint: /playlists/{playlist_id}
Description: Retrieve detailed information about a specific playlist.
🗓️ Sprint Planning
GitHub Project Management
We have set up a GitHub Project Board to manage and prioritize our work. The project is organized into milestones and issues derived from user stories.

Project Board
Columns:
To do
In progress
Done
Milestones

All issues have been added to the GitHub Project Board under their respective milestones and assigned to the appropriate columns.
