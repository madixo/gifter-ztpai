import { useContext } from "react";
import { DataContext } from "./List";

// interface Props {
//     openable?: boolean;
//     editable?: boolean;
//     removable?: boolean;
// }

export default function DefaultListControls({ id }: { id?: number }) {
    const data = useContext(DataContext);
    function deleteItem() {
        fetch(`http://localhost:3001/api/list`, {
            method: 'DELETE',
            headers: [
                ['Content-Type', 'application/json']
            ],
            body: JSON.stringify({ id: id })
        });
    }
    return (
        <div className='list-item-controls'>
            {/* {data.openable && (
                <Link to={`/list/${id}`}>
                    <i className='fa-solid fa-link'></i>Otwórz
                </Link>
            )}
            {data.editable && (
                <Link to={`/list/${id}/edit`}>
                    <i className='fa-regular fa-trash-can'></i>Edytuj
                </Link>
            )}
            {data.removable && (
                <button onClick={deleteItem} className='list-item-delete'>
                    <i className='fa-regular fa-trash-can'></i>Usuń
                </button>
            )} */}
        </div>
    );
}
