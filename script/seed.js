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
  //Creating Shopping Lists
  const [margaritaTime, boozeRun, needProduce] = await Promise.all([
    ShoppingList.create({ name: 'margaritaTime' }),
    ShoppingList.create({ name: 'boozeRun', status: 'closed', totalCost: 72, checkoutDate: Date.now() }),
    ShoppingList.create({ name: 'needProduce', status: 'closed', totalCost: 12, checkoutDate: Date.now()}),
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

  //Setting shopping lists to admin user
  margaritaTime.setUser(admin)
  boozeRun.setUser(admin)
  needProduce.setUser(admin)

  const [
    carrot,
    tofu,
    wine,
    mochi,
    cereal,
    pasta,
    bourbon,
    groundBeef,
    fishStock,
    eggs,
    breakfastSausage,
    legOfMutton,
    rosemary,
    eels,
    maltVinegar,
  ] = await Promise.all([
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
    // --- BELOW: Ingredients added by Evan 3/22/22 ---
    Ingredient.create({
      name: 'ground beef',
      uom: 'oz',
      type: 'meat',
      caloriesPerUnit: 40,
      proteinPerUnit: 50,
      carbsPerUnit: 0,
      fatsPerUnit: 20,
    }),
    Ingredient.create({
      name: 'fish stock',
      uom: 'floz',
      type: 'meat',
      caloriesPerUnit: 10,
      proteinPerUnit: 10,
      carbsPerUnit: 0,
      fatsPerUnit: 5,
    }),
    Ingredient.create({
      name: 'eggs',
      uom: 'ea',
      type: 'produce',
      caloriesPerUnit: 50,
      proteinPerUnit: 20,
      carbsPerUnit: 5,
      fatsPerUnit: 10,
    }),
    Ingredient.create({
      name: 'breakfast sausage',
      uom: 'oz',
      type: 'meat',
      caloriesPerUnit: 50,
      proteinPerUnit: 50,
      carbsPerUnit: 0,
      fatsPerUnit: 20,
    }),
    Ingredient.create({
      name: 'leg of mutton',
      uom: 'lb',
      type: 'meat',
      caloriesPerUnit: 1000,
      proteinPerUnit: 600,
      carbsPerUnit: 0,
      fatsPerUnit: 500,
    }),
    Ingredient.create({
      name: 'rosemary',
      uom: 'oz',
      type: 'miscellaneous',
      caloriesPerUnit: 0,
      proteinPerUnit: 0,
      carbsPerUnit: 0,
      fatsPerUnit: 0,
    }),
    Ingredient.create({
      name: 'eels',
      uom: 'lb',
      type: 'meat',
      caloriesPerUnit: 600,
      proteinPerUnit: 250,
      carbsPerUnit: 0,
      fatsPerUnit: 150,
    }),
    Ingredient.create({
      name: 'malt vinegar',
      uom: 'floz',
      type: 'miscellaneous',
      caloriesPerUnit: 0,
      proteinPerUnit: 0,
      carbsPerUnit: 0,
      fatsPerUnit: 0,
    }),
    // --- ABOVE: Ingredients added by Evan 3/22/22 ---
  ]);

  // --- BELOW: Recipes added by Evan 3/22/22 ---
  // Recipes
  const [roastMutton, scotchEggs, jelliedEels, pieAndMash] = await Promise.all([
    Recipe.create({
      name: 'Roast Mutton',
      description:
        'Place in centre of oven and roast for 20 minutes then reduce the temperature to 190 oc then continue roasting for 30 minutes per 500g reaching a core temperature of minimum 65 oc',
      rating: 4,
      caloriesPerRecipe: 3500,
      proteinPerRecipe: 1000,
      carbsPerRecipe: 600,
      fatPerRecipe: 2000,
      image:
        'https://www.farmison.com/community/wp-content/uploads/2015/03/leg-of-mutton-1024x762.jpg',
      cuisineType: 'British',
    }),

    Recipe.create({
      name: 'Scotch Eggs',
      description:
        'Attach a deep-fry thermometer to side of a large heavy pot. Pour in oil to a depth of 2” and heat over medium heat to 375°. Fry eggs, turning occasionally and maintaining oil temperature of 350°, until sausage is cooked through and breading is golden brown and crisp, 5-6 minutes. Use a slotted spoon to transfer eggs to paper towels to drain. Season lightly with salt and pepper. Serve warm with mustard.',
      rating: 3,
      caloriesPerRecipe: 1500,
      proteinPerRecipe: 2000,
      carbsPerRecipe: 400,
      fatPerRecipe: 3000,
      image:
        'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Scotch-Eggs_EXPS_FT21_11840_F_0225_1.jpg',
      cuisineType: 'British',
    }),

    Recipe.create({
      name: 'Jellied Eels',
      description:
        'Jellied eels can be prepared by cutting the eels diagonally around 2.5cm in length. Mix it with the lemon juice, bay leaves, peppercorn, cloves, and salt in a large saucepan. Add water and boil it for 20 minutes. Then, add parsley and chill it in the mixture. When the jelly is formed, it is ready to be served.',
      rating: 3,
      caloriesPerRecipe: 1000,
      proteinPerRecipe: 1000,
      carbsPerRecipe: 200,
      fatPerRecipe: 2000,
      image:
        'https://thefoodxp.com/wp-content/uploads/2021/02/Jellied-Eels-e1612983035279.jpg',
      cuisineType: 'British',
    }),

    Recipe.create({
      name: 'Pie and Mash',
      description:
        'Brown off the mince in a pan over medium-low heat for 7 minutes, breaking down into small pieces as it browns. (If using leaner mince you may need a bit of oil to prevent sticking)',
      rating: 3,
      caloriesPerRecipe: 1000,
      proteinPerRecipe: 1000,
      carbsPerRecipe: 200,
      fatPerRecipe: 2000,
      image:
        'https://flawlessfood.co.uk/wp-content/uploads/2021/05/Pie-Mash-and-Liquor-914-1024x678.jpg',
      cuisineType: 'British',
    }),
  ]);
  // --- ABOVE: Recipes added by Evan 3/22/22 ---

//ShoppingList
  await boozeRun.addIngredient(wine, { through: { sliQuantity: 2, cost: 11, uom: 'floz' } })
  await boozeRun.addIngredient(bourbon, { through: { sliQuantity: 1, cost: 50, uom: 'floz' } })

  await margaritaTime.addIngredient(carrot, { through: { sliQuantity: 6, cost: 2, uom: 'lb' } })
  await margaritaTime.addIngredient(mochi, { through: { sliQuantity: 2, cost: 10, uom: 'unit' } })

  await needProduce.addIngredient(carrot, { through: { sliQuantity: 10, cost: 2, uom: 'lb' } })

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

  // --- BELOW: Ingredients added to recipes by Evan 3/22/22 ---
  await roastMutton.addIngredient(legOfMutton, { through: { recipeQty: 1 } });
  await roastMutton.addIngredient(rosemary, { through: { recipeQty: 2 } });
  await scotchEggs.addIngredient(eggs, { through: { recipeQty: 6 } });
  await scotchEggs.addIngredient(breakfastSausage, {
    through: { recipeQty: 1 },
  });
  await jelliedEels.addIngredient(eels, { through: { recipeQty: 2 } });
  await jelliedEels.addIngredient(maltVinegar, { through: { recipeQty: 12 } });
  await pieAndMash.addIngredient(groundBeef, { through: { recipeQty: 1 } });
  await pieAndMash.addIngredient(fishStock, { through: { recipeQty: 16 } });
  // --- ABOVE: Ingredients added to recipes by Evan 3/22/22 ---

  // --- BELOW: Recipes added to Users by Evan 3/22/22 ---
  await admin.addRecipe(jelliedEels);
  await admin.addRecipe(pieAndMash);
  await admin.addRecipe(scotchEggs);
  await admin.addRecipe(roastMutton);
  // --- ABOVE: Recipes added to Users by Evan 3/22/22 ---

  await pantry.setUser(admin);
  await pantry2.setUser(admin);
  await pantry3.setUser(admin);

  console.log(User.prototype)
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
