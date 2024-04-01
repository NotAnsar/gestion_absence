import classes from './Profil.module.scss';

const LeftProfil = ({ user }) => {
	return (
		<div className={classes.left}>
			<h2>
				{user.prenom} {user.nom}
			</h2>
			<h3>{user.filiere}</h3>
			<p>{user.description}</p>

			<ul>
				<li>
					<span>Status</span> <span className={classes.green}>Online</span>
				</li>
				<li>
					<span>Type</span> <span className={classes.yellow}>{user.role}</span>
				</li>
			</ul>
		</div>
	);
};

export default LeftProfil;
