import buildTextInput from "./buildTextInput.js";

export default (inputs) => {
    return inputs
        .map((input) => {
            switch (input.type) {
                case 'text':
                    return buildTextInput(input);
            } 
        })
        .join('\n');
}