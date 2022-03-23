import React, { useState } from 'react';

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [image, setImage] = useState('');

  return (
    <div>
      <h1>Add Recipe</h1>
      <form>
        <label htmlFor="name">Recipe Name</label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="rating">Rating</label>
        <select
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="" disabled selected>
            Select Rating
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label htmlFor="cuisineType">Cuisine Type</label>
        <select
          name="cuisineType"
          value={cuisineType}
          onChange={(e) => setCuisineType(e.target.value)}
        >
          <option value="" disabled selected>
            Select Cuisine Type
          </option>
          <option value="American">American</option>
          <option value="Asian">Asian</option>
          <option value="British">British</option>
          <option value="Caribbean">Caribbean</option>
          <option value="Central Europe">Central Europe</option>
          <option value="Chinese">Chinese</option>
          <option value="Eastern Europe">Eastern Europe</option>
          <option value="French">French</option>
          <option value="Indian">Indian</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="Kosher">Kosher</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Mexican">Mexican</option>
          <option value="Middle Eastern">Middle Eastern</option>
          <option value="Nordic">Nordic</option>
          <option value="South American">South American</option>
          <option value="South East Asian">South East Asian</option>
          <option value="None">None</option>
        </select>

        <label htmlFor="image">Image URL</label>
        <input
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <br />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddRecipe;
