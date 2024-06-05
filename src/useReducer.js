import { type } from '@testing-library/user-event/dist/type';
import React from 'react';

const SECURITY_CODE = 'paradigma';
function UseReducer({ name }) {

    const initialState = {
        value: '',
        confirmed: false,
        loading: false,
        error: false,
        deleted: false
    }

    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        console.log('Empezando el efecto');

        if (!!state.loading) {
            setTimeout(() => {
                console.log('Iniciando validación');
                if (state.value === SECURITY_CODE) {
                    dispatch({
                        type: 'CONFIRM'
                    });
                } else {
                    dispatch({ type: 'ERROR' });
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
                        dispatch({
                            type: 'WRITE',
                            payload: event.target.value
                        });
                    }}
                />
                <button
                    onClick={() => { dispatch({ type: 'CHECK' }) }}
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
                    onClick={() => { dispatch({ type: 'DELETE' }); }}
                >
                    Si, eliminar
                </button>
                <button
                    onClick={() => { dispatch({ type: 'RESET' }); }}
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
                    onClick={() => { dispatch({ type: 'RESET' }); }}
                >
                    Resetear, volver atrás
                </button>
            </React.Fragment>
        );
    }
}




const reducerObject = (state, payload) => ({
    'CONFIRM': {
        ...state,
        confirmed: true,
        loading: false,
        error: false
    },
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'CHECK': {
        ...state,
        loading: true
    },
    'DELETE': {
        ...state,
        deleted: true
    },
    'RESET': {
        ...state,
        confirmed: false,
        deleted: false,
        value: ""
    },
    'WRITE': {
        ...state,
        value: payload

    }
})

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
}

export { UseReducer };
