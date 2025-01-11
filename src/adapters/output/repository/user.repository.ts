import { UserGateway } from "../../../domain/ports/input/entity/gateway";
import { User, UserProps } from "../../../domain/ports/input/entity/user-entity";

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

    async findById(id: string): Promise<User | null> {

        const output: any = this.user.filter((user: User) => user.id == id );

        if(!output) {
            return null;
        }

        return User.with({
            id: output.id,
            username: output.username,
            email: output.id,
            password: output.id,
        });
        
    }

    async delete(id: string): Promise<void> {
        
    }

    async update(id: string): Promise<void> {
        return console.log("");
    }
}