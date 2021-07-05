import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return { color: '#ff9900' }
	} else {
		return { color: '#fff' }
	}
}

const Menu = ({ history }) => (
	<>
		<ul className="nav nav-tabs bg-primary">
			<li className="nav-item">
				<Link to="/" className="nav-link" style={isActive(history, '/')} >Home</Link>
			</li>
			{isAuthenticated() ? 
				<li className="nav-item">
					<span onClick={() => signout(() => {
						history.push('/');
					})} className="nav-link" style={{cursor: 'pointer', color: '#fff'}} >Signout</span>
				</li>
			: (
				<Fragment>
					<li className="nav-item">
						<Link to="/signin" className="nav-link" style={isActive(history, '/signin')} >Signin</Link>
					</li>
					<li className="nav-item">
						<Link to="/signup" className="nav-link" style={isActive(history, '/signup')} >Signup</Link>
					</li>
				</Fragment>
			)}
		</ul>
	</>
)
 
export default withRouter(Menu);