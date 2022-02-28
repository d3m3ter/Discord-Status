import { Client,RPCClientOptions } from "discord-rpc";
import { clientID } from '../config.json';
import { Manager } from './Manager';
const manager = new Manager();

export class ExtendedClient extends Client {

    clientID:string;
    
    constructor(options:RPCClientOptions){
        super(options);
        this.clientID = clientID;
    }

    async Generator(){
        this.setActivity(await manager.Instagram());
    }

    async Run() {
        this.login({clientId: this.clientID});
        this.on("ready",() => { this.Generator(); })
    }
}