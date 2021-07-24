import React, { useState } from 'react';
import Layout from '../core/Layout';
import { Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth';

const Signin = () => {
	const [values, setValues] = useState({
		email: '',
		password: '',
		error: '',
		loading: false,
		redirectToReferrer: false
	});
	const { email, password, error, loading, redirectToReferrer } = values;
	const {user} = isAuthenticated();
	const handleChange = name => event => {
		console.log('handle chage');
		setValues({...values, error: false, [name]: event.target.value})
	}
	
	const handleSubmit = (event) => {
		event.preventDefault();
		setValues({...values, error: false, loading: true});
		signin({ email, password }).then(data => {
			if(data.error) {
				setValues({...values, error: data.error, loading: false})
			} else {
				authenticate(data, () => {
					setValues({
						...values,
						redirectToReferrer: true
					})
				})
			}
		})
	}
	const signUpForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label className="text-muted">Email</label>
				<input type="email" value={email} onChange={handleChange('email')} className="form-control" />
			</div>
			<div className="form-group">
				<label className="text-muted">Password</label>
				<input type="password" value={password} onChange={handleChange('password')} className="form-control" autoComplete="on" />
			</div>
			<button type="submit" className="btn btn-primary">Submit</button>
		</form>
	)
	const showError = () => (
		<div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
			{error}
		</div>
	)
	const showLoading = () => (
		loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)
	)
	const redirectUser = () => {
		if(redirectToReferrer) {
			if(user && user.role === 1) {
				return <Redirect to="/admin/dashboard" />
			} else {
				return <Redirect to="/user/dashboard" />
			}
		}
		if(isAuthenticated()) {
			return <Redirect to="/" />
		}
	}
	return (
		<Layout title="Signin" description="Signin to Node React E-commerce App" className="container col-md-8 offset-md-2">
			{showLoading()}
			{showError()}
			{signUpForm()}
			{redirectUser()}
		</Layout>
	)
};
 
export default Signin;