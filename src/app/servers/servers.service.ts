import { Injectable } from "@angular/core";
import { Server } from "./interfaces/server.interface";

@Injectable({
  providedIn: 'root'
})
export class ServersService {
  private servers: Server[]  = [
    {
      id: 1,
      name: 'Productionserver',
      status: 'online'
    },
    {
      id: 2,
      name: 'Testserver',
      status: 'offline'
    },
    {
      id: 3,
      name: 'Devserver',
      status: 'offline'
    }
  ];

  getServers(): Server[] {
    return this.servers;
  }

  getServer(id: number) : Server {
    const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    return <Server>server; //hago un casting para asegurarme que lo que devuelve es de tipo server
  }

  updateServer(id: number, serverInfo: {name: string, status: string}) {
    const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    if (server) {
      server.name = serverInfo.name;
      server.status = serverInfo.status;
    }
  }
}