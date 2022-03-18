//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Recipe = require('./models/Recipe')
const RecipeIngredient = require('./models/RecipeIngredient')
const ShoppingList = require('./models/ShoppingList')
const ShoppingListIngredient = require('./models/ShoppingListIngredient')
const Ingredient = require('./models/Ingredient')
const Pantry = require('./models/Pantry')
const PantryIngredient = require('./models/PantryIngredient')

//associations could go here!
User.hasMany(Pantry)
Pantry.belongsTo(User)

User.hasMany(Recipe)
Recipe.belongsTo(User)

User.hasMany(ShoppingList)
ShoppingList.belongsTo(User)

Pantry.belongsToMany(Ingredient, {through: PantryIngredient})
Ingredient.belongsToMany(Pantry, {through: PantryIngredient})

Recipe.belongsToMany(Ingredient, {through: RecipeIngredient})
Ingredient.belongsToMany(Recipe, {through: RecipeIngredient})

ShoppingList.belongsToMany(Ingredient, {through: ShoppingListIngredient})
Ingredient.belongsToMany(ShoppingList, {through: ShoppingListIngredient})

module.exports = {
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
}
