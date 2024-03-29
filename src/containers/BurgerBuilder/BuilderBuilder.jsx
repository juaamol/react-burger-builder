import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliar';
import withErrorHandler from '../../hoc/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 5,
    purchasable: true,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get('https://react-my-burguer-3ae18.firebaseio.com/ingredients.json')
      .then((response) => this.setState({ ingredients: response.data }))
      .catch((err) => {
        this.setState({ error: true });
      });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    //     this.setState({ loading: true });
    //     const order = {
    //       ingredients: this.state.ingredients,
    //       price: this.state.totalPrice,
    //       customer: {
    //         name: 'Blabla',
    //         address: {
    //           street: 'Test street 1',
    //           zipCode: '12345',
    //           Country: 'Country',
    //         },
    //         email: 'test@test.com',
    //       },
    //       deliveryMethod: 'fastest',
    //     };
    //     axios
    //       .post('/orders.json', order)
    //       .then(res => {
    //         this.setState({ loading: false, purchasing: false });
    //       })
    //       .catch(err => {
    //         this.setState({ loading: false, purchasing: false });
    //       });
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.state.ingredients[i]),
      );
    }

    const queryStr = queryParams.join('&');

    this.props.navigate(`/checkout?${queryStr}`);
  };

  updatePurchaseState = (updatedIngredients) => {
    const ingredients = { ...updatedIngredients };

    const sum = Object.keys(ingredients)
      .map((ingredient) => ingredients[ingredient])
      .reduce((prev, curr) => curr + prev, 0);

    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + INGREDIENT_PRICES[type];

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount === 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - INGREDIENT_PRICES[type];

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}></Burger>
          <BuildControls
            purchasable={this.state.purchasable}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
          ingredients={this.state.ingredients}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
