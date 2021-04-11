import "./index.css";
import "./global-styles.css";
import {GDPRConsentComponent} from "./components/gdpr-consent/gdpr";


document.addEventListener("readystatechange", onReadyStateChange);
function onReadyStateChange(event){
    if(event.target.readyState === "complete"){
        onPageLoaded();
    }
}

function onPageLoaded(){
    new GDPRConsentComponent().showGDPRConsent();
}





    
