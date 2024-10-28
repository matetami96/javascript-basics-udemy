import axios from "axios";

type ResponseType = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

export const fetchData = async (): Promise<ResponseType> => {
	console.log("Fetching data...");
	const response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
	return response.data;
};
