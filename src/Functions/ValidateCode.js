const validateCode = (code, setErrors) => {
    let O;
    let sequence;
    let numeric
    let newErrors = [];
    let toolNumber = "00";
    let offsetNumber = "00";
    let toolChanged = false
    let blockQueue = []

    for (let i = 0; i < code.length; i++) {
        let block = code[i]

        for (let word of block) {
            blockQueue.push(word)
            if (word.startsWith('O')) O = word.replace(/\D/g, '');

            let formatError = detectFormatErrors(word, i)
            newErrors = newErrors.concat(formatError)
            let dotMissingError = detectDotMissingError(word, i)
            newErrors = newErrors.concat(dotMissingError)

            // Set Sequence
            if (word.startsWith('N')) {
                numeric = word.match(/[\d\-.]+/g).join('');
                numeric = parseInt(numeric)
                // Sequence Start
                if (numeric < 100) {
                    sequence = numeric
                    toolChanged = false
                    if(offsetNumber!=="00"){
                        newErrors.push({ state: "warning", line: i + 1, message: "The offset number was not initialized." })
                    }
                }
            }


            if (word.startsWith('T')) {
                numeric = word.match(/[\d\-.]+/g).join('');
                if (numeric.length === 3) {
                    numeric = numeric.padStart(4, '0');
                }
                let currentTool = numeric.slice(0, 2);
                let currentOffeset = numeric.slice(-2);

                if ((currentTool !== currentOffeset) && (currentOffeset !== "00")) {
                    newErrors.push({ state: "warning", line: i + 1, message: "The tool number and offset number don't match." })
                }

                if (!toolChanged && currentOffeset === "00") {
                    toolNumber = currentTool
                    offsetNumber = currentOffeset
                    toolChanged = true
                } else if (toolChanged && toolNumber !== currentTool) {
                    newErrors.push({ state: "warning", line: i + 1, message: "The tool numbers used in that sequence are different." })
                }
            }

            if(blockQueue.length>20){
                blockQueue.shift();
            }
        }
    }
    setErrors(newErrors)
};

const detectDotMissingError = (block, i) => {
    const startRegex = /^[ABCIJKUVWXYZFR]/;
    let newErrors = [];
    let errorMessage = `The numeric is missing a dot.`
    if (startRegex.test(block)) {
        let numeric = block.match(/[\d\-.]+/g).join('');

        if (numeric !== '0' && !numeric.includes('.')) {
            newErrors.push({ state: "warning", line: i + 1, message: errorMessage })
        }
    }
    return newErrors;

}

const detectFormatErrors = (block, i) => {
    let newErrors = [];
    let errorMessage = `Check the block format`

    const regexA = /^[GHMOPST]/;
    const regexB = /^[FQR]/;
    const regexC = /^[ABCIJKUVWXYZ]/;
    if (regexA.test(block)) {
        const regexAF = /^[A-Za-z]\d+$/
        if (!regexAF.test(block)) {
            newErrors.push({ state: "error", line: i + 1, message: errorMessage })
        }
    } else if (regexB.test(block)) {
        const regexBF = /^[A-Za-z]\d*\.?\d*\.?$/
        if (!regexBF.test(block)) {
            newErrors.push({ state: "error", line: i + 1, message: errorMessage })
            console.log(block)
        }

    } else if (regexC.test(block)) {
        const regexCF = /^[A-Za-z]-?\d*\.?\d*$/
        if (!regexCF.test(block)) {
            newErrors.push({ state: "error", line: i + 1, message: errorMessage })
        }
    }
    return newErrors;
}


export default validateCode;