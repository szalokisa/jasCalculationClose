import { useEffect } from 'react';
import '../../../App.scss';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { languageElements as alerts_languageElements } from '../alerts_languageElements';
import LanguageElementsHandler from '../../../repository/languageElementsHandler/LanguageElementsHandler';
import { getLanguageElementFromBaseIfNotExists } from '../../../repository/languageElementsHandler/usefulls';

export default function FiveSecondsAlert(props) {
    /*
    Usage:
        import FiveSecondsAlert from '../../components/alerts/fiveSecondsAlert/FiveSecondsAlert';
    
        (...)
        const [stateOfFiveSecondsAlert, setStateOfFiveSecondsAlert] = useState({
            show: false,
            message: {
                title: '',
                body: '',
            }
     });
    
        (...)
            <FiveSecondsAlert
                show={stateOfFiveSecondsAlert.show}
                language={props.language}
                message={stateOfFiveSecondsAlert.message}
                variant={stateOfFiveSecondsAlert.variant}
                interval={stateOfFiveSecondsAlert.interval}
                className={stateOfFiveSecondsAlert.className}
                callback={() => {setStateOfFiveSecondsAlert({show: false});}}
            />
    */

    const baseLanguageElementsHandler = new LanguageElementsHandler(alerts_languageElements, props.language);

    useEffect(() => {
        if (!props?.show) {
            return;
        }

        const interval = setInterval(() => {
            props.callback()
        }
            , props.interval || 5000);

        return () => clearInterval(interval);

    }, [props.show])

    if (!props.show) {
        return <></>
    }

    return (
        <Modal show={props.show} onHide={props.callback}>
            <Alert variant={props.variant || "info"} className={`mb-0 ${props.className}`}>
                {
                    (props?.message?.title) &&
                    <Alert.Heading>
                        {getLanguageElementFromBaseIfNotExists(props.message.title, baseLanguageElementsHandler)}
                    </Alert.Heading>
                }
                {
                    (props?.message?.body) &&
                    <p>{getLanguageElementFromBaseIfNotExists(props.message.body, baseLanguageElementsHandler)}</p>
                }
            </Alert>
        </Modal>
    );
}
