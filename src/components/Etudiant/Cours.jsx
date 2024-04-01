import React, { Fragment, useEffect, useState } from 'react';

import classes from './Etudiant.module.scss';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { convertObjectToArray, getData } from '../../store/url';
const Cours = () => {
	const [cours, setcours] = useState([]);

	useEffect(() => {
		async function getAbscences() {
			try {
				const mesprofs = convertObjectToArray(await getData('users')).filter(
					(u) => u.role === 'prof'
				);

				const cours = convertObjectToArray(await getData('cours')).map((c) => {
					const p = mesprofs.find((u) => u.id === c.user_id);
					if (!p) {
						return null;
					}

					return { ...c, pNom: p?.nom, prenom: p?.prenom };
				});

				setcours(cours.filter((a) => a));
			} catch (error) {
				console.log(error);
				setcours(null);
			}
		}
		getAbscences();
	}, []);

	return (
		<Fragment>
			<h1>Mes Cours</h1>
			<div>
				<div className={classes.cours_container}>
					{cours?.map((d, i) => (
						<div key={i}>
							<HiOutlineDocumentText />
							<h3>{d.nom}</h3>
							<div>enseigné par</div>
							{d.pNom && d.prenom && (
								<p style={{ fontSize: '14px' }}>{`${d.pNom} ${d.prenom}`}</p>
							)}
						</div>
					))}
				</div>
			</div>
		</Fragment>
	);
};

export default Cours;
