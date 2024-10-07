import { ActionFunctionArgs } from "@remix-run/node";
import { Link, redirect } from "@remix-run/react"
import CustomForm from "~/components/CustomForm"
import AuthService from "~/services/auth.service";
import UsersService from "~/services/users.service";


// ACTION ==========================
export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const response = await AuthService.login(formData as any)
  if(response.id){
    return redirect(`/dashboard/${response.id}`);
  }
  return response

};
// END OF ACTION ==========================




export default function ConnectionLogin () {

  const formData = {
      id: "login-form",
      action : "/conection",
      fields: [
        {
          id: "email",
          placeholder: "Entrer votre email"
        },
        {
          id: "password",
          placeholder: "Entrez votre mot de passe"
        }
      ],
      buttons: [
        {
          type: "submit",
          styles: "button form-button",
          textContent: "Valider"
        },
        {
          type: "reset",
          styles: "button form-button",
          textContent: "Réinitialiser"
        }
      ]
  }



  return (
    <main className="app-main login__main">
      <section className="login__form-section">
        <CustomForm id={formData.id} fields={formData.fields} buttons={formData.buttons} action={formData.action} />
        <small>Pas encore inscrit(e) - Cliquez <Link to={"/connection/register"}>ici</Link></small>
      </section>
    </main> 
  )
}