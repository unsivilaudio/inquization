import classes from '../../styles/ui/Select.module.scss';

const Select = ({ label, name, options, onChange }) => {
    return (
        <div className={classes.Select}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.SelectWrapper}>
                <select name={name} id={name} onChange={onChange}>
                    {options.map(option => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Select;
