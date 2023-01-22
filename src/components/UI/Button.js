function Button ({type, children, color, excls, ...props}) {
    return (
        <button
            className={`btn btn-${color} ${excls}`}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}

Button.defaultProps = {
    color: 'primary',
    excls: ''
};
export default Button;
