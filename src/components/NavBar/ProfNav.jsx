import classes from './NavBar.module.scss';
import { Link } from 'react-router-dom';

const ProfNav = ({ pathLocation }) => {
	return (
		<ul className={classes.nav}>
			<Link to=''>
				<li className={pathLocation === '/prof' ? classes.clicked : undefined}>
					Mes Modules
				</li>
			</Link>
			<Link to='list'>
				<li
					className={
						pathLocation === '/prof/list' ? classes.clicked : undefined
					}
				>
					Liste des abscence
				</li>
			</Link>
			<Link to='seances'>
				<li
					className={
						pathLocation === '/prof/seances' ? classes.clicked : undefined
					}
				>
					Seances
				</li>
			</Link>
		</ul>
	);
};

export default ProfNav;
