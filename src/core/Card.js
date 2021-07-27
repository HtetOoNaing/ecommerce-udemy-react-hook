import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const Card = ({product, showViewProductButton = true}) => {
    const showViewButton = showViewProductButton => {
        return (showViewProductButton && <Link to={`/product/${product._id}`} className="btn btn-outline-primary mt-2 mb-2 me-2">View Product</Link>)
    }
    const showAddToCartButton = () => (<button className="btn btn-outline-warning mt-2 mb-2">Add to cart</button>);
    const showStock = quantity => {
        return quantity > 0 ? <span className="badge bg-primary rounded-pill">In Stock</span> : <span className="badge bg-primary rounded-pill">Out of Stock</span>
    }
    return (
        <div className="card">
            <div className="card-header name"> {product.name} </div>
            <div className="card-body">
                <ShowImage item={product} url="product" />
                <p className="lead mt-2">{product.description.substring(0, 100)}</p>
                <p className="black-10">${product.price}</p>
                <p className="black-9">Category: {product.category && product.category.name}</p>
                <p className="black-8">Added on: {moment(product.createdAt).fromNow()}</p>

                {showStock(product.quantity)}
                <br />
                {showViewButton(showViewProductButton)}
                {showAddToCartButton()}
            </div>
        </div>
    )
}

export default Card;