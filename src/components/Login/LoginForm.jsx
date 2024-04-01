import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import fssmLogo from '../../assets/fssm.png';
import classes from './Form.module.scss';
import { db } from '../../firebase';
import { get, ref } from 'firebase/database';
import { getLogin } from '../../store/authSlice';
import { getData } from '../../store/url';

const LoginForm = () => {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		loggedIn,
		user: { role },
		error,
	} = useSelector((state) => state.auth);

	useEffect(() => {
		if (loggedIn) {
			if (role === 'etudiant') {
				navigate('/etudiant');
			}
			if (role === 'prof') {
				navigate('/prof');
			}
			if (role === 'admin') {
				navigate('/admin');
			}
		}
	}, [loggedIn]);

	const formHandler = (e) => {
		e.preventDefault();
		if (!formData.email.includes('@') || !formData.password.length > 4) return;

		const login = async () => {
			try {
				const userdata = await getData('users');

				if (!userdata) throw new Error();

				const userFound = Object.values(userdata).filter(
					(user) =>
						user.email === formData.email && user.password === formData.password
				);
				if (userFound.length === 0) throw new Error();

				return dispatch(
					getLogin({ ...userFound[0], error: false, loggedIn: true })
				);
			} catch (error) {
				console.log(error, 'error');
				return dispatch(getLogin({ error: true, loggedIn: false }));
			}
		};

		login();
	};

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<div className={classes.login}>
			<div className={classes.container}>
				{/* {errorr.error && <p className={classes.alert}>{errorr.message}.</p>} */}
				{error && (
					<p className={classes.alert}>Login Or Password Are Incorrect</p>
				)}

				<div className={classes.form}>
					<form onSubmit={formHandler}>
						<img src={fssmLogo} className={classes.logo} />
						<br />
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							onChange={handleChange}
							value={formData.email}
							required
						/>
						<label htmlFor='password'>Mot de passe</label>
						<input
							type='password'
							name='password'
							minLength='6'
							value={formData.password}
							onChange={handleChange}
							required
						/>
						<input
							type='Submit'
							placeholder='Connexion'
							defaultValue='Connexion'
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
