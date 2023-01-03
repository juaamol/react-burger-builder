import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliar';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate() {
        console.log('Will update');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map((ingredient) => (
                <li key={ingredient}>
                    <span style={{ textTransform: 'capitalize' }}>{ingredient}</span>: {this.props.ingredients[ingredient]}
                </li>));

        return (
            <Aux>
                <h3>Your order</h3>
                <p>A burguer with the following ingrediets:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary;