import React from 'react';

const SECURITY_CODE = 'paradigma';
function UseState({ name }) {

    // const [value, setValue] = React.useState("");
    // const [error, setError] = React.useState(false);
    // const [loading, setLoading] = React.useState(false);

    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false
    });

    console.log(state);
    React.useEffect(() => {
        console.log('Empezando el efecto');

        if (state.loading) {
            setTimeout(() => {
                console.log('Iniciando validación');
                if (state.value === SECURITY_CODE) {
                    setState({ ...state, loading: false, error: false });
                    // setLoading(false)
                    // setError(false);
                } else {
                    setState({ ...state, loading: false, error: true });
                }


                console.log('Terminando validación');
            }, 3000);
        }

        console.log('Terminando el efecto');
    }, [state.loading]);

    return (
        <div>
            <h2>Eliminar {name}</h2>

            <p>Por favor, escribe el código de seguridad.</p>

            {(state.error && !state.loading) && (
                <p>Error: el código es incorrecto</p>
            )}

            {state.loading && (
                <p>Cargando...</p>
            )}

            <input type="text" placeholder='Código de Seguridad' value={state.value} onChange={(event) => {
                setState({ ...state, value: event.target.value });
            }} />
            <button
                onClick={() => {
                    setState({ ...state, loading: true });
                }}
            >
                Comprobar
            </button>
        </div>
    );
}

export { UseState };