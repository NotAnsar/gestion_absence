import { useEffect, useState } from 'react';
import classes from './Etudiant.module.scss';
import formClasses from '../Login/Form.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import url, {
	convertObjectToArray,
	formatDate,
	formatTime,
	getData,
} from '../../store/url';
import { ref, update } from 'firebase/database';
import { db } from '../../firebase';

const Justification = () => {
	let { id } = useParams();
	const navigate = useNavigate();
	const [justification, setJustification] = useState('');
	const [abscences, setAbscences] = useState();

	useEffect(() => {
		async function getAbscences() {
			const myabs = await getData(`absences/${id}`);

			if (myabs) setAbscences(myabs);
			else navigate('/etudiant');
		}
		getAbscences();
	}, []);

	const handleChange = (e) => {
		setJustification(e.target.value);
	};

	const formHandler = (e) => {
		e.preventDefault();

		async function updateAbscences() {
			try {
				const absenceRef = ref(db, `absences/${id}`);

				await update(absenceRef, { justification });

				navigate('/etudiant', { state: { done: true } });
			} catch (error) {
				console.log(error);
			}
		}

		updateAbscences();
	};

	return (
		<div className={classes.justification}>
			<h2>Ajouter Justification</h2>

			{abscences ? (
				<form
					id='checkoutForm'
					className={`${classes.justificationForm} ${formClasses.blueForm}`}
					onSubmit={formHandler}
				>
					<div className={formClasses.splitForm}>
						<div>
							<label htmlFor='firstName'>Nom de Module </label>
							<input
								type='text'
								value={abscences?.sceance.cours.nom}
								disabled
							/>
						</div>

						<div>
							<label htmlFor='email'>Date de Seance</label>
							<input
								type='text'
								value={formatDate(abscences?.sceance.date_sceance)}
								disabled
							/>
						</div>
					</div>
					<div className={formClasses.splitForm}>
						<div>
							<label>Heure de Debut</label>
							<input
								type='text'
								value={formatTime(abscences?.sceance.date_debut)}
								disabled
							/>
						</div>
						<div>
							<label>Heure de Fin</label>
							<input
								type='text'
								value={formatTime(abscences?.sceance.date_debut)}
								disabled
							/>
						</div>
					</div>

					<div>
						<label>Justification</label>
						<textarea
							className={formClasses.textarea}
							name='justification'
							defaultValue={abscences?.justification}
							onChange={handleChange}
						/>
					</div>

					<div>
						<input type='Submit' defaultValue='Add' />
					</div>
				</form>
			) : (
				<p>loading</p>
			)}
		</div>
	);
};

export default Justification;
