import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import classes from './Prof.module.scss';
import { convertObjectToArray, getData } from '../../store/url';
import { db } from '../../firebase';
import { push, ref, set } from 'firebase/database';

const AddAbscence = () => {
	const [users, setusers] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();
	const [done, setdone] = useState(false);

	useEffect(() => {
		async function getusers() {
			try {
				const data = convertObjectToArray(await getData('users')).filter(
					(u) => u.role === 'etudiant'
				);
				console.log(data);

				setusers(data.map((d) => ({ ...d, checked: false })));
			} catch (error) {
				console.log(error);
				setusers(null);
			}
		}
		getusers();
	}, []);

	useEffect(() => {
		if (done) navigate('/prof/seances', { state: { done: true } });
	}, [done]);

	async function submit() {
		try {
			const abs = users.filter((item) => item.checked === true);

			const sceance = await getData(`seances/${id}`);

			if (!sceance) throw new Error('sceance not found');

			const abscences = abs.map((a) => ({
				id: uuidv4(),
				dateAbsence: new Date().toISOString().split('T')[0],
				justification: '',
				cours_id: '',
				status: 'en attente',
				user: {
					age: a.age,
					email: a.email,
					filiere: a.filiere,
					id: a.id,
					nom: a.nom,
					prenom: a.prenom,
				},
				sceance,
			}));
			console.log(abs);
			const transformedAbsences = abscences.reduce((acc, absence) => {
				acc[absence.id] = absence;
				return acc;
			}, {});
			const absencesRef = ref(db, 'absences');

			for (const key in transformedAbsences) {
				const newAbsenceRef = push(absencesRef);
				await set(newAbsenceRef, transformedAbsences[key]);
			}
			console.log('Absences added successfully to Firebase');
			navigate('/prof/seances', { state: { done: true } });
		} catch (error) {
			console.log(error, 'error');
			return;
		}
	}

	console.log(users[0]);
	return (
		<div className={classes.abscences}>
			<div className={classes.title_container}>
				<h1>Seances</h1>

				<div className={classes.pagination}>
					<p>Selectionner le checkbox si l'etudiant est absent</p>
				</div>
			</div>

			<table className={classes.styled_table}>
				<thead>
					<tr>
						<th>Ajouter Abscence</th>
						<th>Id Etudiant</th>
						<th>Nom Etudiant </th>
						<th>Prenom Etudiant </th>
					</tr>
				</thead>
				<tbody>
					{users?.map((s) => (
						<tr key={s.id}>
							<td>
								<input
									onChange={(e) =>
										setusers(
											users.map((i) =>
												i.id === e.target.value
													? { ...i, checked: !i.checked }
													: { ...i }
											)
										)
									}
									type='checkbox'
									name='checked'
									value={s.id}
								/>
							</td>
							<td>{s.id}</td>
							<td>{s.nom}</td>
							<td>{s.prenom}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className={classes.btn__container}>
				<Link to=''>
					<input
						className={classes.btn__primary}
						type='Submit'
						placeholder='Ajouter Abscence'
						onClick={submit}
						defaultValue='Ajouter Abscence'
					/>
				</Link>
			</div>
		</div>
	);
};

export default AddAbscence;
