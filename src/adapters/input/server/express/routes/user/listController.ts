import { Request, Response } from "express";
import { ListUserOutputDTO, ListUserUsecase } from "../../../../../../domain/use-case/user/list.usecase";
import { HttpMethod, IRoutes } from "../IRoutes";

export type ListUserControllerResponseDTO = {
    id: string,
    username: string,
    email: string,
}[]

export class ListUserController implements IRoutes{

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly listUserService: ListUserUsecase){}

    public static create(listUserService: ListUserUsecase){
        return new ListUserController(
            "/user",
            HttpMethod.GET,
            listUserService
        );
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getHandler() {
        return async (req: Request, res: Response) =>{
            try {
                const output = await this.listUserService.execute();
                const responseBody = this.present(output);

                res.status(200).json(responseBody).send();
                
            } catch (error) {
                res.status(404).json({data: "Something, went wrong we are finxing for you"}).send()
            }
        }
    }

    public present(input: ListUserOutputDTO): ListUserControllerResponseDTO{
        const response = input.user.map((users) => ({
            id: users.id,
            username: users.username,
            email: users.email,
        }))
        return response
    }


}