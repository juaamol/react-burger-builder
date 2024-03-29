import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }

    this.setState({ ingredients });
  }

  checkoutCancelledHandler = () => {
    this.props.navigate(-1);
  };

  checkoutContinuedHandler = () => {
    alert('Your order will be ready soon');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        ></CheckoutSummary>
      </div>
    );
  }
}

export default Checkout;
