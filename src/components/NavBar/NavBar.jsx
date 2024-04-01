import fssmLogo from '../../assets/fssm.png';
import classes from './NavBar.module.scss';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EtudiantNav from './EtudiantNav';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import AdminNav from './AdminNav';
import ProfNav from './ProfNav';

const NavBar = () => {
	const location = useLocation();
	const pathLocation = location.pathname;
	const dispatch = useDispatch();

	const {
		user: { role },
	} = useSelector((state) => state.auth);

	return (
		<div className={classes.container}>
			<header>
				<img src={fssmLogo} alt='fssmLogo' />

				<nav>
					{role === 'etudiant' && <EtudiantNav pathLocation={pathLocation} />}
					{role === 'admin' && <AdminNav pathLocation={pathLocation} />}
					{role === 'prof' && <ProfNav pathLocation={pathLocation} />}
				</nav>
				<nav>
					<ul>
						<span className={classes.green}>{role}</span>

						<Link to='profile' className={classes.user}>
							<FiUser />
						</Link>
						<li
							className={classes.logout}
							onClick={() => {
								dispatch(logout());
							}}
						>
							<FiLogOut />
						</li>
					</ul>
				</nav>
			</header>
		</div>
	);
};

export default NavBar;
