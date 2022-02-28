import { Presence } from "discord-rpc";
import { data } from '../config.json';
import fetch from 'node-fetch';
import { InstagramData } from "./types/types";
import { client } from ".";

export class Manager {

    async getInstagramUser(username:string):Promise<InstagramData> {

        const url:string = `https://www.instagram.com/${username}/?__a=1`;
        const response = await fetch(url).then((res) => res.json());

        const account = response.graphql.user;

        const data:InstagramData = {
            username: username,
            followers: account.edge_followed_by.count.toString(),
            following: account.edge_follow.count.toString()
        };

        return data;
    }

    async Instagram(username:string = data.instagram):Promise<Presence> {

        const user = await this.getInstagramUser(username);
        
        return {
            details: `@${username}`,
            state: `${user.followers} Followers | ${user.following} Following`,
            largeImageKey: "instagram",
            largeImageText: "Instagram",
            startTimestamp: Date.now(),
            instance: true
        }

    }

    

}