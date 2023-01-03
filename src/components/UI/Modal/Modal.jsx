import React, { memo } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliar';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
  <Aux>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0',
      }}
    >
      {props.children}
    </div>
  </Aux>
);

function shouldUpdate(prevProps, nextProps) {
  console.log('updated: ' + prevProps.show + ' ' + nextProps.show);
  return (
    prevProps.show === nextProps.show &&
    prevProps.children === nextProps.children
  );
}

export default memo(modal, shouldUpdate);
