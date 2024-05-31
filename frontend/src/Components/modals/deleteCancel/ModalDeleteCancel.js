import SimpleModal from '../simpleModal/SimpleModal';
import { languageElements } from './ModalDeleteCancel-languageElements';
import LanguageElementsHandler from '../../../repository/LanguageElementsHandler';

export default function ModalDeleteCancel(props) {
    const languageElementsHandler = new LanguageElementsHandler(
        languageElements,
        props.language
    );

    return (
        <SimpleModal
            show={props.show}
            language={props.language}
            title={props.title || languageElementsHandler.get(`title`)}
            body={props.body || languageElementsHandler.get(`body`)}
            buttons={[
                {
                    text: languageElementsHandler.get(`button-CANCEL`),
                    variant: "secondary",
                },
                {
                    id: "DELETE",
                    text: languageElementsHandler.get(`button-DELETE`),
                    variant: "danger",
                }
            ]}
            params={{
                id: props.id,
            }}
            callback={(buttonId, params) => { props.callback(buttonId, params) }}
        />

    )
}
