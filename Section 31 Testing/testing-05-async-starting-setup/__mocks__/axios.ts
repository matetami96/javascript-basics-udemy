// __mocks__/axios.ts
export const get = jest.fn(() => {
	console.log("Fetching data mock");
	return Promise.resolve({ data: { title: "delectus aut autem" } });
});

export default {
	get,
};
