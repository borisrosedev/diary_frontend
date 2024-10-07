interface FormFieldProps {
    id: string
    placeholder: string
    icon: string
    type: string
 
}

interface FormFieldMustHaveProps {
    key: number
}

interface ClientSideFormFieldProps {
    inputHandler: (e:any, name:string) => void
}

export default ({id, placeholder, type, key, inputHandler}: Partial<FormFieldProps> & FormFieldMustHaveProps & ClientSideFormFieldProps) => {
    return(
        <section key={key} className="form__field-section">
            <section className="form__input-label-section">
                <label htmlFor={id}></label>
                <input type={type ?? "text"} id={id} name={id} placeholder={placeholder} onInput={(e) => inputHandler(e, id!)}/>
            </section>
            <section id="input-error-section" className="form__input-error-section"></section>
        </section>
    )
}

