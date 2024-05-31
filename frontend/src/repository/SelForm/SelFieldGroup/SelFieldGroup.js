import InputFieldSet from '../../InputFieldSet/InputFieldSet';

export default function SelFieldGroup(props) {
    const fieldList = props.fields
        .filter(field => (!props.fieldGroup || field.fieldGroup === props.fieldGroup))
        .filter(field => (!props.fieldNames || props.fieldNames.includes(field.name)))
        .map(field => (
            <InputFieldSet
                loginData={props.loginData}
                language={props.language}
                reference={field.reference}
                className={field.className}
                key={`${props.groupName}-${field.name}`}
                name={field.name}
                labelText={field.labelText}
                explanationText={field.explanationText}
                type={field.type || 'text'}
                link={field.link}
                linkText={field.linkText}
                optionList={field.optionList}
                errors={props.fpStates.errors}
                fieldValues={props.fpStates.fieldValues}
                readOnly={field.readOnly}
                handleInputBlur={props.handleInputBlur}
                handleInputChange={props.handleInputChange}
            />))

    return (
        <>
            {fieldList}
        </>
    )
}
