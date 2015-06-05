# React-TagEditor

A tag editor coded in ES6, with React.js as its dependency. Inspired by StackOverflow's tag editor.

**Features**

* Basic editing/removing
* Navigating through tags via `left/right` on keyboard
* Tag can be modified after being created
* Tag can be split at the cursor point.

## Demo

![](http://daix.me/react-tageditor/record.gif)

* [basic](http://NdYAG.github.io/react-tageditor/)
* [validation and error handler](http://NdYAG.github.io/react-tageditor/validation.html)

## Install

bower:

```sh
bower install react-tageditor --save
```

```html
<link rel="stylesheet" href="./bower_components/react-tageditor/dist/style/default.css">

<script src="./bower_components/react/react.js"></script>
<script src="./bower_components/react-tageditor/dist/index.js"></script>
```

npm:

```sh
npm install react-tageditor --save
```

## API

### Attributes

```html
<TagEditor tags={[]} delimiters={[]} placeholder="" />
```

All attributes are optional.

* `tags`: An array of tags.
* `delimiters`: An array of delimiters for splitting tags. Element in array could be string or number(keyCode).
* `placeholder`
* `validation(currentTag, allTags)`: A function for validating. Throw an error when tag/tags do not meet your requirement. Error will be passed to `onError`.
* `onChange(tagsChanged, allTags, action)`: Callback triggered after tags added or removed.`action` will be `add` or `remove`.
* `onError(error)`: Callback triggered on error. Access more information about the error via `error.name` & `error.message`.

### Methods

* `add(tagText)`
* `remove(tagText)`
* `output()`: returns an array of tag text

## Styling

```scss
$tagColor: #aaa !default;
$tagColorActive: #555 !default;
$tagBgColor: #ebebeb !default;
$tagFontSize: 1rem !default;

$editorBorder: #ccc !default;
$editorBorderActive: #808080 !default;

$placeholderColor: #777 !default;

$pink: #f2c9c9 !default;
$crimson: #5c0909 !default;
```

## Development

1. `gem install sass`

2. `npm install` <br/>This will install `react`, `webpack`, `babel-loader` and other dependencies.

3. `bower install` <br/>This will install `react`, `neutron` for building examples.

4. `npm run build` <br/>Compile our `js/scss` files to `dist/`

## License

MIT.
