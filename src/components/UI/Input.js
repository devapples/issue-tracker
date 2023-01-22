function Input({hint, ...props}) {
    return (
        <input
            className='form-control'
            placeholder={hint}
            {...props}
        />
    );
}

export default Input;
