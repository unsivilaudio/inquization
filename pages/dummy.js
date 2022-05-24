import Alert from '../components/ui/Alert';

const Dummy = props => {
    return (
        <div className='container'>
            Welcome to the Dummy Component
            <Alert type='success'>This is a success Alert</Alert>
        </div>
    );
};

export default Dummy;
