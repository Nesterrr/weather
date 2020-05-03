import * as React from 'react';

export interface Props { compiler: string; framework: string; }

export const Hello = (props: Props) => (
  <div>
    <h1>Hello Ksusha</h1>
  </div>
);
