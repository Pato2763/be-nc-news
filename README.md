# Northcoders News API

The link for the hosted version of this proect is: [here](https://be-nc-news-5a06.onrender.com/api). This will bring you to the `/api` endpoint which has information about all the other endpoints with possible queries as well as expected outputs.

## Project Summary

The purpose of this project was to build an API for the purpose of accessing data programatically. The intention was to mimic the building of a real world backend service which should provide information to the front end architecture. This was done using `node.postgres` for querying the database and `express` for the web framework. By the end of the project I have been able to demonstrate that I can:

- Query a database.
- Use a TDD approach to cover both the happy and error paths.
- Set a RESTful API with a number of endpoints which cover CRUD operations.
- Set up parametric endpoints.
- Handle complex queries.
- Manipulate data to respond to client requirements.
- Host my server and DB.

## Getting Started

Inside the directory you want this repository to be, run the commands:

```
git clone https://github.com/Pato2763/be-nc-news.git
cd be-nc-news
```

In order to get the dependencies run the following command in the terminal at the root of the repo:

```bash
npm install
```

the minimum version requirements are:

- `Node.js` v22.6.0.
- `Postgres` v8.7.3.

you will need to create `.env` files in order to set the environment variables. in a file called `.env.development`add the following inside:

```
PGDATABASE=nc_news
```

In a file called `.env.test` add the following inside:

```
PGDATABASE=nc_news_test
```

To set up the databases and seed them for the first time run:

```
npm run setup-dbs
npm run seed
```

To run the tests for the API use:

```
npm test
```

this uses the test database. If you want to access the API through an API development platform such as [insomnia](https://insomnia.rest/) then run the following in the terminal:

```
npm run start
```

this will be connected to the 9090 port.

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/). For more information on me

my LinkedIn can be found [here](www.linkedin.com/in/patd2763). I'd be very happy to connect with anyone who's stumbled across this repo
