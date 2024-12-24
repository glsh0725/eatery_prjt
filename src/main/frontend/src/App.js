import {useEffect, useState} from "react";
import axios from "axios";
import { RouterProvider } from 'react-router-dom';
import root from './router/root';

function App() {
  const [hello, setHello] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    axios.get('http://localhost:18080/api/main')
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
          <div className="App">
            백엔드에서 받은 데이터 : {hello}
            {error && <p>Error : {error}</p>}
          </div>
      </>
  );
}

export default App;