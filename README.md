# Phonebook

## Background

The app has been created in Full Stack Open 2018 course by University of Helsinki. The search function and visual appearance has been improved afterwards.

## Function

The app is a simple demo where persons and their phone numbers can be added to a list. Data is saved in MongoDB database. Person information can be removed from the list by using 'Remove' button.

## Usage

The app can be started in https://rocky-sands-15953.herokuapp.com/.

Alternatively it can be started in local development environment by first cloning this and the following frontend repository https://github.com/Duukkis8D/Full_Stack_Open_2018_osa_3_frontend in separate directories.

After that the value of the baseUrl variable in the frontend repository's src/services/persons.js file should be changed to `'http://localhost:3001/api/persons'`.

Finally the app is started by using `npm run watch` in backend directory and `npm start` in frontend directory. Last mentioned opens the app in browser in address `http://localhost:3000/`. Remember to use different terminal windows for frontend and backend!