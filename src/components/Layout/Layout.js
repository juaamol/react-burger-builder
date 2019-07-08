import React from 'react';
import Aux from '../../hoc/Auxiliar';

const layout = (props) => (
    <Aux>
        <div>
            Toolbar, sidedrawer, backdrop
        </div>
        <main>
            {props.children}
        </main>
    </Aux>
)

export default layout;