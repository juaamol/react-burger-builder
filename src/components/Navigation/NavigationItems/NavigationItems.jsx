import React from 'react';
import { useLocation } from 'react-router';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' active={path === '/'}>
        Burger Builder
      </NavigationItem>
      <NavigationItem link='/checkout' active={path === '/checkout'}>
        Checkout
      </NavigationItem>
    </ul>
  );
};

export default navigationItems;
