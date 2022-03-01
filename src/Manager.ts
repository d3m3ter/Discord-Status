import { Presence } from "discord-rpc";
import { data } from '../config.json';
import fetch from 'node-fetch';
import { InstagramUser,GithubUser, UserDatas } from "./types/types";

export class Manager {

    userDatas:UserDatas;
    timestamps:number;

    constructor(){
        this.userDatas = {
            instagram: null,
            github: null
        };

        this.timestamps = Date.now();
    }


    async getInstagramUser(username:string):Promise<InstagramUser> {

        if(this.userDatas.instagram != null) return this.userDatas.instagram;

        const url:string = `https://www.instagram.com/${username}/?__a=1`;
        const response = await fetch(url).then((res) => res.json());

        const account = response.graphql.user;

        const data:InstagramUser = {
            username: username,
            followers: account.edge_followed_by.count.toString(),
            following: account.edge_follow.count.toString()
        };

        this.userDatas.instagram = data;

        return data;
    }

    async Instagram(username:string = data.instagram):Promise<Presence> {

        const user = await this.getInstagramUser(username);
        
        return {
            details: `@${username}`,
            state: `${user.followers} Followers | ${user.following} Following`,
            largeImageKey: "instagram",
            largeImageText: "Instagram",
            startTimestamp: this.timestamps,
            instance: true
        }

    }

    async getGithubUser(username:string):Promise<GithubUser> {

        if(this.userDatas.github != null) return this.userDatas.github;

        const url:string = `https://api.github.com/users/${username}`;
        const response = await fetch(url).then((res) => res.json());

        const user:GithubUser  = {
            name: response.name,
            public_repos: response.public_repos.toString()
        };

        return user;
    }
    async Github(username:string = data.github):Promise<Presence> {

        const user = await this.getGithubUser(username);

        return {
            details: `@${username}`,
            state: `Repositories (${user.public_repos})`,
            largeImageKey: "github",
            largeImageText: "Github",
            startTimestamp: this.timestamps,
            instance: true
        }
    }

    async getTwitterUser(username:string) {
        //curl "https://api.twitter.com/2/users/by/username/$USERNAME" -H "Authorization: Bearer $ACCESS_TOKEN"
        const url:string = `https://api.twitter.com/2/users/by/username/${username}`;

        const response = await fetch(url).then((res) => res.json());
        
        if(response.status == 401) return null;
        
    }

    async Twitter(username:string = data.twitter){
        //const data = await this.getTwitterUser(username);

        return {
            details: `@${username}`,
            state: `API ERROR!`,
            largeImageKey: "twitter",
            largeImageText: "Twitter",
            startTimestamp: this.timestamps,
            instance: true
        };

    }





    
    

    

}