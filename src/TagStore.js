import utils from "./utils"
import { ERROR, ERROR_MSG } from "./const"

class TagStore {
    constructor(options) {
        this.tags = []
        this.options = options || {
            validate: function() {}
        }
        this._listeners = []
    }
    subscribe(fn) {
        this._listeners.push(fn)
    }
    broadcast() {
        this._listeners.forEach(fn => {
            fn()
        })
    }
    add(text, cb) {
        var newTag = {
            id: utils.uuid(),
            text: text
        }
        this.tags.push(newTag)
        cb && cb({}, newTag, this.tags.length - 1)
        this.broadcast()
    }
    index(text) {
        var tagIndex = -1
        for(var i = 0, l = this.tags.length; i < l; i++) {
            if (text === this.tags[i].text) {
                tagIndex = i
                break
            }
        }
        return tagIndex
    }
    insertAfterTag(tag, text, cb) {
        var tagIndex
          , newTag
        this.tags.forEach((t, i) => {
            if (t.id === tag.id) {
                tagIndex = i
            }
        })
        if (tagIndex === void 0) {
            return
        }
        newTag = {
            id: utils.uuid(),
            text: text
        }
        this.tags.splice(tagIndex + 1, 0, newTag)
        cb && cb(null, newTag, tagIndex + 1)
    }
    validate(tagToSave, text) {
        // tags should
        // * be unique
        // * length > 0
        if (!text.length) {
            throw utils.error(ERROR.EMPTY, ERROR_MSG[ERROR.EMPTY])
        }
        for(var i = 0, l = this.tags.length; i < l; i++) {
            var tag = this.tags[i]
            if (tag === tagToSave) { continue }
            if (tag.text.trim() === text.trim()) {
                throw utils.error(ERROR.REPEAT, ERROR_MSG[ERROR.REPEAT])
            }
        }
        this.options.validate(text, this.output())
    }
    save(tagToSave, text, cb) {
        try {
            this.validate(tagToSave, text)

            this.tags.forEach(tag => {
                if (tag === tagToSave) {
                    tag.text = text
                }
            })
            cb && cb()
            this.broadcast()
        } catch(exception) {
            cb(exception)
        }
    }
    remove(tag) {
        var text = (typeof tag === "string")? tag: tag.text
        this.tags = this.tags.filter(candidate => {
            return candidate.text !== text
        })
        this.broadcast()
    }
    output() {
        return this.tags.map(function(tag) {
            return tag.text
        })
    }
}

export default TagStore
