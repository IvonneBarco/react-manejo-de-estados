import React from 'react';

const SECURITY_CODE = 'paradigma';
function UseState({ name }) {

    // const [value, setValue] = React.useState("");
    // const [error, setError] = React.useState(false);
    // const [loading, setLoading] = React.useState(false);

    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });

    const onConfirm = () => {
        setState({ ...state, confirmed: true, loading: false, error: false });
    }

    const onWrite = (newValue) => {
        setState({ ...state, value: newValue });
    }
    const onError = () => {
        setState({ ...state, error: true, loading: false });
    }

    const onCheck = () => {
        setState({ ...state, loading: true });
    }

    const onDelete = () => {
        setState({ ...state, deleted: true })
    }

    const onReset = () => {
        setState({ ...state, confirmed: false, deleted: false, value: "" })
    }
    React.useEffect(() => {
        console.log('Empezando el efecto');

        if (!!state.loading) {
            setTimeout(() => {
                console.log('Iniciando validación');
                if (state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
                }

                console.log('Terminando validación');
            }, 3000);
        }

        console.log('Terminando el efecto');
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
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

                <input
                    type="text"
                    placeholder='Código de Seguridad'
                    value={state.value}
                    onChange={(event) => {
                        onWrite(event.target.value);
                    }}
                />
                <button
                    onClick={() => { onCheck() }}
                >
                    Comprobar
                </button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Pedimos confirmación. ¿Estás seguro?</p>
                <button
                    onClick={() => { onDelete(); }}
                >
                    Si, eliminar
                </button>
                <button
                    onClick={() => { onReset(); }}
                >
                    No, ya no XD
                </button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con exito</p>
                <button
                    onClick={() => { onReset(); }}
                >
                    Resetear, volver atrás
                </button>
            </React.Fragment>
        );
    }
}

export { UseState };