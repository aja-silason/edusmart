import { UserGateway } from "../../ports/input/entity/gateway";
import { User } from "../../ports/input/entity/user-entity";
import { Usecase } from "../use-case";

export type ListUserInputDTO = void;

export type ListUserOutputDTO = {
    user: {
        id: string
        username: string,
        email: string,
    }[]
}

export class ListUserUsecase implements Usecase<ListUserInputDTO, ListUserOutputDTO> {

    private constructor(private readonly usergateway: UserGateway){}

    public static create(usergateway: UserGateway){
        return new ListUserUsecase(usergateway);
    }

    public async execute(): Promise<ListUserOutputDTO> {
        
        const aUser = await this.usergateway.list();
        const output = this.present(aUser);

        return output;

    }

    private present(input: User[]){
        return {
            user: input.map((users) => {
                return {
                    id: users.id,
                    username: users.username,
                    email: users.email
                }
            })
        }
    }

}