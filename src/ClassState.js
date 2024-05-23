import React from 'react';
import { Loading } from './Loading';

class ClassState extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            loading: false,
        };
    }

    // UNSAFE_componentWillMount() {
    //     console.log('componentWillMount');
    // }

    // componentWillUnmount() {
    //     console.log('componentWillUnmount');
    // }

    // componentDidMount() {
    //     console.log('componentDidMount');
    // }

    componentDidUpdate() {
        console.log(':.Actualización.:');

        if (this.state.loading) {
            setTimeout(() => {
                console.log('Iniciando validación');

                this.setState({ loading: false });

                console.log('Terminando validación');
            }, 3000);
        }
    }

    render() {

        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>

                <p>Por favor, escribe el código de seguridad.</p>

                {this.state.error && (
                    <p>Error: el código es incorrecto</p>
                )}

                {this.state.loading && (
                    <Loading />
                )}

                <input type="text" placeholder='Código de Seguridad' />
                <button onClick={() => this.setState({ loading: true })}>Comprobar</button>
            </div>
        );
    }
}

export { ClassState };