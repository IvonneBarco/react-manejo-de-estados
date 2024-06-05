# CLASE 10: Estados imperativos con useState
Un paradigma es la extracción de la realidad para llevarlo a nuestro código
- **Paradigma imperativo:** describir claramente el paso a paso de todo lo que hagamos en nuestro código
- **Paradigma declarativo:** describe la acción y el proceso que se va a ejecutar

# CLASE 11: Estados semideclarativos con useState
consiste en abstraer los cambios de estado a funciones o métodos que nos permitan organizar el código de tal forma que se describa que proceso se esta realizando con los cambios de estado.

# CLASE 12: ¿Qué es un reducer?
- Son una herramienta que nos permite declarar todos los posibles estados de nuestra App para llamarlos de forma declarativa.
- Necesitan 2 objetos esenciales: los estados compuestos y las acciones.

#### Los estados compuestos:

* Son un objeto donde van a vivir como propiedades todos nuestros estados

#### Acciones

- Responsables, al ser disparados, de pasar de un estado a otro.
- Este objeto tiene 2 propiedades: action type y action payload.
  - *Action type:* Define el nombre clave para encontrar el nuevo estado.

  - *Action payload:* Es opcional e importante con estados dinámicos. Un estado es dinamico cuando depende del llamado de un API, de lo escrito por el usuario en un input, etc. Estos son estados dinámicos y los recibimos con un payload.

#### Flujo de trabajo:

1. Definimos distintos tipos de acciones con type y payload.
2. Enviamos estas acciones a nuestro reducer.
3. El reducer define los posibles estados por donde pasara nuestra App.
4. Con action type elegimos cual de esos estados queremos disponer con el cambio o evento del usuario.
5. Con action payload damos dinamismo a dicho estado. Será el mismo estado pero le daremos características especiales

# CLASE 13: 3 formas de crear un reducer
1. Reducer con condiciona `if`
```
const reducerIf = (state, action) => {
    if (action.type === 'ERROR') {
        return {
            ...state,
            error: true,
            loading: false,
        };
    } else if (action.type === 'CHECK') {
        return {
            ...state,
            loading: true,
        };
    } else {
        return {
            ...initialState
        }
    }
}
```
2. Reducer con `switch`
```
const reducerSwitch = (state, action) => {

    switch (action.type) {
        case 'ERROR':
            return {
                ...state,
                error: true,
                loading: false,
            };
        case 'CHECK':
            return {
                ...state,
                loading: true,
            };
        default:
            return {
                ...state
            }
    }
}
```
1. Recucer con `ReducerObject`
```
   const reducerObject = (state) => ({
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'CHECK': {
        ...state,
        loading: true
    }
})

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state)[action.type];
    } else {
        return state;
    }
}
```