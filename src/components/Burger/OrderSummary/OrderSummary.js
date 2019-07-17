import React from 'react';
import Aux from '../../../hoc/Auxiliar';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((ingredient) => (
            <li key={ingredient}>
                <span style={{ textTransform: 'capitalize' }}>{ingredient}</span>: {props.ingredients[ingredient]}
            </li>));

    return (
        <Aux>
            <h3>Your order</h3>
            <p>A burguer with the following ingrediets:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;