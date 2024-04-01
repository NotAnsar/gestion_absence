import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NavBar.module.scss';

const EtudiantNav = ({ pathLocation }) => {
	return (
		<ul className={classes.nav}>
			<Link to=''>
				<li
					className={pathLocation === '/etudiant' ? classes.clicked : undefined}
				>
					Abscences
				</li>
			</Link>
			<Link to='cours'>
				<li
					className={
						pathLocation.split('/')[2] === 'cours' ? classes.clicked : undefined
					}
				>
					Cours
				</li>
			</Link>
		</ul>
	);
};

export default EtudiantNav;
