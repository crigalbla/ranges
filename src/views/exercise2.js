import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { Range } from '../components';

const Exercise1 = () => {
    const history = useHistory();
    const [values, setValues] = useState();

    useEffect(() => {
        fetch('http://demo4817050.mockable.io/exercise2').then(async (response) => {
            setValues(await response.json());
        }).catch(() => setValues([1.99, 5.99, 10.99, 30.99, 50.99, 70.99, 80, 91.15, 100.33]));
    }, []);

    return (
        <div className="d-flex align-items-center flex-column p-3">
            <Button className="w-25" onClick={() => history.push('/exercise1')}>Ir a ejericio 1</Button>
            {values
                ? <Range width={400} values={values} />
                : 'Cargando...'}
        </div>
    );
};

export default Exercise1;
