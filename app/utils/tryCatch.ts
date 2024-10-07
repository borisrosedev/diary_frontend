export default async (cb: Function, message?:string) => {
    try {
        return await cb()
    } catch(err) {
        console.log("⛔️ Erreur : " + message)
        console.error(err)
        return err
    }
}