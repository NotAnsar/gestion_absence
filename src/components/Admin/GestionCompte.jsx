import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import classes from './Admin.module.scss';
import url, { convertObjectToArray, getData } from '../../store/url';
import Alert from '../../assets/Alert';

const GestionCompte = () => {
	const { user } = useSelector((state) => state.auth);
	const [users, setusers] = useState([]);
	const [page, setPage] = useState({
		left: 0,
		dataInOnePage: 6,
		right: 6,
		currentpage: 0,
		totalPage: 0,
	});
	const location = useLocation();
	const [msg, setmsg] = useState('');
	const [alert, setIsAlertVisible] = useState(false);

	const showAlert = () => {
		setIsAlertVisible(true);

		setTimeout(() => {
			setIsAlertVisible(false);
		}, 3000);
	};

	function nextPage() {
		if (page.currentpage < page.totalPage) {
			setPage((prev) => ({
				...prev,
				left: (page.currentpage + 1) * page.dataInOnePage,
				right: (page.currentpage + 1) * page.dataInOnePage + page.dataInOnePage,
				currentpage: page.currentpage + 1,
			}));
		}
	}

	function previousPage() {
		if (page.currentpage > 0) {
			setPage((prev) => ({
				...prev,
				left: (page.currentpage - 1) * page.dataInOnePage,
				right: (page.currentpage - 1) * page.dataInOnePage + page.dataInOnePage,
				currentpage: page.currentpage - 1,
			}));
		}
	}

	useEffect(() => {
		if (location.state?.done) {
			if (location.state?.status === 'add') {
				setmsg('Utilisateur Ajouté avec succès');
			}
			if (location.state?.status === 'update') {
				setmsg('Utilisateur Modifié avec succès');
			}
			if (location.state?.status === 'delete') {
				setmsg('Utilisateur supprimé avec succès');
			}
			showAlert();
		}
		async function getusers() {
			try {
				const users = convertObjectToArray(await getData('users'));
				if (!users) throw new Error();

				const data = users.filter((u) => u.id !== user.id);

				setPage((prev) => ({
					...prev,
					totalPage: Math.ceil(data.length / page.dataInOnePage) - 1,
				}));

				setusers(data);
			} catch (error) {
				setusers(null);
			}
		}
		getusers();
	}, []);

	return (
		<div className={classes.abscences}>
			<h1>Gestion des Comptes </h1>

			<div className={classes.title_container}>
				<div className={classes.pagination}>
					<span
						className={page.currentpage === 0 ? classes.disabeled : ''}
						onClick={previousPage}
					>
						Previous
					</span>
					<span
						onClick={nextPage}
						className={
							page.currentpage === page.totalPage ? classes.disabeled : ''
						}
					>
						Next
					</span>
				</div>

				<div className={classes.add}>
					<Link to='add'>
						<input
							className={classes.btn__green}
							type='Submit'
							placeholder='Add new User'
							defaultValue='Add new User'
						/>
					</Link>
				</div>
			</div>
			{alert && <Alert msg={msg} color='green' />}
			<table className={classes.styled_table}>
				<thead>
					<tr>
						<th>Id</th>
						<th>Nom</th>
						<th>Prenom</th>
						<th>Email</th>
						<th>Role</th>
						<th>Update</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{users.slice(page.left, page.right).map((u) => (
						<tr key={u.id}>
							<td>{u.id}</td>
							<td>{u.nom}</td>
							<td>{u.prenom}</td>
							<td>{u.email}</td>
							<td>{u.role}</td>
							<td>
								<Link to={`update/${u.id}`}>
									<input
										type='Submit'
										placeholder='Update'
										defaultValue='Update'
									/>
								</Link>
							</td>
							<td>
								<Link to={`delete/${u.id}`}>
									<input
										className={classes.btn__red}
										type='Submit'
										placeholder='Delete'
										defaultValue='Delete'
									/>
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default GestionCompte;
