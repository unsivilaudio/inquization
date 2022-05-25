import Alert from '../components/ui/Alert';

const Dummy = props => {
    return (
        <div style={dummyStyles.container}>
            <div style={dummyStyles.header}>Welcome to the Dummy Component</div>
            <Alert type='error'>This is a success Alert</Alert>
        </div>
    );
};

const dummyStyles = {
    container: {
        marginTop: '3rem',
    },
    header: {
        fontSize: '3.2rem',
        fontFamily: 'Lato',
        fontWeight: 300,
        letterSpacing: '0.3rem',
    },
};

export default Dummy;
