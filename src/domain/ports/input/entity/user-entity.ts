export type UserProps = {
    id: string;
    username: string;
    email: string;
    password: string;
}

export class User {

    private constructor(private props: UserProps){}

    public static create(username: string, email: string, password: string){
        return new User({
            id: crypto.randomUUID().toString(),
            username: username,
            email: email,
            password: password
        });
    }

    public static with(props: UserProps){
        return new User(props);
    }

    public get id(){
        return this.props.id;
    }

    public get username(){
        return this.props.username;
    }

    public get email(){
        return this.props.email;
    }

    public get password(){
        return this.props.password;
    }

}