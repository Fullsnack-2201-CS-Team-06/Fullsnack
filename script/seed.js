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

  const [carrot, tofu, wine, mochi, cereal, pasta, bourbon] = await Promise.all([
    Ingredient.create({
      name: 'carrot',
      uom: 'lb',
      cost: 4.5,
      type: 'produce',
      caloriesPerUnit: 200,
      proteinPerUnit: 0,
      carbsPerUnit: 21,
      fatsPerUnit: 200,
    }),
    Ingredient.create({
      name: 'tofu',
      uom: 'oz',
      cost: 2.25,
      type: 'meat',
      caloriesPerUnit: 50,
      proteinPerUnit: 50,
      carbsPerUnit: 0,
      fatsPerUnit: 3000,
    }),
    Ingredient.create({
      name: 'wine',
      uom: 'fl-oz.',
      cost: 14.5,
      type: 'beverage',
      caloriesPerUnit: 3000,
      proteinPerUnit: 4000,
      carbsPerUnit: 22,
      fatsPerUnit: 0,
    }),
    Ingredient.create({
      name: 'mochi',
      uom: 'oz',
      cost: 12.5,
      type: 'produce',
      caloriesPerUnit: 500,
      proteinPerUnit: 20,
      carbsPerUnit: 0,
      fatsPerUnit: 900,
    }),
    Ingredient.create({
      name: 'cereal',
      uom: 'oz',
      cost: 5.00,
      type: 'dry goods',
      caloriesPerUnit: 10000,
      proteinPerUnit: 90000,
      carbsPerUnit: 0,
      fatsPerUnit: 900,
    }),
    Ingredient.create({
      name: 'pasta',
      uom: 'oz',
      cost: 200.00,
      type: 'dry goods',
      caloriesPerUnit: 1,
      proteinPerUnit: 20,
      carbsPerUnit: 0,
      fatsPerUnit: 900,
    }),
    Ingredient.create({
      name: 'bourbon',
      uom: 'oz',
      cost: 3000.00,
      type: 'beverages',
      caloriesPerUnit: 40,
      proteinPerUnit: 0,
      carbsPerUnit: 0,
      fatsPerUnit: 0,
    })
  ]);

  await pantry.addIngredient(carrot, { through: { pantryQty: 3 } });
  await pantry.addIngredient(tofu, { through: { pantryQty: 7 } });
  await pantry.addIngredient(wine, { through: { pantryQty: 15 } });
  await pantry.addIngredient(mochi, { through: { pantryQty: 6 } });

  await pantry2.addIngredient(cereal, { through: { pantryQty: 3 } });
  await pantry2.addIngredient(pasta, { through: { pantryQty: 10 } });
  await pantry2.addIngredient(bourbon, { through: { pantryQty: 4 } });

  await pantry3.addIngredient(cereal, { through: { pantryQty: 1 } });
  await pantry3.addIngredient(pasta, { through: { pantryQty: 1 } });
  await pantry3.addIngredient(bourbon, { through: { pantryQty: 1 } });

  await pantry.setUser(admin);
  await pantry2.setUser(admin);
  await pantry3.setUser(admin)

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
