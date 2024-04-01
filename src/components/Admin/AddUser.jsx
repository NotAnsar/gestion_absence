import classes from './Admin.module.scss';
import { v4 as uuidv4 } from 'uuid';
import formClasses from '../Login/Form.module.scss';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { push, set, ref } from 'firebase/database';

const AddUser = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		nom: '',
		prenom: '',
		age: '',
		email: '',
		role: 'etudiant',
		tel: '',
		adresse: '',
		filiere: '',
		description: '',
		password: '',
		// id: uuidv4(),
	});

	const handleChange = (e) => {
		setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const formHandler = (e) => {
		e.preventDefault();

		async function addUser() {
			try {
				const usersRef = ref(db, 'users'); // Get a reference to the "users" node in the database

				// Push the new user data to Firebase
				const newUserRef = push(usersRef); // Generate a unique key for the new user
				await set(newUserRef, user); // Set the new user data at the generated key

				console.log('User added successfully to Firebase');
				navigate('/admin', { state: { done: true, status: 'add' } });
			} catch (error) {
				console.error('Error adding user to Firebase:', error);
			}
		}
		addUser();
	};
	return (
		<div className={classes.justification}>
			<h2>Ajouter Utilisateur</h2>

			<form
				id='checkoutForm'
				className={`${classes.justificationForm} ${formClasses.greenForm}`}
				onSubmit={formHandler}
			>
				<div className={formClasses.splitFormBy3}>
					<div>
						<label htmlFor='nom'>Nom </label>
						<input type='text' name='nom' onChange={handleChange} />
					</div>
					<div>
						<label htmlFor='prenom'>Prenom</label>
						<input type='text' name='prenom' onChange={handleChange} />
					</div>
					<div>
						<label htmlFor='age'>Age</label>
						<input type='text' name='age' onChange={handleChange} />
					</div>
				</div>
				<div className={formClasses.splitForm}>
					<div>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
							required
							onChange={handleChange}
						/>
					</div>

					<div>
						<label htmlFor='password'>password</label>
						<input type='password' name='password' onChange={handleChange} />
					</div>
				</div>
				<div className={formClasses.splitForm}>
					<div>
						<label htmlFor='categorie_id'>role</label>
						<select
							name='role'
							className={formClasses.select}
							onChange={handleChange}
						>
							<option key={0} value={'etudiant'}>
								etudiant
							</option>
							<option key={1} value={'prof'}>
								prof
							</option>
							<option key={2} value={'admin'}>
								admin
							</option>
						</select>
					</div>
					<div>
						<label htmlFor='filiere'>Filiere</label>
						<input type='text' name='filiere' onChange={handleChange} />
					</div>
				</div>

				<div className={formClasses.splitForm}>
					<div>
						<label htmlFor='tel'>Tel </label>
						<input type='text' name='tel' onChange={handleChange} />
					</div>
					<div>
						<label htmlFor='adresse'>Adresse</label>
						<input type='text' name='adresse' onChange={handleChange} />
					</div>
				</div>

				<div>
					<label htmlFor='description'>Description</label>
					<textarea
						className={formClasses.textarea}
						name='description'
						onChange={handleChange}
					/>
				</div>

				<div>
					<input type='Submit' defaultValue='Ajouter Utilisateur' />
				</div>
			</form>
		</div>
	);
};

export default AddUser;
