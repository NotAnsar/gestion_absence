import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import url from '../../store/url';
import { db } from '../../firebase';
import { ref, remove } from 'firebase/database';

const DeleteUser = () => {
	let { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function deleteUser() {
			try {
				const userRef = ref(db, `users/${id}`); // Get a reference to the user in the database

				await remove(userRef);

				console.log('User deleted successfully from Firebase');
				navigate('/admin', { state: { done: true, status: 'delete' } });
			} catch (error) {
				console.log('Error deleting user from Firebase:', error);
				navigate('/admin');
			}
		}

		deleteUser();
	}, []);

	return <div></div>;
};

export default DeleteUser;
