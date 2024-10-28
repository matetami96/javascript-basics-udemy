import { fetchData } from "./http";

export const printTitle = async () => {
	const title = await loadTitle();
	console.log(title);
};

export const loadTitle = async () => {
	const extractedData = await fetchData();
	return extractedData.title.toUpperCase();
};
