const SpcBtwn = ({children}) => children.slice(1).reduce((res, curr) => [...res, ' ', curr], [children[0]]);

export default SpcBtwn;
