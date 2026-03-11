# Watch Later (GraphQL Edition)

## Overview
Watch Later is a MERN stack application that allows users to search movies and TV shows using the OMDb API and save them to a personal watch list.

This version refactors the backend from **REST** to **GraphQL using Apollo Server**, with the frontend communicating through **Apollo Client**.

Users can:
- search movies and series
- create an account
- log in
- save titles to a Watch Later list
- remove titles from the list

---

## Technologies
- React
- React Router
- Apollo Client
- Node.js
- Express
- Apollo Server
- GraphQL
- MongoDB
- Mongoose
- JWT Authentication
- OMDb API

---

## GraphQL Operations

### Query

```graphql
query Me {
  me {
    _id
    username
    email
    savedTitles {
      imdbID
      title
    }
  }
}
```

### Mutations


```graphql
mutation Login {
  login(email: "email", password: "password") {
    token
  }
}

mutation AddUser {
  addUser(username: "username", email: "email", password: "password") {
    token
  }
}

mutation SaveTitle {
  saveTitle(input: {...}) {
    savedTitles {
      title
    }
  }
}

mutation RemoveTitle {
  removeTitle(imdbID: "tt123456") {
    savedTitles {
      title
    }
  }
}
```

## Installation

```bash
git clone https://github.com/YOUR_USERNAME/watch-later-graphql.git
cd watch-later-graphql
```

### Install dependencies

```bash
npm install-all
```
---

## Environment Variables

Create a file:
```code
client/.env
```

Add your OMDb key:
```code
VITE_OMDB_API_KEY=YOUR_KEY
```


