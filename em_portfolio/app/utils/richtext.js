
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

export const stringify_strapi_richtext = (rich_text_block) => {
    return rich_text_block.map(block => {
        switch (block.type) {
            case 'paragraph':
                return parse_api_richtext(block.children)
            case 'list':
                // Unordered lists
                if (block.format === 'unordered') {
                    return block.children.map(item => 
                        '- ' + item.children.map(child => child.text).join('')
                    ).join('\n') + '\n\n'
                }
                // Ordered lists
                return block.children.map((item, index) => 
                    `${index + 1}. ` + item.children.map(child => child.text).join('')
                ).join('\n') + '\n\n'
            default:
                return ''
        }
    }).join('\n\n')
}