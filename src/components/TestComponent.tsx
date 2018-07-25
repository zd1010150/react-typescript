import * as React from 'react';

export interface ItestComponentProps {
    name: string,
    framework: string,
}
export class TestComponent extends React.Component <ItestComponentProps, {}>{
    public render() {
        const {name, framework} = this.props;
        return <h1>{name}, {framework}</h1>
    }
}