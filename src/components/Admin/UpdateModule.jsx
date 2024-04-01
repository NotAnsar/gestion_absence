import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import classes from './Admin.module.scss';
import formClasses from '../Login/Form.module.scss';
import { convertObjectToArray, getData } from '../../store/url';
import { ref, set } from 'firebase/database';
import { db } from '../../firebase';

const UpdateModule = () => {
	let { id } = useParams();
	const navigate = useNavigate();
	const [module, setModule] = useState({
		id,
		nom: '',
		user_id: '',
	});

	const [prof, setprof] = useState([]);

	useEffect(() => {
		async function getProf() {
			try {
				const users = convertObjectToArray(await getData('users'));
				if (!users) throw new Error();

				setprof(users.filter((u) => u.role === 'prof'));
			} catch (error) {
				console.log(error);
				setprof(null);
			}
		}
		async function getModule() {
			try {
				const data = await getData(`cours/${id}`);
				if (!data) throw new Error();

				console.log(data);
				setModule(data);
			} catch (error) {
				console.log(error);
				// setModules(null);
			}
		}

		getProf();
		getModule();
	}, []);

	const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;

		setModule((prev) => ({ ...prev, [name]: value }));
	};

	const formHandler = (e) => {
		e.preventDefault();

		async function updateModule() {
			try {
				const moduleRef = ref(db, `cours/${id}`); // Get a reference to the module in the database
				await set(moduleRef, module);
				navigate('/admin/modules', { state: { done: true, status: 'update' } });
			} catch (error) {
				console.log(error);
			}
		}

		updateModule();
	};

	return (
		<div className={classes.justification}>
			<h2>Modifier Module</h2>

			<form
				id='checkoutForm'
				className={`${classes.justificationForm} ${formClasses.blueForm}`}
				onSubmit={formHandler}
			>
				<div className={formClasses.splitForm}>
					<div>
						<label htmlFor='nom'>Nom Module </label>
						<input
							type='text'
							onChange={handleChange}
							defaultValue={module.nom}
							name='nom'
						/>
					</div>

					<div>
						<label htmlFor='categorie_id'>Prof</label>
						{module?.user_id && (
							<select
								name='user_id'
								onChange={handleChange}
								className={formClasses.select}
								defaultValue={module?.user_id}
							>
								{prof?.map((a, y) => (
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

export default UpdateModule;
