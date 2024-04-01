import { AiOutlineUser } from 'react-icons/ai';
import classes from './Profil.module.scss';

const RightProfil = ({ user }) => {
	return (
		<div>
			<div className={classes.right}>
				<div className={classes.title_container}>
					<AiOutlineUser /> <span>About</span>
				</div>
				<div className={classes.right_container}>
					<div>
						<span>Nom</span>
						<span>{user.nom}</span>
					</div>
					<div>
						<span>Prenom</span>
						<span>{user.prenom}</span>
					</div>
					<div>
						<span>Age</span>
						<span>{user.age}</span>
					</div>
					<div>
						<span>Email</span>
						<span>{user.email}</span>
					</div>
					<div>
						<span>Adresse</span>
						<span>{user.adresse}</span>
					</div>
					<div>
						<span>tel</span>
						<span>{user.tel}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RightProfil;
