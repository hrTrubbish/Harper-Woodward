<div align="center">
  <h1>Harper Woodward</h1>
</div>

A web application for holding live stream concerts with live chat between the viewers and country artist, Harper Woodward. The app will require authentication and be a secure space for the artist to reach out to their audience. Past concerts will be viewable on the site for those who were not there for the live stream performance.

## Authors
- [Brett Eastman](https://github.com/BrettEastman)
- [David Zhang](https://github.com/davidzny195)
- [George Khoury](https://github.com/khouryg)
- [Jerrod Varney](https://github.com/jerrodvarney)
- [Kevin Le](https://github.com/kevinleaves)
- [Tyler Towery](https://github.com/tylertowery)
- [Zhixiang Peng](https://github.com/VesLan)

## Tech Stack

 **Frontend**
 <br>
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

**Backend**
<br>
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![WebRTC](https://img.shields.io/static/v1?style=for-the-badge&message=WebRTC&color=333333&logo=WebRTC&logoColor=FFFFFF&label=)

**Database**
<br>
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)




## Features

### Live streaming of concerts

* Implemented using MediaSoup, Web RTC, and Socket.io to provide a scalable solution for real-time video and audio streaming of concerts.

### Live chat with fans

* Designed a chat feature using Socket.io and authentication services, which allowed fans to interact with each other and with the musician during concerts.

### User authentication and authorization

* Established a secure authentication system utilizing Firebase, which allowed users to create accounts, log in securely, and interact with chat.




## Preview
<p float="left">
  <img alt="demo image" src="https://user-images.githubusercontent.com/76603041/226150506-4cc02b3c-812c-4e5e-a301-cae044e86b2d.gif" width="49%"/>
  <img alt="demo image" src="https://user-images.githubusercontent.com/76603041/226150762-e5a97282-8f9d-46b7-801a-75c1ea49b6f6.gif" width="49%"/>
</p>

<p float="left">
  <img alt="demo image" src="https://user-images.githubusercontent.com/76603041/226150511-43a410f8-00df-48c0-8730-4b01ee7a92b0.gif" width="49%"/>
  <img alt="demo image" src="https://user-images.githubusercontent.com/76603041/226150503-0f3d9016-6da6-4f2a-8c5e-f82bba1b8bd2.gif" width="49%"/>
</p>

<p float="left">
  <img alt="demo image" src="https://user-images.githubusercontent.com/76603041/226150266-15c1c6cf-1619-465f-a528-899ab39ad764.gif" width="49%"/>
  <img alt="demo image" src="https://user-images.githubusercontent.com/76603041/226150276-e4f8477c-2ee9-46d5-b099-aeba1194852f.gif" width="49%"/>
</p>




#### Dev Environment Setup and Support For Mediasoup

In order to run mediasoup, you must ensure your development environment has the following dependencies:
* C++ Compiler
* Python Version 3.9+
* GNU Make

For more details and specifics for your OS and the exact dependencies required, please visit the following link which will take you to the Mediasoup installation instructions: https://mediasoup.org/documentation/v3/mediasoup/installation/


## Run Locally

```bash
git clone  https://github.com/hrTrubbish/Harper-Woodward.git
```



#### Go to the project directory

```bash
cd Harper-Woodward
```

- Create a `.env` file like `example.env`


#### Install dependencies

```bash
npm install
```



#### Start the server

```bash
npm run dev
```


The app is ready at http://localhost:3000/



## Requirements

* Web browser
* npm
* Homebrew
* Python
* Make
* Linux, macOS, or Windows
