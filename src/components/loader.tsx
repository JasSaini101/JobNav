/* This is a simple loader component that displays a spinning animation when the page is loading. 
Wheter the page is loading or not is handled in another file*/

import { TailSpin } from "react-loader-spinner";

const LoaderComp = () => {
    return (
        <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    );
};  
export default LoaderComp;