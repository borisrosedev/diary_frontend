import Button from "./CustomButton"
import FormField from "./FormField"
import CustomButton from "./CustomButton"
import ClientSideFormField from "./ClientSideFormField"

interface ClientSideCustomFormProps {
    id:string
    fields: any
    buttons: any
}

interface ClientSideFormHandler {
    submitHandler: (e: any) => void
    resetHandler:(e:any) => void
    inputHandler:(e:any, name:string) => void
}

export default ({id, fields, buttons, submitHandler, inputHandler, resetHandler}: ClientSideCustomFormProps & ClientSideFormHandler) => {
    return(
        <form id={id} className="custom-form" onSubmit={submitHandler} onReset={resetHandler}>
            <section className="form__fields-section">
                {fields.map((field:any, key: number) => ClientSideFormField({...field, key, inputHandler}))}
            </section>
            <section className="form__buttons-section">
                {buttons.map((btn: any, key: number) => CustomButton({...btn, key}))}
            </section>
        </form>
    )
}

