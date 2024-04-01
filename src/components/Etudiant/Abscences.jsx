import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from './Etudiant.module.scss';
import url, {
	convertObjectToArray,
	formatDate,
	formatTime,
	getData,
} from '../../store/url';
import { useSelector } from 'react-redux';
import Alert from '../../assets/Alert';

const Abscences = () => {
	const [abscences, setAbscences] = useState([]);
	const { user } = useSelector((state) => state.auth);
	const location = useLocation();
	const [alert, setIsAlertVisible] = useState(false);
	const [page, setPage] = useState({
		left: 0,
		dataInOnePage: 8,
		right: 8,
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
			showAlert();
		}
		async function getAbscences() {
			try {
				const absences = convertObjectToArray(await getData('absences'));

				const myabsences = absences.filter((a) => a.user.id === user.id);

				setPage((prev) => ({
					...prev,
					totalPage: Math.ceil(myabsences.length / page.dataInOnePage) - 1,
				}));

				setAbscences(myabsences);
			} catch (error) {
				console.log(error, 'error');
				setAbscences(null);
			}
		}

		getAbscences();
	}, []);
	return (
		<div className={classes.abscences}>
			<div className={classes.title_container}>
				<h1>Mes Abscences</h1>
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
			</div>
			{alert && <Alert msg={'Justification Ajouter'} color='green' />}
			<table className={classes.styled_table}>
				<thead>
					<tr>
						<th>Module</th>
						<th>Date De Seance</th>
						<th>Heure debut</th>
						<th>Heure fin</th>
						<th>Status</th>

						<th>Justification</th>
					</tr>
				</thead>
				<tbody>
					{abscences.map((a) => (
						<tr key={a.id}>
							<td>{a.sceance.cours.nom}</td>
							<td>{formatDate(a.sceance.date_sceance)}</td>
							<td>{formatTime(a.sceance.date_debut)}</td>
							<td>{formatTime(a.sceance.date_fin)}</td>
							<td>{a.status}</td>
							<td>
								<Link to={`justification/${a.nestedid}`}>
									<input
										type='Submit'
										placeholder='Ajouter Justification'
										defaultValue='Ajouter Justification'
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

export default Abscences;
