var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const antd_1 = require("antd");
const service_1 = require("./service");
require("./App.css");
function App() {
    const [students, setStudents] = (0, react_2.useState)([]);
    const fetchStudents = () => (0, service_1.getAllStudents)()
        .then(res => res.json())
        .then(data => setStudents(data));
    (0, react_2.useEffect)(() => {
        fetchStudents();
    }, []);
    if (students.length <= 0) {
        return <antd_1.Spin />;
    }
    return (<>
    {students.map((student, index) => {
            <p key={index}>{student.id} {student.name}</p>;
        })}
    </>);
}
exports.default = App;
