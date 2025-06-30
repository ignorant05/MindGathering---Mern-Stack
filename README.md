# MindGathering

## Description

A simple DIY full-stack webapp built for learning purposes.
The web app is simply an imitation for blog post web app.

---

##   Stack

<details>
<summary><strong>Frontend</strong></summary>
<br>

- React v20.
- Tailwindcss.
- Nginx.

</details>

<details>
<summary><strong>Backend</strong></summary>
<br>

- Nodejs + Expressjs.
- Mongodb.
- Docker + docker compose. 
- Supports user authentication using jwt appoach.

</details> 

> *Note:* You can check the .env file if you want to check or change the expiration date, the secret key (for both access and refresh tokens) & db credentials.

---

##   Project layout

<details>
<summary><strong>MindGathering</strong></summary>
<br>

```text.
├── backend
│   ├── AuthServer.js
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── configuration
│   │   │   └── MongoDBConfig.js
│   │   ├── controllers
│   │   │   ├── AuthController.js
│   │   │   ├── BlogController.js
│   │   │   └── CommentController.js
│   │   ├── middlewares
│   │   │   └── AuthMiddleware.js
│   │   ├── models
│   │   │   ├── BlogModel.js
│   │   │   ├── CommentModel.js
│   │   │   ├── ImageModel.js
│   │   │   ├── RefreshTokenModel.js
│   │   │   └── UserModel.js
│   │   ├── router
│   │   │   ├── AuthRouter.js
│   │   │   └── UserRoutes.js
│   │   └── utils
│   │       └── TokensUtils.js
│   └── UserServer.js
├── docker-compose.yaml
├── frontend
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── nginx
│   │   └── nginx.conf
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── src
│   │   ├── app
│   │   │   ├── api
│   │   │   │   └── apiSlice.jsx
│   │   │   └── store.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   ├── default_picture.png
│   │   │   └── logo.jpg
│   │   ├── components
│   │   │   ├── BlogCard.jsx
│   │   │   ├── CommentCard.jsx
│   │   │   ├── shared
│   │   │   │   └── Navbar.jsx
│   │   │   └── UserCard.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── redux
│   │   │   └── slices
│   │   │       ├── authApiSlice.jsx
│   │   │       ├── authSlice.jsx
│   │   │       ├── commentApiSlice.jsx
│   │   │       ├── commentsSlice.jsx
│   │   │       ├── draftApiSlice.jsx
│   │   │       ├── draftSlice.jsx
│   │   │       ├── pageSlice.jsx
│   │   │       ├── readBlogSlice.jsx
│   │   │       └── usersApiSlice.jsx
│   │   └── screens
│   │       ├── BlogViewScreen.jsx
│   │       ├── CreateBlogScreen.jsx
│   │       ├── EditBlogScreen.jsx
│   │       ├── EditProfileScreen.jsx
│   │       ├── HomeScreen.jsx
│   │       ├── LoginScreen.jsx
│   │       ├── MyBlogsListScreen.jsx
│   │       ├── MyCommentsListScreen.jsx
│   │       ├── RegistrationScreen.jsx
│   │       ├── SeeOtherUserProfileScreen.jsx
│   │       └── SeeProfileScreen.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
├── package.json
├── package-lock.json
└── README.md

```

</details>


---

##   Installation 

```bash
# Clone the project or download the it's zip file
$ git clone 
```

> *Note:* docker and docker compose are required here otherwise you need to install all the dependencies for both backend and frontend, so make sure docker is installed, enabled and started. 

---

##   Deployment

just run :

```bash
$ sudo docker-compose up --build
```

Optionally you can build and clean it before you re-deploy it again: 

```bash
$ sudo docker-compose down 
$ sudo docker-compose build --no-cache
```

