import buildTextInput from "./buildTextInput";

export default (inputs) => {
    return inputs
        .map((input, index) => {
            switch (input.type) {
                case 'text':
                    return buildTextInput(input);
            } 
        })
        .join('\n');
}