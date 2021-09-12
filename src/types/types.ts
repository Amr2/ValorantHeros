export interface HerosOBJ{
    Heros :Hero[];
    SetHeros? : any;
    get_img? :(target:Hero)=>Promise<string>;
    GeTHeros?:any
}

export interface Hero {
    loaded:boolean;
    fullPortrait:string;
    uuid:string;
    displayName:string;
    description:string;
    abilities:ability[];
    displayIconSmall:string;
    role : role
};

export interface role {
    displayName:string;
    uuid:string;
    description:string;
    displayIcon:string;
}

export interface ability{
    slot:string;
    displayName:string;
    description:string;
    displayIcon:string
}