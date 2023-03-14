interface CardsType {
    id: number
    username: string
    url: string
}

interface Signup{
    email:string
    password:string
    username:string
}
interface Login{
    email:string
    password:string

}


interface User{
    id:number
    email:string
    username:string
    created_at?:string
}

interface Posts{
    url:string
    caption:string
    owner_id: number
}

interface UserInfo{
    followers:number|null
    following:number|null
    posts:number
}

export {type CardsType, type Signup,type User, type Login, type Posts,type UserInfo}