import { RPC } from './Client';
export const rpc = new RPC({transport: "ipc"});
rpc.Run();