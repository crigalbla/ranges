import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { Range } from '../components';

const Exercise1 = () => {
    const history = useHistory();
    const [values, setValues] = useState();

    useEffect(() => {
        fetch('http://demo4817050.mockable.io/exercise1').then(async (response) => {
            setValues(await response.json());
        }).catch(() => setValues({ min: 15, max: 75 }));
    }, []);

    return (
        <div className="d-flex align-items-center flex-column p-3">
            <Button className="w-25" onClick={() => history.push('/exercise2')}>Ir a ejericio 2</Button>
            {values
                ? <Range width={400} values={values} />
                : 'Cargando...'}
        </div>
    );
};

export default Exercise1;
