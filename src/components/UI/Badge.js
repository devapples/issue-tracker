function Badge({excls, icon, children}) {
    return (
        <span className={`badge ${excls}`}>
            {icon && <><i className={`bi bi-${icon}`}></i> </>}
            <span>{children}</span>
        </span>
    );
}

export default Badge;
