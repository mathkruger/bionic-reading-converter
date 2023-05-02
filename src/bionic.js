function toBionic(text, format = "markdown") {
    const tokens = text.replace("\n", " ").replace("\r", " ").split(" ").map(x => x.trim());
    console.log(tokens);
    return tokens.map(x => {
        if (x.length <= 2) {
            return getBoldText(x, format);
        }

        const quantityToHighlight = Math.trunc(x.length / 2);
        const quantityToMaintain  = Math.abs(x.length - quantityToHighlight);


        return `${getBoldText(x.substr(0, quantityToHighlight), format)}${x.substr(quantityToHighlight, quantityToMaintain)}`;
    }).join(" ");
}

function getBoldText(text, format = "markdown") {
    switch (format) {
        case "markdown":
            return `**${text}**`;
        case "html":
            return `<strong>${text}</strong>`;
        default:
            throw new Error(`"${format}" format is not supported yet :(`);
    }
}

export {
    toBionic
};