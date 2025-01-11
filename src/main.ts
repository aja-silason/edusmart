import { ApiExpress } from "./adapters/input/server/express/ApiExpress";
import { CreateUserController } from "./adapters/input/server/express/routes/user/createController";
import { UserRepository } from "./adapters/output/repository/user.repository";
import { CreateUserUsecase } from "./domain/use-case/user/create.usecase";
// import dotenv  from "dotenv";


function main(){
    
    // dotenv.config();

    type User = {
        username: string,
        email: string,
        password: string
    }

    const user = [{
        username: "Ananias Jaime Augusto",
        email: "ananiasjaimeaugusto@gmail.com",
        password: "aja122up"
    },
    {
        username: "Ananias Jaime Augusto",
        email: "ananiasjaimeaugusto@gmail.com",
        password: "aja122up"
    },
    {
        username: "Ananias Jaime Augusto",
        email: "ananiasjaimeaugusto@gmail.com",
        password: "aja122up"
    }]

    
    const aUserRepository = UserRepository.create(user);
    const aUser = CreateUserUsecase.create(aUserRepository);
    
    const userRoute = CreateUserController.create(aUser);

    console.log("User create = ", aUser);

    const port = process.env.PORT || 3033;

    const api = ApiExpress.create([userRoute]);

    api.start(port);
    
}

main();