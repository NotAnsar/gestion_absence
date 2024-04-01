import React, { Fragment } from 'react';

import classes from './Etudiant.module.scss';

import NavBar from '../NavBar/NavBar';
import Abscences from './Abscences';
import Profil from '../Profil/Profil';

import Cours from './Cours';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Route, Routes } from 'react-router-dom';
import Justification from './Justification';

export const Etudiant = () => {
	return (
		<Fragment>
			<NavBar />

			<main className={`${classes.wrapper} ${classes.main}`}>
				<Routes>
					<Route path='' element={<Abscences />} />
					<Route path='justification/:id' element={<Justification />} />

					<Route path='cours' element={<Cours />} /> 
					<Route path='profile' element={<Profil />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</main>
		</Fragment>
	);
};
