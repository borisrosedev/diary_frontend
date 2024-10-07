import { io } from "socket.io-client";

class WebsocketService {
    static instance: null | WebsocketService
    socket
    notificationAside:HTMLElement
    timeoutId: any =  null 

    constructor(){
        this.notificationAside = (document as Document).getElementById("notification-aside") as HTMLElement
        this.socket = io("http://localhost:3002") as any
        this.socket.on("users", (val: any) => {
            console.log('[EVENT BROKER][USERS] receiving the message:', val)
            this.displayShortLivedNotification(val.message)
        })

        this.socket.on("notes", (val: any) => {
            console.log('[EVENT BROKER][notes] receiving the message:', val)
            this.displayShortLivedNotification(val.message)
        })
    }

    static getInstance(){
        if(WebsocketService.instance == null){
            WebsocketService.instance = new WebsocketService()
        } 
        return WebsocketService.instance
    }
    
    

    sendEvent(channel: string, data: any) {
        this.socket.emit(channel, data, (val: any) => {
            console.log(`✅ [CHANNEL]${channel}:[message sent to the websocket server][DATA]:${val}`);
        });
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

export default WebsocketService