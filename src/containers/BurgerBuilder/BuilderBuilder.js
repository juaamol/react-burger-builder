import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliar';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 1,
            meat: 2,
            bacon: 1,
            cheese: 2,

        },
        totalPrice: 0,
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = INGREDIENT_PRICES[type] * updatedCount;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
    }

    removeIngredientHandler = (type) => {
        
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;