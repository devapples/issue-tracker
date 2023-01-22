const truncate = (text, length) => text.length > length ? text.slice(0, length) + '\u{2026}' : text; // \u{2026} = …

export default truncate;
