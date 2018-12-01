import React from 'react'
import { render } from 'react-dom'
import TagEditor from '../dist/TagEditor.js'

render(<TagEditor tags={['hello', 'world']} delimiters={[',']} placeholder="Input tags, split by comma" />, document.querySelector('#app'))
