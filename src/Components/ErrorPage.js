import Lottie, {LottieRefCurrentProps} from 'lottie-react';
import animationData from './lotties/mr-detective.json';
import {useRef} from 'react';

const ErrorPage = () => {
    const detectiveRef= useRef()
    return (
        <div className="error" >
            <h3 className="error-text">Ooops! You're not supposed to be here, move along...</h3>
            <div className="error-logo">
                <Lottie onComplete={() =>{detectiveRef.current?.goToAndPlay(45,true)}} lottieRef={detectiveRef}
                loop={false} animationData={animationData} size={1}/>
                </div>
        </div>
    );
}
 
export default ErrorPage;