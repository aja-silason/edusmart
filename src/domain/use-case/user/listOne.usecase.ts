import { UserGateway } from "../../ports/input/entity/gateway";
import { User } from "../../ports/input/entity/user-entity";
import { Usecase } from "../use-case";

export type ListOneUserInputDTO = {
    id: string
};

export type ListOneUserOutputDTO = {
    id: string;
    username: string;
    email: string;
}

export class ListOneUserUsecase implements Usecase<string, ListOneUserOutputDTO>{

    public constructor(private readonly usergateway: UserGateway){}

    public static create(usergateway: UserGateway){
        return new ListOneUserUsecase(usergateway);
    }

    public async execute(id: string): Promise<ListOneUserOutputDTO> {

        const user = await this.usergateway.findById(id);

        if(!user){
            console.log(`User not found`);
        }
        
        return this.present(user);
    }

    private present(input: User | any): ListOneUserOutputDTO{
        
        const user = {
            id: input.id,
            username: input.username,
            email: input.email,
        }

        return user;
    }


}