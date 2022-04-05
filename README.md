![](./public/logo.png)

## About

Fullsnack is an all-in-one kitchen app for managing foods in a user’s shopping lists, pantries, and recipes. By adding recipes to their collection, Fullsnack does the work of putting necessary ingredients on their shopping list, as well as tracking the items they already have. Fullsnack also tracks the nutritional data of the foods they eat and builds engaging visualizations of their habits.

## Setup

- `npm install`
- Create a postgres database:

```
createdb fullsnack
```

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)

## Heroku Deployment
- [Fullsnack](https://fullsnack-fsa.herokuapp.com/)

## Creators

- [Evan Garris](https://www.linkedin.com/in/evangarris)
- [David Dunham](https://www.linkedin.com/in/david-w-dunham/)
- [Harrison Lynch](https://www.linkedin.com/in/lynchharrison/)
- [Kevin Veloso](https://www.linkedin.com/in/kvcodesnacts/)

## Attributions

- [Edamam API](https://www.edamam.com/)
- [Victory](https://formidable.com/open-source/victory/)
