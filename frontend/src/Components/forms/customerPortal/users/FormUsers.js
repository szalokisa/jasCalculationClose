import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
//import { useParams, Redirect } from 'react-router-dom';
import { languageElements } from './FormUsers-languageElements';
import LanguageElementsHandler from '../../../../repository/LanguageElementsHandler';
import SelFP from '../../../../repository/SelForm/SelFP';
import SelFieldGroup from '../../../../repository/SelForm/SelFieldGroup/SelFieldGroup';
import SimpleModal from '../../../modals/simpleModal/SimpleModal';

export default function FormUsers(props) {
    const languageElementsHandler = new LanguageElementsHandler(
        languageElements,
        props.language
    );

    const fields = [{
        reference: useRef(),
        name: 'Name',
        labelText: languageElementsHandler.get(`field-Name`),
        type: 'text',
        initialValue: '',
        validators: ['required',]
    },
    {
        reference: useRef(),
        name: 'Email',
        type: 'textarea',
        labelText: languageElementsHandler.get(`field-Email`),
        type: 'text',
        initialValue: '',
        validators: ['required', 'validEmail',],
    },
    {
        reference: useRef(),
        name: 'Lang',
        labelText: languageElementsHandler.get(`field-Lang`),
        type: 'select',
        optionList: [
            {
                value: '', text: languageElementsHandler.get('pleaseSelect')
            },
            { value: 'en', text: 'en' },
            { value: 'de', text: 'de' },
            { value: 'hu', text: 'hu' },
        ],
        validators: ['required',]
    },
    ]

    const fp = new SelFP({
        language: props.language,
        languageElements,
        fields,
    });

    const [fpStates, setFpStates] = useState(fp.initStates());
    const [dataStatus, setDataStatus] = useState('');

    const [simpleModal, setSimpleModal] = useState(undefined);

    useEffect(() => {
        if (!props.id) {
            fp.clearAllFields(fpStates, setFpStates);
            fp.setFieldValue('WAT_Portal_Owners_Partner_ID', props.Portal_Owners_Partner_ID, setFpStates);
            fp.setFieldValue('UserLevels_Code', 'CUST_ROOT', setFpStates);
            return;
        }

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/customerportal/data`, {
            headers: {
                'x-token': props.loginData.getToken(),
                'x-collection': 'USERS',
                'x-filter': `id=${props.id}`,
            }
        }).then((result) => {
            fp.setValues(fpStates, setFpStates, result.data.data[0]);
        }).catch((error) => {
            console.error(error);
        });
    }, [props.id])

    function handleInputBlur(e) {
        fp.handleInputBlur(e, fpStates, setFpStates);
    }

    function handleInputChange(e) {
        fp.handleInputChange(e, fpStates, setFpStates);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await save(props.onSubmit);
    }

    async function save(callback) {
        if (!fp.isGroupValid(fpStates, setFpStates)) {
            return;
        }

        let savedData;
        axios.put(`${process.env.REACT_APP_API_BASE_URL}/customerportal/data`, {
            collection: 'USERS',
            data: fp.stringifyValues(fpStates),
        },
            {
                headers: {
                    'x-token': props.loginData.getToken(),
                    'x-collection': 'USERS',
                },
            }
        ).then((result) => {
            savedData = result.data.data[0];
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/customerportal/sendinvitation`, {
            },
                {
                    headers: {
                        'x-token': props.loginData.getToken(),
                        'x-userid': savedData.ID,
                    },
                })
        }).then(() => {
            callback(savedData);
            return;
        }).catch((err) => {
            switch (err.response?.data?.message || '') {
                case 'MESSAGE_USER_ALREADY_EXISTS':
                    setSimpleModal({
                        messageCode: 'MESSAGE_USER_ALREADY_EXISTS',
                    });
                default:
                    console.error(err);
                    break;
            }
        });
    }

    return (
        <div className="form-users">
            <SimpleModal
                show={simpleModal}
                title={languageElementsHandler.get(`${simpleModal?.messageCode || ''}-Title`)}
                body={languageElementsHandler.get(`${simpleModal?.messageCode || ''}-Body`)}
                buttons={[
                    {
                        id: "OK",
                        text: languageElementsHandler.get('btn-ok'),
                        variant: "primary",
                    }
                ]}
                callback={() => { setSimpleModal(undefined); }}
            />

            <form
                onSubmit={handleSubmit}
                noValidate={true}
                className={`needs-validation ${fpStates.formWasValidated ? 'was-validated' : ''
                    }`}
            >
                <SelFieldGroup
                    groupName='field-group'
                    language={props.language}
                    languageElements={languageElements}
                    fields={fields}
                    fpStates={fpStates}
                    handleInputBlur={handleInputBlur}
                    handleInputChange={handleInputChange}
                />

                <div className='btn-area'>
                    <button type='submit' className='btn btn-success'>
                        {languageElementsHandler.get(`btn-submit`)}
                    </button>
                    <button type='button' className='btn btn-secondary' onClick={props.onCancel}>
                        {languageElementsHandler.get(`btn-cancel`)}
                    </button>
                </div>
            </form>
        </div>
    )
}
