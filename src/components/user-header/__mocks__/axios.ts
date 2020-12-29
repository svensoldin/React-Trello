export default {
	defaults: {
		withCredentials: true,
	},
	post: jest.fn(() => Promise.resolve({ data: {} })),
};
