import { useEffect, useState } from 'react';
import classes from './Prof.module.scss';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { ref, get } from 'firebase/database'; // Import Firebase database methods
import { getData } from '../../store/url';

const MesModules = () => {
	const { user } = useSelector((state) => state.auth);
	const [cours, setcours] = useState([]);

	useEffect(() => {
		async function getAbscences() {
			console.log(cours);
			try {
				const coursDB = await getData('cours');
				if (!coursDB) throw new Error();
				const mesCours = Object.values(coursDB).filter(
					(a) => user.id === a.user_id
				);

				if (mesCours.length === 0) throw new Error();
				else setcours(mesCours);
			} catch (error) {
				setcours(null);
			}
		}
		getAbscences();
	}, []);

	return (
		<>
			<h1>Mes Cours</h1>
			<div>
				<div className={classes.cours_container}>
					{cours && cours.length !== 0 ? (
						cours?.map((d, i) => (
							<div key={i}>
								<HiOutlineDocumentText />
								<h3>{d.nom}</h3>
							</div>
						))
					) : (
						<p>cours Not found</p>
					)}
				</div>
			</div>
		</>
	);
};

export default MesModules;
