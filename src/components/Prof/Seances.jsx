import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from './Prof.module.scss';
import url, {
	convertObjectToArray,
	formatDate,
	formatTime,
	getData,
} from '../../store/url';
import { useSelector } from 'react-redux';
import Alert from '../../assets/Alert';

const Seances = () => {
	const { user } = useSelector((state) => state.auth);
	const [seance, setseance] = useState([]);
	const dataInOnePage = 6;
	const [page, setPage] = useState({
		left: 0,
		dataInOnePage,
		right: dataInOnePage,
		currentpage: 0,
		totalPage: 0,
	});
	const location = useLocation();
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
			showAlert();
		}

		async function getSeance() {
			try {
				const seancesDB = await getData('seances');
				const seances = convertObjectToArray(seancesDB).filter(
					(u) => u.cours.user_id === user.id
				);

				setPage((prev) => ({
					...prev,
					totalPage: Math.ceil(seances.length / page.dataInOnePage) - 1,
				}));

				setseance(seances);
			} catch (error) {
				console.log(error);
				setseance(null);
			}
		}
		getSeance();
	}, []);

	return (
		<>
			<div className={classes.abscences}>
				<div className={classes.title_container}>
					<h1>Seances</h1>

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
				{alert && <Alert msg={'Abscences Ajouter'} color='green' />}
				<table className={classes.styled_table}>
					<thead>
						<tr>
							<th>Id Seance</th>
							<th>Module</th>
							<th>Date De Seance</th>
							<th>Heure debut</th>
							<th>Heure fin</th>
							<th>Ajouter Abscences</th>
						</tr>
					</thead>
					<tbody>
						{seance.slice(page.left, page.right).map((s) => (
							<tr key={s.id}>
								<td>{s.id}</td>
								<td>{s.cours.nom}</td>
								<td>{formatDate(s.date_sceance)}</td>

								<td>{formatTime(s.date_debut)}</td>
								<td>{formatTime(s.date_fin)}</td>
								<td>
									<Link to={`abscences/${s.id}`}>
										<input type='button' defaultValue='Ajouter Abscences' />
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Seances;
