import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ref, remove } from 'firebase/database';
import { db } from '../../firebase';

const DeleteModule = () => {
	let { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function deleteusers() {
			try {
				const coursRef = ref(db, `cours/${id}`); // Get a reference to the user in the database
				await remove(coursRef);
				navigate('/admin/modules', { state: { done: true, status: 'delete' } });
			} catch (error) {
				console.log(error);
			}
		}
		deleteusers();
	}, []);

	return <div></div>;
};

export default DeleteModule;
