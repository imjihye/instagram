import 'bootstrap-css';
import './static/css/base.css';
import './static/css/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Content from './instagram';

ReactDOM.render(
	<Content />,
	document.getElementById('content')
);