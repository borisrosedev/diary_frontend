import { Form } from "@remix-run/react"
import Button from "./Button"
import FormField from "./FormField"

interface CustomFormProps {
    id:string
    fields: any
    buttons: any
    action: string
}


export default ({id, fields, buttons, action}: CustomFormProps) => {
    return(
        <Form id={id} className="custom-form" method="POST" action={action}>
            <section className="form__fields-section">
                {fields.map((field:any, key: number) => FormField({...field, key}))}
            </section>
            <section className="form__buttons-section">
                {buttons.map((btn: any, key: number) => Button({...btn, key}))}
            </section>
        </Form>
    )
}