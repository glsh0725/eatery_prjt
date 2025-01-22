import {useEffect, useState} from "react";
import axios from "axios";
import { RouterProvider } from 'react-router-dom';
import root from './router/root';

function App() {
    const [hello, setHello] = useState('');
    const [error, setError] = useState('');
    useEffect(() => {
    axios.get('http://192.168.0.61:18080/api/main')
        .then((res) => {
            setHello(res.data);
        })
        .catch((err) => {
            setError(err.message);
        });
    }, []);

    return (
        <>
            <RouterProvider router={root} />
        </>
    );
}

export default App;