import React from 'react';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { emptyCart } from './cartHelpers';

const Checkout = ({products, setRun}) => {
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }
    const checkout = () => {
        emptyCart(() => {
            console.log('payment success and empty cart');
            setRun((run) => !run)
        })
    }
    const showCheckout = () => {
        return isAuthenticated() ? (
            <button onClick={checkout} className="btn btn-success">Checkout</button>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        )
    }
    return (
        <div>
            <h2>Total: ${getTotal()}</h2>

            {showCheckout()}
        </div>
    );
}

export default Checkout;