import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './Admin.module.scss';
import { Fragment } from 'react';
import url, { formatDate, formatTime, getData } from '../../store/url';
import { db } from '../../firebase';
import { ref, set } from 'firebase/database';

const Justification = () => {
	let { id } = useParams();
	let navigate = useNavigate();
	const [abscence, setAbscence] = useState();

	function validerAbscence(a) {
		console.log(a);
		async function updateAbscences() {
			try {
				const myabscence = {
					...abscence,
					status: a ? 'Justifié' : 'Non Justifié',
				};
				const absRef = ref(db, `absences/${id}`);
				await set(absRef, myabscence);

				navigate('/admin/abscences', { state: { done: true } });
			} catch (error) {
				console.log(error);
			}
		}
		updateAbscences();
	}

	useEffect(() => {
		async function getmodules() {
			try {
				const absence = await getData(`absences/${id}`);
				console.log(absence);

				setAbscence(absence);
			} catch (error) {
				setAbscence(null);
			}
		}
		getmodules();
	}, []);

	return (
		<Fragment>
			<h1>Validation D'abscence</h1>

			{abscence ? (
				<div className={classes.validation_container}>
					<div className={classes.split2}>
						<div>
							<h3>Nom Etudiant </h3>
							<p>
								{abscence?.user.nom} {abscence?.user.prenom}
							</p>
						</div>
						<div>
							<h3>Nom De module </h3>
							<p>{abscence?.sceance.cours.nom}</p>
						</div>
					</div>
					<div className={classes.split3}>
						<div>
							<h3>Date de Seance</h3>
							<p>{formatDate(abscence?.sceance.date_sceance)}</p>
						</div>
						<div>
							<h3>Heure de Debut</h3>
							<p>{formatTime(abscence?.sceance.date_debut)}</p>
						</div>
						<div>
							<h3>Heure de Fin</h3>
							<p>{formatTime(abscence?.sceance.date_fin)}</p>
						</div>
					</div>
					<div>
						<h3>Justification</h3>
						<p>{abscence?.justification}</p>
					</div>
					<div>
						<h3>Valider Abscences</h3>
						<div>
							<input
								className={classes.btn__green}
								type='button'
								onClick={() => validerAbscence(true)}
								placeholder='Update'
								defaultValue='&#10003;'
							/>
							<input
								type='button'
								className={classes.btn__red}
								onClick={() => validerAbscence(false)}
								placeholder='Update'
								defaultValue='&#10005;'
							/>
						</div>
					</div>
				</div>
			) : (
				<p>loading</p>
			)}
		</Fragment>
	);
};

export default Justification;
