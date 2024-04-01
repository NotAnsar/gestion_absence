import { get, ref } from 'firebase/database';
import { db } from '../firebase';

const url =
	'https://gestion-abscences-default-rtdb.europe-west1.firebasedatabase.app';

export default url;

export function convertObjectToArray(data, nestedId = true) {
	const dataArray = [];
	for (const key in data) {
		if (Object.hasOwnProperty.call(data, key)) {
			const item = data[key];
			if (typeof item === 'object' && !Array.isArray(item)) {
				item['nestedid'] = key; // Add id property to each object
				dataArray.push(item);
			}
		}
	}

	return dataArray;
}

export function formatDate(dateString) {
	const dateObj = new Date(dateString);
	const day = dateObj.getDate().toString().padStart(2, '0');
	const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
	const year = dateObj.getFullYear().toString();
	return `${day}-${month}-${year}`;
}

export function formatTime(timeString) {
	const timeObj = new Date(timeString);
	const hour = timeObj.getHours().toString().padStart(2, '0');
	return `${hour}:00`;
}

export async function getData(collection) {
	try {
		const myref = ref(db, collection);
		const snapshot = await get(myref);

		if (snapshot.exists()) {
			return snapshot.val();
		}
		return undefined;
	} catch (error) {
		return undefined;
	}
}
