export type InstagramUser = {
    username:string,
    followers:string,
    following:string
};

export type GithubUser = {
    name:string,
    public_repos: string
};

export enum Status {
    Instagram = 1,
    Github = 2
};

export type UserDatas = {
    instagram:InstagramUser,
    github:GithubUser
}; 