import React, { useState } from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { signup } from '../auth';

const Signup = () => {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		success: false
	});
	const { name, email, password, error, success } = values;
	const handleChange = name => event => {
		console.log('handle chage');
		setValues({...values, error: false, [name]: event.target.value})
	}
	
	const handleSubmit = (event) => {
		event.preventDefault();
		setValues({...values, error: false});
		signup({name, email, password}).then(data => {
			if(data.error) {
				setValues({...values, error: data.error, success: false})
			} else {
				setValues({
					name: '',
					email: '',
					password: '',
					error: '',
					success: true
				})
			}
		})
	}
	const signUpForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input value={name} onChange={handleChange('name')} type="text" className="form-control" />
			</div>
			<div className="form-group">
				<label className="text-muted">Email</label>
				<input value={email} onChange={handleChange('email')} type="email" className="form-control" />
			</div>
			<div className="form-group">
				<label className="text-muted">Password</label>
				<input value={password} onChange={handleChange('password')} type="password" className="form-control" autoComplete="on" />
			</div>
			<button type="submit" className="btn btn-primary">Submit</button>
		</form>
	)
	const showError = () => (
		<div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
			{error}
		</div>
	)
	const showSuccess = () => (
		<div className="alert alert-info" style={{display: success ? '' : 'none'}}>
			New account is created. Please <Link to="/signin">Signin</Link>
		</div>
	)
	return (
		<Layout title="Signup" description="Signup to Node React E-commerce App" className="container col-md-8 offset-md-2">
			{showSuccess()}
			{showError()}
			{signUpForm()}
		</Layout>
	)
};
 
export default Signup;