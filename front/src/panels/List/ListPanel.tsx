import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function ListPanel() {
    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3001/api/list/${id}`, {credentials: "include"})
            .then(response => response.json())
            .then(json => setData);
    }, [id]);
    return (
        <div>{JSON.stringify(data)}</div>
    );
}
