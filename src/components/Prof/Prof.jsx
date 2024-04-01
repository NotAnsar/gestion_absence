import classes from './Prof.module.scss';
import NavBar from '../NavBar/NavBar';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Route, Routes } from 'react-router-dom';
import Profil from '../Profil/Profil';
import MesModules from './MesModules';
import ListAbscences from './ListAbscences';
import Seances from './Seances';
import AddAbscence from './AddAbscence';

const Prof = () => {
	return (
		<>
			<NavBar />

			<main className={`${classes.wrapper} ${classes.main}`}>
				<Routes>
					<Route path='' element={<MesModules />} />
					<Route path='profile' element={<Profil />} />
					<Route path='seances' element={<Seances />} />
					<Route path='list' element={<ListAbscences />} />
					<Route path='seances/abscences/:id' element={<AddAbscence />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</main>
		</>
	);
};

export default Prof;
