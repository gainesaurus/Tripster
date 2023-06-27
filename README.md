# Vakay - The Ultimate Trip Planning App

Welcome to Vakay, the app that makes it easy to plan your trips with friends and family. With Vakay you can share locations, lodging, photos, and events with your fellow travelers, all in one convenient place.

## Screenshots

![2022-12-13 (5)](https://user-images.githubusercontent.com/110689119/207482598-62b3b845-6252-41b6-9c28-7bc229ea638e.png)
![2022-12-13](https://user-images.githubusercontent.com/110689119/207482601-6f104eeb-1335-4b0d-bdd5-071c9709ed59.png)
![2022-12-13 (3)](https://user-images.githubusercontent.com/110689119/207482593-011f481b-67ac-4bec-bef7-a74ec4759951.png)
![2022-12-13 (4)](https://user-images.githubusercontent.com/110689119/207482595-69bd04fe-d1a6-4e00-98c8-61ab946cba91.png)
![2022-12-13 (2)](https://user-images.githubusercontent.com/110689119/207482602-07660c3a-7188-4874-aadb-616d4e8e5c9a.png)
![2022-12-13 (6)](https://user-images.githubusercontent.com/110689119/207482599-d0c58c92-1293-4e64-bc89-33092457ddaf.png)

## Features

- Create and manage trips with your friends and family
- Invite others to join your trips
- Share locations, lodging, photos, and events with your fellow travelers
- View all trip details in one convenient location

## Development

If you want to contribute to the development of Vakay, follow these steps:

1. Clone the Vakay repository from GitHub:

```console
$ git clone https://github.com/gainesaurus/Vakay
```

2. Navigate to the root folder of the repository and install the dependencies:

```console
$ cd Vakay
$ npm i
```

3. Create a file called `.env` in the root folder and add the following environment variables:

```js
//These are accessable through your Firebase account, just add a new project!
NEXT_PUBLIC_API_KEY=<your_API_key>
NEXT_PUBLIC_AUTH_DOMAIN=<your_public_auth_domain>
NEXT_PUBLIC_PROJECT_ID=<your_project_id>
NEXT_PUBLIC_STORAGE_BUCKET=<your_storage_bucket>
NEXT_PUBLIC_MESSAGING_SENDER_ID=<your_message_sender_id>
NEXT_PUBLIC_APP_ID=<your_app_id>
NEXT_PUBLIC_MEASUREMENT_ID=<your_measurment_id>

//Also from your Firebase account 
GOOGLE_APPLICATION_CREDENTIALS=<path_to_your_google_credentials_.json_file>
  
//Credentials for initAuth, these can be anything!
COOKIE_SECRET_CURRENT='anyRandomString',
COOKIE_SECRET_PREVIOUS='randomStringAgain',

//Create a google cloud account to get a maps API key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<your_google_maps_API_key>

CONNECTION_DB=<your_mongoDB_connection_URI>
NEXT_PUBLIC_BASE_URL=<your_base_URL / http://localhost:3000>
```

4. Run the app: This is a Next.js app, so you can start the app in one command from the root folder.

```console
$ npm run dev
```
  
## Support

If you have any questions or need help using Vakay, Send a pull! We are happy to assist you!
















