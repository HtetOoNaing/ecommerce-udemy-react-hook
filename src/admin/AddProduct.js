import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { createProduct } from './apiAdmin';


const AddProduct = () => {
	
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

	// destructure user and info from localstorage
	const {user, token} = isAuthenticated();

    const { name, description, price, categories, category, shipping, quantity, loading, error, createdProduct, redirectToProfile, formData } = values;

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        setValues({...values, [name]: value})
    }

    const newPostForm = () => (
        <form className="mb-3">
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input type="file" onChange={handleChange('photo')} name="photo" accept="image/*" />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input type="number" onChange={handleChange('price')} className="form-control" value={price} />
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option value="60fba168416650069d0f2a7b">Node</option>
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input type="number" onChange={handleChange('quantity')} className="form-control" value={quantity} />
            </div>
            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    )

	return (
		<Layout title="Add a new product" description={`G'day ${user.name}, ready to add a new product ?`} >
			<div className="row">
				<div className="col-md-8 offset-md-2">
                    {newPostForm()}
				</div>
			</div>  
		</Layout>
	)
}

export default AddProduct;