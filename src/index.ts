import { ExtendedClient } from './Client';
export const client = new ExtendedClient({transport: "ipc"});
client.Run();