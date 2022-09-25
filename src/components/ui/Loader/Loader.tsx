import React from 'react';
import {default as BaseLoader} from "@mdoffice/md-component/Loader";


interface LoaderProps {
    text?: string;
}

const Loader:React.FC<LoaderProps> = (text) => {
    return (
        //@ts-ignore
        <div dangerouslySetInnerHTML={{ __html: BaseLoader(text.length ? text: '') }} />
    );
};

export default Loader;