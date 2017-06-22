/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["TagEditor"] = __webpack_require__(1);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _const = __webpack_require__(2);

	var _react = __webpack_require__(4);

	var _connectToStore = __webpack_require__(5);

	var _Tag = __webpack_require__(11);

	var _Tag2 = _interopRequireDefault(_Tag);

	var TagEditor = (function (_Component) {
	    _inherits(TagEditor, _Component);

	    function TagEditor(props) {
	        _classCallCheck(this, TagEditor);

	        _get(Object.getPrototypeOf(TagEditor.prototype), "constructor", this).call(this, props);
	        this.state = {
	            editing: null,
	            caret: null,
	            repeat: null
	        };
	    }

	    _createClass(TagEditor, [{
	        key: "handleClick",
	        value: function handleClick() {
	            this.props.store.add('', (function (err, newTag, indexOfNewTag) {
	                this.setState({
	                    editing: indexOfNewTag,
	                    caret: 0
	                });
	            }).bind(this));
	        }
	    }, {
	        key: "handleTagSave",
	        value: function handleTagSave(tag, text) {
	            this.props.store.save(tag, text, (function (err) {
	                var _this = this;

	                if (!err) {
	                    this.props.onChange && this.props.onChange(text, this.props.store.output(), 'add');
	                    return;
	                }
	                switch (err.name) {
	                    case _const.ERROR.EMPTY:
	                        break;
	                    case _const.ERROR.REPEAT:
	                        var tagIndex;
	                        this.props.store.tags.forEach(function (t, i) {
	                            if (t.text === text) {
	                                tagIndex = i;
	                            }
	                        });
	                        this.setState({
	                            repeat: tagIndex
	                        });
	                        setTimeout(function () {
	                            _this.setState({ repeat: null });
	                        }, 1500);
	                        break;
	                    default:
	                        break;
	                }
	                this.props.onError && this.props.onError(err);
	                this.handleTagRemove(tag);
	            }).bind(this));
	            this.setState({
	                editing: null,
	                caret: null
	            });
	        }
	    }, {
	        key: "handleTagFocus",
	        value: function handleTagFocus(tag) {
	            var tagIndex;
	            this.props.store.tags.forEach(function (t, i) {
	                if (tag.id === t.id) {
	                    tagIndex = i;
	                }
	            });
	            if (tagIndex === void 0) {
	                return;
	            }
	            this.setState({
	                editing: tagIndex
	            });
	        }
	    }, {
	        key: "handleTagBlur",
	        value: function handleTagBlur(tag, caretOnBlur, lastKeyOnBlur) {
	            var tags = this.props.store.tags,
	                tagIndex;

	            if (!tags.length) {
	                this.handleClick();
	                return;
	            }
	            tags.forEach(function (t, i) {
	                if (t.id === tag.id) {
	                    tagIndex = i;
	                }
	            });
	            if (caretOnBlur === 0) {
	                if (tagIndex > 0) {
	                    this.setState({
	                        editing: tagIndex - 1,
	                        caret: tags[tagIndex - 1].text.length
	                    });
	                } else if (tagIndex === 0) {
	                    this.setState({
	                        editing: 0,
	                        caret: 0
	                    });
	                } else {
	                    // tagIndex === void 0
	                    // this case happens when
	                    // press left/right/backspace key on empty tag
	                    var newState = {};
	                    if (lastKeyOnBlur === _const.KEYS.LEFT) {
	                        if (this.state.editing - 1 < 0) {
	                            return;
	                        }
	                        newState.editing = this.state.editing - 1;
	                        newState.caret = tags[newState.editing].text.length;
	                    }
	                    if (lastKeyOnBlur === _const.KEYS.RIGHT) {
	                        newState.editing = this.state.editing;
	                        newState.caret = 0;
	                    }
	                    this.setState(newState);
	                }
	            }
	            if (caretOnBlur > 0) {
	                if (tagIndex < tags.length - 1) {
	                    this.setState({
	                        editing: tagIndex + 1,
	                        caret: 0
	                    });
	                } else if (tagIndex === tags.length - 1) {
	                    this.setState({
	                        editing: tags.length - 1,
	                        caret: tags[tags.length - 1].text.length
	                    });
	                }
	            }
	        }
	    }, {
	        key: "handleTagRemove",
	        value: function handleTagRemove(tag) {
	            var tagText = tag.text;
	            this.props.store.remove(tag);
	            tagText.length && this.props.onChange && this.props.onChange(tagText, this.props.store.output(), 'remove');
	        }
	    }, {
	        key: "handleTagSplit",
	        value: function handleTagSplit(tag, textBeforeCaret, textAfterCaret) {
	            this.props.store.insertAfterTag(tag, textAfterCaret, (function (err, newTag, indexOfNewTag) {
	                this.setState({
	                    editing: indexOfNewTag,
	                    caret: 0
	                });
	            }).bind(this));
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this2 = this;

	            var store = this.props.store;
	            if (!store) {
	                return React.createElement("div", null);
	            }

	            var tags = this.props.store.tags;
	            var tagNodes = tags.map(function (tag, i) {
	                return React.createElement(
	                    _Tag2["default"],
	                    {
	                        active: _this2.state.editing === i ? true : false,
	                        error: _this2.state.repeat === i ? true : false,
	                        caret: _this2.state.editing === i ? _this2.state.caret : null,
	                        onSave: _this2.handleTagSave.bind(_this2, tag),
	                        onFocus: _this2.handleTagFocus.bind(_this2, tag),
	                        onBlur: _this2.handleTagBlur.bind(_this2, tag),
	                        onRemove: _this2.handleTagRemove.bind(_this2, tag),
	                        onSplit: _this2.handleTagSplit.bind(_this2, tag),
	                        delimiterKeys: _this2.props.delimiters.filter(function (d) {
	                            return typeof d === 'number';
	                        }),
	                        delimiterChars: _this2.props.delimiters.filter(function (d) {
	                            return typeof d === 'string';
	                        }),
	                        key: tag.id },
	                    tag.text
	                );
	            });
	            if (!tags.length) {
	                tagNodes = React.createElement(
	                    "div",
	                    { className: "tag-editor-placeholder" },
	                    this.props.placeholder
	                );
	            }
	            return React.createElement(
	                "div",
	                { className: "tag-editor" + (typeof this.state.editing === 'number' ? " is-active" : ""), onClick: this.handleClick.bind(this), ref: "editor" },
	                tagNodes
	            );
	        }
	    }]);

	    return TagEditor;
	})(_react.Component);

	exports["default"] = (0, _connectToStore.connectToStore)(TagEditor);
	module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["TagEditor"] = __webpack_require__(3);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var ERROR = {
	    EMPTY: 'TagEmptyError',
	    REPEAT: 'TagRepeatError'
	};
	exports.ERROR = ERROR;
	var ERROR_MSG = {
	    'TagEmptyError': 'Tag should not be empty',
	    'TagRepeatError': 'Tag should be unique'
	};
	exports.ERROR_MSG = ERROR_MSG;
	var KEYS = {
	    BACKSPACE: 8,
	    LEFT: 37,
	    RIGHT: 39
	};
	exports.KEYS = KEYS;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = React;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["TagEditor"] = __webpack_require__(6);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(4);

	var _TagStore = __webpack_require__(7);

	var _TagStore2 = _interopRequireDefault(_TagStore);

	var connectToStore = function connectToStore(TagEditor) {
	    return (function (_Component) {
	        _inherits(_class, _Component);

	        function _class() {
	            _classCallCheck(this, _class);

	            _get(Object.getPrototypeOf(_class.prototype), "constructor", this).call(this);
	            this.state = { store: null };
	        }

	        _createClass(_class, [{
	            key: "componentDidMount",
	            value: function componentDidMount() {
	                var _this = this;

	                var store = new _TagStore2["default"]({
	                    validate: this.props.validate || function () {}
	                });
	                this.props.tags.forEach(function (tag) {
	                    store.add(tag);
	                });
	                this.setState({
	                    store: store
	                });
	                store.subscribe(function () {
	                    _this.setState({
	                        store: store
	                    });
	                });
	            }
	        }, {
	            key: "add",
	            value: function add(text) {
	                var store = this.state.store,
	                    tagIndex = store.index(text);
	                if (tagIndex > -1) {
	                    store.save(store.tags[tagIndex], text);
	                } else {
	                    store.add(text);
	                }
	            }
	        }, {
	            key: "remove",
	            value: function remove(text) {
	                this.state.store.remove(text);
	            }
	        }, {
	            key: "output",
	            value: function output() {
	                return this.state.store.output();
	            }
	        }, {
	            key: "render",
	            value: function render() {
	                return React.createElement(TagEditor, _extends({}, this.props, { store: this.state.store }));
	            }
	        }]);

	        return _class;
	    })(_react.Component);
	};
	exports.connectToStore = connectToStore;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["TagEditor"] = __webpack_require__(8);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	var _const = __webpack_require__(2);

	var TagStore = (function () {
	    function TagStore(options) {
	        _classCallCheck(this, TagStore);

	        this.tags = [];
	        this.options = options || {
	            validate: function validate() {}
	        };
	        this._listeners = [];
	    }

	    _createClass(TagStore, [{
	        key: "subscribe",
	        value: function subscribe(fn) {
	            this._listeners.push(fn);
	        }
	    }, {
	        key: "broadcast",
	        value: function broadcast() {
	            this._listeners.forEach(function (fn) {
	                fn();
	            });
	        }
	    }, {
	        key: "add",
	        value: function add(text, cb) {
	            var newTag = {
	                id: _utils2["default"].uuid(),
	                text: text
	            };
	            this.tags.push(newTag);
	            cb && cb({}, newTag, this.tags.length - 1);
	            this.broadcast();
	        }
	    }, {
	        key: "index",
	        value: function index(text) {
	            var tagIndex = -1;
	            for (var i = 0, l = this.tags.length; i < l; i++) {
	                if (text === this.tags[i].text) {
	                    tagIndex = i;
	                    break;
	                }
	            }
	            return tagIndex;
	        }
	    }, {
	        key: "insertAfterTag",
	        value: function insertAfterTag(tag, text, cb) {
	            var tagIndex, newTag;
	            this.tags.forEach(function (t, i) {
	                if (t.id === tag.id) {
	                    tagIndex = i;
	                }
	            });
	            if (tagIndex === void 0) {
	                return;
	            }
	            newTag = {
	                id: _utils2["default"].uuid(),
	                text: text
	            };
	            this.tags.splice(tagIndex + 1, 0, newTag);
	            cb && cb(null, newTag, tagIndex + 1);
	        }
	    }, {
	        key: "validate",
	        value: function validate(tagToSave, text) {
	            // tags should
	            // * be unique
	            // * length > 0
	            if (!text.length) {
	                throw _utils2["default"].error(_const.ERROR.EMPTY, _const.ERROR_MSG[_const.ERROR.EMPTY]);
	            }
	            for (var i = 0, l = this.tags.length; i < l; i++) {
	                var tag = this.tags[i];
	                if (tag === tagToSave) {
	                    continue;
	                }
	                if (tag.text.trim() === text.trim()) {
	                    throw _utils2["default"].error(_const.ERROR.REPEAT, _const.ERROR_MSG[_const.ERROR.REPEAT]);
	                }
	            }
	            this.options.validate(text, this.output());
	        }
	    }, {
	        key: "save",
	        value: function save(tagToSave, text, cb) {
	            try {
	                this.validate(tagToSave, text);

	                this.tags.forEach(function (tag) {
	                    if (tag === tagToSave) {
	                        tag.text = text;
	                    }
	                });
	                cb && cb();
	                this.broadcast();
	            } catch (exception) {
	                cb(exception);
	            }
	        }
	    }, {
	        key: "remove",
	        value: function remove(tag) {
	            var text = typeof tag === "string" ? tag : tag.text;
	            this.tags = this.tags.filter(function (candidate) {
	                return candidate.text !== text;
	            });
	            this.broadcast();
	        }
	    }, {
	        key: "output",
	        value: function output() {
	            return this.tags.map(function (tag) {
	                return tag.text;
	            });
	        }
	    }]);

	    return TagStore;
	})();

	exports["default"] = TagStore;
	module.exports = exports["default"];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["TagEditor"] = __webpack_require__(10);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var utils = {
	    uuid: function uuid() {
	        var i, random;
	        var uuid = '';
	        for (i = 0; i < 32; i++) {
	            random = Math.random() * 16 | 0;
	            if (i === 8 || i === 12 || i === 16 || i === 20) {
	                uuid += '-';
	            }
	            uuid += (i === 12 ? 4 : i === 16 ? random & 3 | 8 : random).toString(16);
	        }
	        return uuid;
	    },
	    getCharcode: function getCharcode(e) {
	        var charCode = e.charCode;
	        return typeof charCode === "number" && charCode !== 0 ? charCode : e.keyCode;
	    },
	    setCaretPos: function setCaretPos(input_node, pos) {
	        if (input_node.setSelectionRange) {
	            input_node.setSelectionRange(pos, pos);
	        } else if (input_node.createTextRange) {
	            input_node.createTextRange().move('character', pos);
	        }
	        input_node.focus();
	    },
	    getCaretPos: function getCaretPos(input_node) {
	        return 'selectionStart' in input_node ? input_node.selectionStart : Math.abs(document.selection.createRange().moveStart('character', -input_node.value.length));
	    },
	    autoSize: function autoSize(node) {
	        var mirror = document.querySelector('.tag-editor-mirror');
	        if (!mirror) {
	            mirror = document.createElement('div');
	            mirror.setAttribute('class', 'tag-editor-mirror');
	            document.body.appendChild(mirror);
	        }
	        mirror.textContent = node.value;
	        node.style.width = getComputedStyle(mirror).width;
	    },
	    error: function error(name, message) {
	        var error = new Error(message);
	        error.name = name;
	        return error;
	    }
	};
	exports['default'] = utils;
	module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["TagEditor"] = __webpack_require__(12);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _const = __webpack_require__(2);

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	var Tag = (function (_Component) {
	    _inherits(Tag, _Component);

	    function Tag(props) {
	        _classCallCheck(this, Tag);

	        _get(Object.getPrototypeOf(Tag.prototype), "constructor", this).call(this, props);
	    }

	    _createClass(Tag, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var node = this.refs.input.getDOMNode();
	            if (this.props.active) {
	                node.focus();
	            } else {
	                node.blur();
	            }
	            _utils2["default"].autoSize(node);
	        }
	    }, {
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(nextProps) {
	            var node = this.refs.input.getDOMNode(),
	                tagNode = _react2["default"].findDOMNode(this),
	                activityChanged = this.props.active !== nextProps.active;

	            if (nextProps.active) {
	                _utils2["default"].setCaretPos(node, nextProps.caret);
	            } else {
	                node.blur();
	            }
	        }
	    }, {
	        key: "handleClick",
	        value: function handleClick(e) {
	            e.stopPropagation();
	            if (e.target.tagName === 'A') {
	                // click on X to remove
	                this.props.onRemove();
	            }
	        }
	    }, {
	        key: "handleFocus",
	        value: function handleFocus() {
	            this.props.onFocus();
	        }
	    }, {
	        key: "handleBlur",
	        value: function handleBlur() {
	            var node = this.refs.input.getDOMNode();
	            this.props.onSave(node.value);
	        }
	    }, {
	        key: "handleKeyDown",
	        value: function handleKeyDown(e) {
	            var charCode = _utils2["default"].getCharcode(e);
	            for (var key in _const.KEYS) {
	                if (_const.KEYS[key] === charCode) {
	                    keyHandlers[key].call(this, {
	                        originalEvent: e,
	                        caret: _utils2["default"].getCaretPos(this.refs.input.getDOMNode()),
	                        node: this.refs.input.getDOMNode()
	                    });
	                }
	            }
	            if (this.props.delimiterKeys.indexOf(charCode) > -1) {
	                e.preventDefault();
	                var node = this.refs.input.getDOMNode();
	                this.split(node, _utils2["default"].getCaretPos(node));
	            }
	        }
	    }, {
	        key: "handleChange",
	        value: function handleChange(e) {
	            var _this = this;

	            var tagText = e.target.value,
	                node = this.refs.input.getDOMNode(),
	                caretPos = _utils2["default"].getCaretPos(node),
	                lastInput = tagText.charAt(caretPos - 1);
	            this.props.delimiterChars.forEach(function (delimiter) {
	                if (lastInput === delimiter) {
	                    _this.split(node, caretPos - 1, caretPos);
	                }
	            });
	            _utils2["default"].autoSize(node);
	        }
	    }, {
	        key: "split",
	        value: function split(node) {
	            var positions = Array.prototype.slice.call(arguments, 1),
	                tagText = node.value,
	                textBeforeCaret = tagText.substring(0, positions[0]),
	                textAfterCaret = tagText.substring(positions[1] || positions[0], tagText.length);
	            node.value = textBeforeCaret;
	            node.blur();
	            this.props.onSplit(textBeforeCaret, textAfterCaret);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return _react2["default"].createElement(
	                "div",
	                { className: "tag" + (this.props.error ? " has-error" : ""), onClick: this.handleClick.bind(this) },
	                _react2["default"].createElement("input", {
	                    type: "text",
	                    defaultValue: this.props.children.toString(),
	                    ref: "input",
	                    onFocus: this.handleFocus.bind(this),
	                    onBlur: this.handleBlur.bind(this),
	                    onKeyDown: this.handleKeyDown.bind(this),
	                    onChange: this.handleChange.bind(this) }),
	                _react2["default"].createElement(
	                    "a",
	                    { className: "" },
	                    "×"
	                )
	            );
	        }
	    }]);

	    return Tag;
	})(_react.Component);

	var keyHandlers = {
	    LEFT: function LEFT(e) {
	        if (e.caret === 0) {
	            // seems that:
	            // if current node do not blur
	            // can not set next node to focus
	            e.node.blur();
	            e.originalEvent.preventDefault();
	            this.props.onBlur(e.caret, _const.KEYS.LEFT);
	        }
	    },
	    RIGHT: function RIGHT(e) {
	        if (e.caret === e.node.value.length) {
	            e.node.blur();
	            e.originalEvent.preventDefault();
	            this.props.onBlur(e.caret, _const.KEYS.RIGHT);
	        }
	    },
	    BACKSPACE: function BACKSPACE(e) {
	        if (e.caret === 0) {
	            var node = e.node;
	            if (node.selectionStart !== node.selectionEnd) {
	                return;
	            }
	            e.node.blur();
	            e.originalEvent.preventDefault();
	            this.props.onBlur(e.caret, _const.KEYS.LEFT);
	        }
	    }
	};

	exports["default"] = Tag;
	module.exports = exports["default"];

/***/ })
/******/ ]);