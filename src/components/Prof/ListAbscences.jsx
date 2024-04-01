import { useEffect, useState } from 'react';
import classes from './Prof.module.scss';
import url, {
	convertObjectToArray,
	formatDate,
	formatTime,
	getData,
} from '../../store/url';
import { useSelector } from 'react-redux';

const ListAbscences = () => {
	const { user } = useSelector((state) => state.auth);
	const [abscence, setabscence] = useState([]);
	const dataInOnePage = 6;
	const [page, setPage] = useState({
		left: 0,
		dataInOnePage,
		right: dataInOnePage,
		currentpage: 0,
		totalPage: 0,
	});

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
		async function getAbscence() {
			try {
				const abscence = convertObjectToArray(await getData('absences'));
				if (!abscence) throw new Error();

				const mesAbscences = abscence.filter(
					(u) => u.sceance.cours.user_id === user.id
				);

				setPage((prev) => ({
					...prev,
					totalPage: Math.ceil(mesAbscences.length / page.dataInOnePage) - 1,
				}));

				setabscence(mesAbscences);
			} catch (error) {
				console.log(error, 'error');
				setabscence(null);
			}
		}
		getAbscence();
	}, []);
	return (
		<div className={classes.abscences}>
			<div className={classes.title_container}>
				<h1>List des Abscences</h1>

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

			<table className={classes.styled_table}>
				<thead>
					<tr>
						<th>Module</th>
						<th>Id Etudiant</th>
						<th>Nom Etudiant</th>
						<th>Date De Seance</th>
						<th>Heure debut</th>
						<th>Heure fin</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{abscence?.slice(page.left, page.right).map((s) => (
						<tr key={s.id}>
							<td>{s.sceance.cours.nom}</td>
							<td>{s.user.id}</td>
							<td>{`${s.user.nom} ${s.user.prenom}`}</td>
							<td>{formatDate(s.sceance.date_sceance)}</td>
							<td>{formatTime(s.sceance.date_debut)}</td>
							<td>{formatTime(s.sceance.date_fin)}</td>
							<td>{s.status}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ListAbscences;
