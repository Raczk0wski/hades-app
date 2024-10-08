import { FaTrash } from 'react-icons/fa';
import './Trash.css';

const TrashIcon = ({ onClick }) => {
    return <FaTrash  className="Trash" onClick={onClick} />;
};

export default TrashIcon;