# Chat application :speaking_head: - Final project
ECE - Web Application S2 2021/2022

## Short Description

This repository contains our final Webtech project. It is a simple chat application that aims to provide the most basic functionnalities of a private chat app. Unfortunately, the lack of time to finalize this project did not allow us to develop all the features as we would have liked.

## Run it 🏃

### On production 🌐
* Clone our repository
```bash
git clone git@github.com:Mohamed-Hacene/webtech.git
cd webtech
```

* Start the conainer for Dex:
```bash
docker-compose up
```

* Start back-end:
```bash
cd packages/back-end
npm install
npm start
```

* Start front-end, this will automatically take you to http://localhost:3000/:
```bash
cd packages/front-end
npm install
npm start
```

### On development ⚙️

Go into [back-end](./packages/back-end/README.md) to see details

## Tasks 🛠️

### Project management 👨‍💼

* Naming conventions and code quality

We have tried to respect as many conventions as possible, from variable to folder names. We also paid a lot of attention to git comments.

* Project structure

``` 
    .
    ├── .github/worflows
    ├── packages               
    │   ├── back-end 
    |   |   ├── ...
    │   ├── dex   
    |   |   ├── config.yml
    │   ├── front-end  
    |       ├── ...
    ├── README.md                          
    └── docke-compose.yml   
```

* Code Quality

Code quality is a very important thing in a project. We used a linter "camelCase" to verify our code but we could have automated it to verify each file that we pushed on the repository. 

* Git/DevOps <img height="18px" alt="git" src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png"/>

We created a simple yaml file to run unit tests on back-end each time we push or make a pull-request on the main branch. 
You can find it [here](./.github/worflows/node.js.yml). We could have added unit tests for front-end and make an other worflow for functionnal tests but we didn't have time to do it.
Concerning Git, as we said earlier we tried to have a very clean repo and a good commit history.

* Design/UX

 Considering design and UX, we decided to use as much Material UI components as we could when creating forms and when structuring pages. Material UI is well designed and easy to use

### Application development 👨‍💻

* A Welcome/Login screen

You can test our application with our test accounts: test@example.com, ambroise@example.com, mohamed-hacene@example.com. They all have the same password:"password"
(It's sometimes necessary to logout two times to change your account if it didn't work on the first shot).

* Sign-in feature

We created a button to signin on the login page but this feature is not developed yet on our application.

* Message modification

We implemented an "update" button just next to the informations about each message to permits to change them as we want. You can only update your messages, not the others. Yet, we have a problem with this button, we can only update the first message of a channel, unfortunately we didn't have time to find and fix this issue.

* Message deletion

We implemented a "delete" button just next to the informations about each message to permits to delete them as we want. You can only delete your messages, not the others.
 
* Channel management

You can create as many channels as you want, you just have to click on the "+ create channel" button in the channels list, and find a name. You can also delete a channel with the "delete" button on its right.

## About Us 👨‍🎓

- Mohamed-Hacene BOUKERMA https://github.com/Mohamed-Hacene

- Ambroise ROUXJEAN https://github.com/AmbRXJN
