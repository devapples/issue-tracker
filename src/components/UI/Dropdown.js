function Dropdown({options, ...props}) {
    return (
        <select className='form-select' {...props}>
            {options.map(opt => <option value={opt[1]} key={opt[1]}>{opt[0]}</option>)}
        </select>
    );
}

export default Dropdown;
