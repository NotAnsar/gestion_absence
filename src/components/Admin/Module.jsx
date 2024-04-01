import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from './Admin.module.scss';
import url, { convertObjectToArray, getData } from '../../store/url';
import Alert from '../../assets/Alert';

const Module = () => {
	const [modules, setModules] = useState([]);

	const location = useLocation();
	const [msg, setmsg] = useState('');
	const [alert, setIsAlertVisible] = useState(false);
	const [page, setPage] = useState({
		left: 0,
		dataInOnePage: 6,
		right: 6,
		currentpage: 0,
		totalPage: 0,
	});
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
		async function getmodules() {
			try {
				const cours = convertObjectToArray(await getData('cours'));
				const users = convertObjectToArray(await getData('users'));
				if (!cours || !users) throw new Error();
				setPage((prev) => ({
					...prev,
					totalPage: Math.ceil(cours.length / page.dataInOnePage) - 1,
				}));
				setModules(cours);
			} catch (error) {
				console.log(error);
				setModules(null);
			}
		}
		getmodules();
	}, []);
	return (
		<div className={classes.abscences}>
			<h1>Gestion des Modules </h1>

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
							placeholder='Add new Module'
							defaultValue='Add new Module'
						/>
					</Link>
				</div>
			</div>
			{alert && <Alert msg={msg} color='green' />}
			<table className={classes.styled_table}>
				<thead>
					<tr>
						<th>Id</th>
						<th>Nom du Module</th>
						<th>IdProf</th>

						<th>Update</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{modules.slice(page.left, page.right).map((m) => (
						<tr key={m.id}>
							<td>{m.id}</td>
							<td>{m.nom}</td>
							<td>{m.user_id}</td>

							<td>
								<Link to={`update/${m.id}`}>
									<input
										type='Submit'
										placeholder='Update'
										defaultValue='Update'
									/>
								</Link>
							</td>
							<td>
								<Link to={`delete/${m.id}`}>
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

export default Module;
