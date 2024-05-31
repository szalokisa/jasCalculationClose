import { validators } from './validators/validators';
import { dateAndTime } from '../InputFieldSet/dateTimePicker/dateAndTime';

export default class SelFP {
    constructor(props) {
        this.fields = props.fields;
        this.setLanguage(props.language);
    }

    initStates() {
        return {
            formWasValidated: false,
            fieldValues: this.getDefaultValues(),
            errors: this.getEmptyFieldNames(),
        }
    }

    setLanguage(language) {
        this.language = language;
    }

    getField(fieldName) {
        return this.fields.find(field => (field.name === fieldName));
    }

    getEmptyFieldNames() {
        const result = {};

        this.fields.forEach(field => {
            result[field.name] = '';
        });

        return result;
    }

    getDefaultValues() {
        const defaultValues = {};
        this.fields.forEach(field => {
            if ('initialValue' in field) {
                defaultValues[field.name] = field.initialValue;
            }
        })
        return defaultValues;
    }

    stringifyValues(fpStates) {
        const dataNotNull = this.removeNulls(fpStates.fieldValues);
        const dateFields = Object.keys(dataNotNull).filter(fieldName => (this.getField(fieldName)?.type === 'date'));
        const dateValues = Object.fromEntries(dateFields.map(fieldName => {
            const dateDbFormat = dateAndTime.getDateDbFormat(dataNotNull[fieldName]);
            return [fieldName, dateDbFormat];
        }));

        const _sysInfo = JSON.stringify(this.getSysInfo(dataNotNull));
        const data = {
            ...dataNotNull,
            ...dateValues,
            _sysInfo,
        };

        return data;
    }

    getSysInfo(data) {
        const dateTimeFields = this.fields.filter(field => (field.type === 'dateTime'));
        const dateTimeFieldsNotNull = dateTimeFields.filter(field => (data[field.name]));
        const sysInfoArray = dateTimeFieldsNotNull.map(field => ([
            field.name,
            {
                timeZone: data[field.name].substring(19),
            }
        ]));

        return Object.fromEntries(sysInfoArray);
    }

    setValues(fpStates, setFpStates, data) {
        if (data._sysInfo) {
            data._sysInfo = JSON.parse(data._sysInfo);
        }

        setFpStates(previousState => {
            const newState = {
                ...previousState,
                fieldValues: { ...this.getDefaultValues(), ...this.getDataInternalFormat(data) },
                errors: this.getEmptyFieldNames()
            }
            return newState
        })
    }

    getDataInternalFormat(data) {
        const dateTimeFields = Object.keys(data).filter(fieldName => (this.getField(fieldName)?.type === 'dateTime'));
        const dateFields = Object.keys(data).filter(fieldName => (this.getField(fieldName)?.type === 'date'));

        return {
            ...data,
            //converting date values...
            ...Object.fromEntries(dateFields.map(fieldName => {
                const dateInternalFormat = dateAndTime.getDateInternalFormat(data[fieldName]);
                return [fieldName, dateInternalFormat]
            }
            )),
            //converting dateTime values...
            ...Object.fromEntries(dateTimeFields.map(fieldName => {
                const zone = data._sysInfo[fieldName]?.timeZone || '+00:00';
                const dateInternalFormat = dateAndTime.getDateTimeInternalFormat(data[fieldName], zone);
                return [fieldName, dateInternalFormat]
            }
            )),
        }
    }

    removeNulls(jsonData) {
        const result = {};
        Object.keys(jsonData).forEach(k => {
            if (jsonData[k] !== null && jsonData[k] !== undefined && jsonData[k] !== '') {
                result[k] = jsonData[k];
            }
        })

        return result;
    }

    clearAllCustomValidity() {
        this.fields.forEach(field => {
            field.reference?.current?.setCustomValidity('');
        });
    }

    clearAllErrors(fpStates, setFpStates) {
        setFpStates(previousStates => ({
            ...previousStates,
            errors: this.getEmptyFieldNames()
        }));

        this.clearAllCustomValidity();
    }

    clearAllFields(fpStates, setFpStates) {
        setFpStates(previousStates => {
            const emptyFieldValues = { ...this.getEmptyFieldNames(), ...this.getDefaultValues() }

            return {
                ...previousStates,
                fieldValues: emptyFieldValues,
                errors: this.getEmptyFieldNames(),
            }
        });

        this.clearAllErrors(fpStates, setFpStates);
    }

    setFieldError(fieldName, errorText, setFpStates) {
        const field = this.getField(fieldName)

        if (field) {
            setFpStates((previousStates) => ({
                ...previousStates,
                errors: { ...previousStates.errors, [fieldName]: errorText }
            }));
            field.reference?.current?.setCustomValidity(errorText);
        }
    }

    setFieldValue(fieldName, value, setFpStates) {
        setFpStates((previousStates) => {
            const newValues = previousStates.fieldValues;
            if (value === undefined || value === null) {
                delete newValues[fieldName];
            } else {
                newValues[fieldName] = value;
            }
            return {
                ...previousStates,
                fieldValues: { ...newValues, },
                errors: { ...previousStates.errors, [fieldName]: '' }
            }
        });
    }

    validateField(fieldName, fpStates, setFpStates) {
        const field = this.getField(fieldName)

        if (!field) {
            return true;
        }

        const value = fpStates.fieldValues[fieldName];

        this.setFieldError(fieldName, '', setFpStates);

        if (!Array.isArray(field.validators)) {
            return true;
        }

        const invalid = field.validators?.find(validator => (validators.validate(field, validator, value, this.language)))
        if (invalid) {
            this.setFieldError(fieldName, validators.getErrorText(invalid), setFpStates);
            return false;
        }

        return true;
    }

    handleInputBlur(e, fpStates, setFpStates) {
        const fieldName = e.target.name;

        this.setFieldError(fieldName, '', setFpStates);
        this.validateField(fieldName, fpStates, setFpStates);
    }

    handleInputChange(e, fpStates, setFpStates) {
        const value = e.target.value;
        const fieldName = e.target.name;
        this.setFieldValue(fieldName, value, setFpStates)
    }

    isGroupValid(fpStates, setFpStates) {
        let result = true;
        this.fields.forEach(field => {
            const isFieldValid = this.validateField(field.name, fpStates, setFpStates);
            if (!isFieldValid) {
                result = false;
            }
        })
        return result;
    }
}
