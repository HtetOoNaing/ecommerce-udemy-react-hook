import React, { useState } from 'react';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { emptyCart } from './cartHelpers';
import { createOrder } from './apiCore';

const Checkout = ({products, setRun}) => {

    const [data, setData] = useState({
        address: '',
        loading: false,
        success: '',
        error: '',
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }
    const handleAddress = (event) => {
        setData({...data, address: event.target.value})
    }
    const checkout = () => {
        const createOrderData = {
            products: products,
            amount: getTotal(),
            address: data.address
        }
        createOrder(userId, token, createOrderData)
        emptyCart(() => {
            console.log('payment success and empty cart');
            setRun((run) => !run)
        })
    }
    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>
                <div className="form-group mb-3">
                    <label className="text-muted">Delivery Address:</label>
                    <textarea onChange={handleAddress} className="form-control" value={data.address} placeholder="Type your delivery address here ..." />
                </div>
                <button onClick={checkout} className="btn btn-success">Checkout</button>
            </div>
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