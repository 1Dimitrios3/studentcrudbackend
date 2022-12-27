var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStudents = void 0;
const unfetch_1 = __importDefault(require("unfetch"));
function checkStatus(response) {
    if (response.ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}
const getAllStudents = () => (0, unfetch_1.default)("api/v1/students")
    .then(checkStatus);
exports.getAllStudents = getAllStudents;
