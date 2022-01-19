# Shopify backend development internship 2022 challenge

Shopify coding challenge for summer 2022 backend and production engineer.

# Setup

To run this application you would need a few things:

- NodeJS (v17.3.0)
- Git

Type `node --version` on your device's command line/terminal to check if you have NodeJS installed. I recommened updating to/install the version specified above for best results.

Type `git --version` on your device's command line/terminal to check if you have Git installed. If you do not have Git installed on your system, visit this [link](https://git-scm.com/downloads).

If you do not have NodeJS installed one your machine, visit this [link](https://nodejs.org/en/download/) to set it up.

After you have installed NodeJS, clone this repository from github:

`git clone https://github.com/gauthamdk/shopify-backend-2022.git`

- If you received the `environment_variables.txt` file in the submission of my application, follow the steps below or skip to [Frontend only](#frontend-only):

## Frontend and backend

1. In the server folder, create a new file `.env`, and copy and paste the contents from the `environment_variables.txt` file into it (This is the MongoDB_URI link)

2. From your command line/terminal, navigate to the root folder and run `npm install` to install the common dependency.

3. In the same root folder and run `npm run install` to install all the dependencies for the frontend and server.

4. In the same root folder, run `npm run dev` to start up the backend and frontend.

5. On your browser, go to http://localhost:3000 and the application should be running!

## Frontend only

1. From your command line/terminal, navigate to this folder and the frontend subfolder and run `npm install` to install all the dependencies.

2. In the same frontend folder, open the [package.json](./frontend/package.json) file and replace the line `"proxy": "http://localhost:8080"` with `"proxy": "https://shopify-backend-summer-2022.herokuapp.com"` to redirect to the backend that is hosted.

3. In the same frontend folder, run `npm run start` to start up the local frontend.

4. On your browser, go to http://localhost:3000 and the application should be running!

NOTE: The backend is hosted on Heroku for security purposes due to the environment keys needed to connect to the MongoDB database.

# Usage

1. To add a new item, click on the plus icon at the top left and enter the details in the form.

2. The edit and delete buttons the right of the item will allow you to edit and delete individual items.

3. The download icon the top right will export the data to a csv file which will be downloaded to your machine.
