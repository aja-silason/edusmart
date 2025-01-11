import { UserGateway } from "../../../domain/ports/input/entity/gateway";
import { User } from "../../../domain/ports/input/entity/user-entity";

export class UserRepository implements UserGateway{

    user: User[] = [];

    private constructor(private readonly userClient: User){}

    public static create(userClient: User){
        return new UserRepository(userClient);
    }

    async save(user: User): Promise<void> {
        this.user.push(user);
    }

    async list(): Promise<User[]> {
        const output = this.user.map((user) => {
            return user;
        })
        return output
    }

    async findById(id: string): Promise<User> {

        const output: any = this.user.find((user: User) => user.id == id );

        if(!output) {
            console.log("Something went wrong");
        }

        return User.with({
            id: output.props.id,
            username: output.props.username,
            email: output.props.email
        });
        
    }

    async delete(id: string): Promise<void> {
    }

    async update(id: string): Promise<void> {
    }
}