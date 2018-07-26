import * as React from 'react';
import enLogo from 'src/assets/images/en-logo.png';
import zhLogo from 'src/assets/images/zh-logo.png';

interface Ilogo {
    language: LANGUAGE
}

export class Logo extends React.Component<Ilogo, {}> {
    public render() {
        const language = this.props.language;
        return <div><img src = { language === LANGUAGE.ZH ? zhLogo : enLogo} alt = ""/></div>
    }
}