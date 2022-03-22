'use strict';

const {
  db,
  models: {
    User,
    Recipe,
    RecipeIngredient,
    ShoppingList,
    ShoppingListIngredient,
    Ingredient,
    Pantry,
    PantryIngredient,
  },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'admin', password: '123' }),
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ]);

  const [thursday, margaritaTime, boozeRun, needProduce] = await Promise.all([
    ShoppingList.create({ name: 'thursday' }),
    ShoppingList.create({ name: 'margaritaTime' }),
    ShoppingList.create({ name: 'boozeRun' , status: 'closed', totalCost: 72 }),
    ShoppingList.create({ name: 'needProduce' }),
  ])

  const admin = await User.findOne({ where: { username: 'admin' } });

  const pantry = await Pantry.create({
    name: 'adminPantry',
  });

  const pantry2 = await Pantry.create({
    name: 'adminPantry2',
  });

  const pantry3 = await Pantry.create({
    name: 'adminPantry3',
  });

  thursday.setUser(admin)
  margaritaTime.setUser(admin)
  boozeRun.setUser(admin)
  needProduce.setUser(admin)

  const [carrot, tofu, wine, mochi, cereal, pasta, bourbon] = await Promise.all(
    [
      Ingredient.create({
        name: 'carrot',
        uom: 'lb',
        type: 'produce',
        caloriesPerUnit: 200,
        proteinPerUnit: 0,
        carbsPerUnit: 21,
        fatsPerUnit: 200,
      }),
      Ingredient.create({
        name: 'tofu',
        uom: 'oz',
        type: 'meat',
        caloriesPerUnit: 50,
        proteinPerUnit: 50,
        carbsPerUnit: 0,
        fatsPerUnit: 3000,
      }),
      Ingredient.create({
        name: 'wine',
        uom: 'fl-oz.',
        type: 'beverage',
        caloriesPerUnit: 3000,
        proteinPerUnit: 4000,
        carbsPerUnit: 22,
        fatsPerUnit: 0,
      }),
      Ingredient.create({
        name: 'mochi',
        uom: 'oz',
        type: 'produce',
        caloriesPerUnit: 500,
        proteinPerUnit: 20,
        carbsPerUnit: 0,
        fatsPerUnit: 900,
      }),
      Ingredient.create({
        name: 'cereal',
        uom: 'oz',
        type: 'dry goods',
        caloriesPerUnit: 10000,
        proteinPerUnit: 90000,
        carbsPerUnit: 0,
        fatsPerUnit: 900,
      }),
      Ingredient.create({
        name: 'pasta',
        uom: 'oz',
        type: 'dry goods',
        caloriesPerUnit: 1,
        proteinPerUnit: 20,
        carbsPerUnit: 0,
        fatsPerUnit: 900,
      }),
      Ingredient.create({
        name: 'bourbon',
        uom: 'oz',
        type: 'beverages',
        caloriesPerUnit: 40,
        proteinPerUnit: 0,
        carbsPerUnit: 0,
        fatsPerUnit: 0,
      }),
    ]
  );
//ShoppingList
  await boozeRun.addIngredient(wine, { through: { shoppingListQty: 2 } })
  await boozeRun.addIngredient(bourbon, { through: { shoppingListQty: 1 } })

  await margaritaTime.addIngredient(carrot, { through: { shoppingListQty: 6 } })
  await margaritaTime.addIngredient(mochi, { through: { shoppingListQty: 2 } })

  await needProduce.addIngredient(carrot, { through: { shoppingListQty: 10 } })

  //Pantry
  await pantry.addIngredient(carrot, {
    through: { pantryQty: 3, uom: 'lb', cost: 4.5 },
  });
  await pantry.addIngredient(tofu, {
    through: { pantryQty: 7, uom: 'oz', cost: 2.25 },
  });
  await pantry.addIngredient(wine, {
    through: { pantryQty: 15, uom: 'fl-oz.', cost: 14.5 },
  });
  await pantry.addIngredient(mochi, {
    through: { pantryQty: 6, uom: 'oz', cost: 12.5 },
  });

  await pantry2.addIngredient(cereal, {
    through: { pantryQty: 3, uom: 'oz', cost: 5.0 },
  });
  await pantry2.addIngredient(pasta, {
    through: { pantryQty: 10, uom: 'oz', cost: 200.0 },
  });
  await pantry2.addIngredient(bourbon, {
    through: { pantryQty: 4, uom: 'oz', cost: 3000.0 },
  });

  await pantry3.addIngredient(cereal, {
    through: { pantryQty: 1, uom: 'oz', cost: 5.0 },
  });
  await pantry3.addIngredient(pasta, {
    through: { pantryQty: 1, uom: 'oz', cost: 200.0 },
  });
  await pantry3.addIngredient(bourbon, {
    through: { pantryQty: 1, uom: 'oz', cost: 3000.0 },
  });

  await pantry.setUser(admin);
  await pantry2.setUser(admin);
  await pantry3.setUser(admin);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
