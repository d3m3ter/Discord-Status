import { Client,RPCClientOptions } from "discord-rpc";
import { clientID } from '../config.json';
import { Manager } from './Manager';
import { Status } from "./types/types";
import { interval,data } from '../config.json';
import { Presence } from "discord.js";
const manager = new Manager();

export class RPC extends Client {

    clientID:string;
    
    constructor(options:RPCClientOptions){
        super(options);
        this.clientID = clientID;
    }

    async Generator(){
        const status:any[] = [];
        const keys:string[] = Object.keys(data);

        
        for(var key of keys){
            if(data[key] != null){
                switch(key){
                    case "instagram":
                        status.push(await manager.Instagram());
                        break;
                    case "github":
                        status.push(await manager.Github());
                        break;
                    case "twitter":
                        status.push(await manager.Twitter());
                        break;
                    case "facebook":
                        status.push(await manager.Facebook());
                        break;
                }
            }
        }
        
        if(status.length == 0) console.error("../config.json ERROR!");
        this.setActivity(status[0]);

        let i:number = 0;
        setInterval(() => {
            if(i == status.length) i = 0;
            switch(i) {
                case 0:
                    this.setActivity(status[0]);
                    break;
                case 1:
                    this.setActivity(status[1]);
                    break;
                case 2:
                    this.setActivity(status[2]);
                    break;
                case 3:
                    this.setActivity(status[3]);
                    break;
            }
            i++;
        }, 1000);

    }

    async Run() {
        this.login({clientId: this.clientID}).then(() => console.log("Ready!")).catch((e) => console.error(e));
        this.Generator();
    }
}