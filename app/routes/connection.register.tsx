import { ActionFunctionArgs } from "@remix-run/node";
import { Link, redirect } from "@remix-run/react"
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import invariant from "tiny-invariant";
import CustomForm from "~/components/CustomForm"
import UsersService from "~/services/users.service";
import WebsocketService from "~/services/websocket.service";
import convertSymbolicObject from "~/utils/convertSymbolicObject";




  // ACTION ==========================
  export const action = async ({
    request,
  }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const response = await UsersService.createOne(formData)
    if(response.insertedId){
      const wsService = WebsocketService.getInstance()
      console.log("---------------1--------------")
      wsService.sendEvent("users",`Bienvenue au nouveau membre de la communauté`)
      console.log("--------------2---------------")
      return redirect(`/connection`);
    }
    return response
 
  };
  // END OF ACTION ==========================


export default function ConnectionRegister () {

  const formData = {
      id: "register-form",
      action: "/connection/register",
      fields: [
        {
          id: "firstname",
          placeholder: "Entrer votre prénom"
        },
        {
          id: "lastname",
          placeholder: "Entrer votre nom de famille"
        },
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
    <main className="app-main register__main">
      <section className="register__form-section">
        <CustomForm id={formData.id} fields={formData.fields} buttons={formData.buttons} action={formData.action} />
        <small>Déjà inscrit(e) - Cliquez <Link to={"/connection"}>ici</Link></small>
      </section>
    </main> 
  )
}