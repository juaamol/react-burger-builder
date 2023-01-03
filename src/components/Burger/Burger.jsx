import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredient, index) => {
      return [...Array(props.ingredients[ingredient])].map((_, i) => (
        <BurgerIngredient
          key={ingredient + i}
          type={ingredient}
        ></BurgerIngredient>
      ));
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top'></BurgerIngredient>
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom'></BurgerIngredient>
    </div>
  );
};

export default burger;
