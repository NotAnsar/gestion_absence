import React from 'react';
import classes from './NavBar.module.scss';
import { Link } from 'react-router-dom';

const AdminNav = ({ pathLocation }) => {
	return (
		<ul className={classes.nav}>
			<Link to=''>
				<li className={pathLocation === '/admin' ? classes.clicked : undefined}>
					Comptes
				</li>
			</Link>
			<Link to='modules'>
				<li
					className={
						pathLocation === '/admin/modules' ? classes.clicked : undefined
					}
				>
					Modules
				</li>
			</Link>
			<Link to='abscences'>
				<li
					className={
						pathLocation === '/admin/abscences' ? classes.clicked : undefined
					}
				>
					Valider Abscences
				</li>
			</Link>
		</ul>
	);
};

export default AdminNav;
