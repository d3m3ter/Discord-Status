import { Client,RPCClientOptions } from "discord-rpc";
import { clientID } from '../config.json';
import { Manager } from './Manager';
import { Status } from "./types/types";
import { interval } from '../config.json';
const manager = new Manager();

export class ExtendedClient extends Client {

    clientID:string;
    
    constructor(options:RPCClientOptions){
        super(options);
        this.clientID = clientID;
    }

    async Generator(){
        let i:number = 2;
        this.setActivity(await manager.Instagram());
        setInterval(async() => {
            if(i == 3) i = Status.Instagram;
            switch(i){
                case Status.Instagram:
                    this.setActivity(await manager.Instagram());
                    break;
                case Status.Github:
                    this.setActivity(await manager.Github());
                    break;
            }
            i++;
        }, interval * 1000);
        
    }

    async Run() {
        this.login({clientId: this.clientID});
        this.on("ready",() => { console.log("Ready!"); this.Generator(); })
    }
}