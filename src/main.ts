import { ApiExpress } from "./adapters/input/server/express/ApiExpress";
import { CreateUserController } from "./adapters/input/server/express/routes/user/createController";
import { UserRepository } from "./adapters/output/repository/user.repository";
import { CreateUserUsecase } from "./domain/use-case/user/create.usecase";
import dotenv  from "dotenv";
import { ListUserUsecase } from "./domain/use-case/user/list.usecase";
import { ListUserController } from "./adapters/input/server/express/routes/user/listController";
import { ListOneUserController } from "./adapters/input/server/express/routes/user/listOneController";
import { ListOneUserUsecase } from "./domain/use-case/user/listOne.usecase";


function main(){
    
    dotenv.config();

    const user = "a";

    const aUserRepository = UserRepository.create(user);

    const aUser = CreateUserUsecase.create(aUserRepository);
    const listUser = ListUserUsecase.create(aUserRepository);
    const listOneUser = ListOneUserUsecase.create(aUserRepository);
    
    const userRoute = CreateUserController.create(aUser);
    const listUserRoute = ListUserController.create(listUser);
    const listOneUserRoute = ListOneUserController.create(listOneUser);
    
    const port = 3033;
    const api = ApiExpress.create([userRoute, listUserRoute, listOneUserRoute]);

    api.start(port);
    
}

main();