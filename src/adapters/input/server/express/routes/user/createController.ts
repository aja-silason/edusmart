import { Request, Response } from "express";
import { CreateUserUsecase, InputUserDTO } from "../../../../../../domain/use-case/user/create.usecase"
import { HttpMethod, IRoutes } from "../IRoutes"

export type CreateUserControllerResponseDTO = {
    id: string
}

export class CreateUserController implements IRoutes {

    private constructor(private readonly path: string, private readonly method: HttpMethod, private readonly createUserService: CreateUserUsecase ){}

    public static create(createUserService: CreateUserUsecase){
        return new CreateUserController(
            "/user",
            HttpMethod.POST,
            createUserService
        );
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const {username, email, password} = req.body;

            try {
                
                const payload: InputUserDTO = {
                    username,
                    email,
                    password
                }

                const isValidate: Array<keyof InputUserDTO> = ["username", "email", "password"];
                for(const key of isValidate){
                    if(payload[key] == "" || payload[key] == undefined || payload[key] == null){
                        res.status(422).json({message: `${key} must be a fill`}).send();
                    }
                }

                const output: CreateUserControllerResponseDTO = await this.createUserService.execute(payload);

                res.status(201).json(output).send();

            } catch (error) {
                res.status(404).json({data: "Something went wrong, we are fixing for you!"}).send();
            }
        }
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }


}
