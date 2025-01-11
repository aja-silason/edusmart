import { Request, Response } from "express";
import { HttpMethod, IRoutes } from "../IRoutes";
import { ListOneUserUsecase } from "../../../../../../domain/use-case/user/listOne.usecase";

export type ListOneUserControllerResponse = {
    id: string,
    username: string,
    email: string
}

export class ListOneUserController implements IRoutes{

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly listOneService: ListOneUserUsecase){}

    public static create(listOneService: ListOneUserUsecase){
        return new ListOneUserController(
            "/user/:id",
            HttpMethod.GET,
            listOneService
        );
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getHandler() {
        return async (req: Request, res: Response) => {

            const {id} = req.params;

            try {
                
                
                const user = await this.listOneService.execute(id);
                
                const response = this.present(user);

                const responseBody = {
                    id: response.id ?? "",
                    username: response.username ?? "",
                    email: response.email ?? "",
                }

                console.log("Ohh shihhh", responseBody);

                res.status(200).json(responseBody).send();

            } catch (error) {
                res.status(404).json({data: "Something went wrong, we are fixing for you"}).send();
            }

        }
    }

    private present(input: ListOneUserControllerResponse) {
        const user: ListOneUserControllerResponse = {
            id: input.id,
            username: input.username,
            email: input.email
        }

        return user;
    }


}