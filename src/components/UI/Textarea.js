function Textarea({hint,...props}) {
    return (
        <textarea
            className='form-control'
            placeholder={hint}
            {...props}
        />
    );
}

export default Textarea;
