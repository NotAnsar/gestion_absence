import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classes from './Admin.module.scss';
import formClasses from '../Login/Form.module.scss';
import url, { convertObjectToArray, getData } from '../../store/url';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { push, ref, set } from 'firebase/database';

const AddModule = () => {
	const [formData, setFormData] = useState({
		nom: '',
		id: uuidv4(),
		user_id: '',
	});
	const [prof, setprof] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		async function getProf() {
			try {
				const users = convertObjectToArray(await getData('users'));
				if (!users) throw new Error();

				setprof(users.filter((u) => u.role === 'prof'));
				setFormData((prev) => ({
					...prev,
					user_id: users.filter((u) => u.role === 'prof')[0].id,
				}));
			} catch (error) {
				console.log(error, 'error');
				setprof(null);
			}
		}
		getProf();
	}, []);

	const formHandler = (e) => {
		e.preventDefault();

		console.log({
			id: formData.id,
			nom: formData.nom,
			user_id: formData.user_id,
		});

		if (!formData.id || !formData.nom || !formData.user_id) {
			return;
		}

		async function addCours() {
			try {
				const coursRef = ref(db, 'cours');

				const newcoursRef = push(coursRef);
				await set(newcoursRef, formData);

				console.log('cours added successfully to Firebase');
				navigate('/admin/modules/', { state: { done: true, status: 'add' } });
			} catch (error) {
				console.error('Error adding user to Firebase:', error);
			}
		}
		addCours();
	};
	const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;

		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className={classes.justification}>
			<h2>Modifier Module</h2>

			<form
				id='checkoutForm'
				className={`${classes.justificationForm} ${formClasses.greenForm}`}
				onSubmit={formHandler}
			>
				<div className={formClasses.splitForm}>
					<div>
						<label htmlFor='module'>Nom Module </label>
						<input onChange={handleChange} type='text' name='nom' />
					</div>

					<div>
						<label htmlFor='categorie_id'>Prof</label>
						{prof && (
							<select
								name='user_id'
								onChange={handleChange}
								className={formClasses.select}
								defaultValue={prof[0]?.id}
							>
								{prof.map((a, y) => (
									<option key={y} value={a.id}>
										{`${a.nom} ${a.prenom}`}
									</option>
								))}
							</select>
						)}
					</div>
				</div>

				<div>
					<input type='Submit' defaultValue='Modifier Module' />
				</div>
			</form>
		</div>
	);
};

export default AddModule;
