import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App/';
import styled from 'styled-components';

const AppWrapper = styled.section`
    font-family: "Roboto";
`;

ReactDOM.render(
    <AppWrapper>
        <App />
    </AppWrapper>,
    document.getElementById('app')
);
