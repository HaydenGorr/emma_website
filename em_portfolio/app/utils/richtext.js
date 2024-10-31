
const style_map = {
    bold: (str) => `**${str}**`,
    italic: (str) => `*${str}*`,
}

export const parse_api_richtext = (array_of_text) => {
    
    let str = ""

    array_of_text.map((val, index) => {
        let text = val.text

        let last_char= text.charAt(text.length - 1) == " " ? " " : "" 
        if (last_char == " ") text = text.slice(0, text.length-1)

        if (val.hasOwnProperty('bold')){
            str += style_map.bold(text) + last_char
            return
        }

        if (val.hasOwnProperty('italic')){
            str += style_map.italic(text) + last_char
            return
        }

        str += text + last_char
    })

    return str
}