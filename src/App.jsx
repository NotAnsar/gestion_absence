import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Admin from './components/Admin/Admin';

import { Etudiant } from './components/Etudiant/Etudiant';

import LoginForm from './components/Login/LoginForm';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Prof from './components/Prof/Prof';

function App() {
	const navigate = useNavigate();
	const {
		loggedIn,
		user: { role },
	} = useSelector((state) => state.auth);

	useEffect(() => {
		if (!loggedIn) navigate('/');
	}, [loggedIn]);

	return (
		<Fragment>
			<Routes>
				<Route path='/' element={<LoginForm />} />
				{loggedIn && role === 'etudiant' && (
					<Route path='/etudiant/*' element={<Etudiant />} />
				)}

				{loggedIn && role === 'prof' && (
					<Route path='/prof/*' element={<Prof />} />
				)}

				{loggedIn && role === 'admin' && (
					<Route path='/admin/*' element={<Admin />} />
				)}

				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</Fragment>
	);
}

export default App;
