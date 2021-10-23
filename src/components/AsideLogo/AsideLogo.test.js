import React from 'react';
import ReactDOM from 'react-dom';
import AsideLogo from './AsideLogo';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AsideLogo />, div);
    ReactDOM.unmountComponentAtNode(div);
});
