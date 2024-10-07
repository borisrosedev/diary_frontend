import { io } from "socket.io-client";

class NotificationService {
    static instance : NotificationService | null
    socket
    notificationAside:HTMLElement
    timeoutId: any =  null 

    constructor(){
        this.notificationAside = document.getElementById("notification-aside") as HTMLElement
        this.socket = io("http://localhost:3002") as any
        this.socket.on("users", (val: any) => {
            console.log('[EVENT BROKER][USERS] receiving the message:', val)
            this.displayShortLivedNotification(val)
        })

        this.socket.on("notes", (val: any) => {
            console.log('[EVENT BROKER][notes] receiving the message:', val)
            this.displayShortLivedNotification(val)
        })
    }

    static getInstance(){
        if(NotificationService.instance == null){
            NotificationService.instance = new NotificationService()
        } 
        return NotificationService.instance
        
    }

    displayShortLivedNotification(val: any, type: string = "positive", timeout: number = 5000){
        
        if(this.timeoutId){
            clearTimeout(this.timeoutId)
        }
        this.notificationAside.innerHTML = `<p class=${type}>${val}</p>`
        
        this.timeoutId = setTimeout(() => {
            this.notificationAside.innerHTML = ""  
        }, timeout)
        
    }


    


}

export default NotificationService