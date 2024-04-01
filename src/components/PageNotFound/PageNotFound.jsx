import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './PageNotFound.module.scss';

const PageNotFound = () => {
	const {
		loggedIn,
		user: { role },
	} = useSelector((state) => state.auth);
	return (
		<>
			{/* <NavBar /> */}
			<div className={classes.container}>
				<h1>404 Page Not Found</h1>
				<p>The page you were looking for does not exist.</p>

				{loggedIn && (
					<Link className={classes.link} to={`/${role}`}>
						Go Back To Home Page
					</Link>
				)}
				{!loggedIn && (
					<Link className={classes.link} to='/'>
						Go Back To Login Page
					</Link>
				)}
			</div>
		</>
	);
};

export default PageNotFound;
