var utils = {
    uuid() {
        var i, random
        var uuid = ''
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-'
            }
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
            .toString(16)
        }
        return uuid
    },
    getCharcode(e) {
        var charCode = e.charCode
        return (typeof charCode === "number" && charCode !== 0 )? charCode: e.keyCode
    },
    setCaretPos(input_node, pos) {
        if (input_node.setSelectionRange) {
            input_node.setSelectionRange(pos, pos)
        } else if (input_node.createTextRange) {
            input_node.createTextRange().move('character', pos)
        }
        input_node.focus()
    },
    getCaretPos(input_node) {
        return 'selectionStart' in input_node? input_node.selectionStart: Math.abs(document.selection.createRange().moveStart('character', -input_node.value.length))
    },
    autoSize(node) {
        var mirror = document.querySelector('.tag-editor-mirror')
        if (!mirror) {
            mirror = document.createElement('div')
            mirror.setAttribute('class', 'tag-editor-mirror')
            document.body.appendChild(mirror)
        }
        mirror.textContent = node.value
        node.style.width = getComputedStyle(mirror).width
    },
    error(name, message) {
        var error = new Error(message)
        error.name = name
        return error
    }
}
export default utils
