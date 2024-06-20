const rem = (x: number) => {

    if (typeof window == "undefined") {
        throw new Error("Cannot use rem function in server rendering.");
    }

    const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const xRem = x * fontSize;
    return xRem;
}

export default rem;
