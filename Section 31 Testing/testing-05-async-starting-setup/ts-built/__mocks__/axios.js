"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
// __mocks__/axios.ts
exports.get = jest.fn(() => {
    console.log("Fetching data mock");
    return Promise.resolve({ data: { title: "delectus aut autem" } });
});
exports.default = {
    get: exports.get,
};
