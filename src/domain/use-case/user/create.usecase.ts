import { UserGateway } from "../../ports/input/entity/gateway";
import { User } from "../../ports/input/entity/user-entity";
import { Usecase } from "../use-case";

export type InputUserDTO = {
    username: string;
    email: string;
    password: string;
}

export type OutputUserDTO = {
    id: string;
}

export class CreateUserUsecase implements Usecase<InputUserDTO, OutputUserDTO>{

    private constructor(private readonly userGateway: UserGateway){}

    public static create(userGateway: UserGateway){
        return new CreateUserUsecase(userGateway);
    }

    public async execute(input: InputUserDTO): Promise<OutputUserDTO> {
        const {username, email, password} = input;
        const aUser = User.create(username, email, password);

        await this.userGateway.save(aUser);

        const output = this.present(aUser);

        return output;

    }

    private present(input: User){
        const output: OutputUserDTO = {
            id: input.id
        }

        return output;
    }

}