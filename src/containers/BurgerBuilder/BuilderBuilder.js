import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliar';
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 1,
            meat: 2,
            bacon: 1,
            cheese: 2,

        }
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <div>Build controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;