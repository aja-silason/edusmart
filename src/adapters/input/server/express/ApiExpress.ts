import express, { Express } from "express";
import { IRoutes } from "./routes/IRoutes";
import { IApi } from "../api";

export class ApiExpress implements IApi {

    private app: Express;

    private constructor(routes: IRoutes[]){
        this.app = express();
        this.app.use(express.json());
        this.addRoutes(routes);
    }

    public static create(routes: IRoutes[]){
        return new ApiExpress(routes);
    }

    private addRoutes(routes: IRoutes[]){
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();
            
            this.app[method](path, handler);
        })
    }

    public start(port: number | string): void {
        this.app.listen(port, ()=> {
            console.log(`Server is running in por ${port}`);
        });

        this.listRoutes();
    }

    private listRoutes(){
        const routes = this.app._router.stack.filter((route: any)=> route.route).map((route: any) => {
            return {
                path: route.route.path,
                method: route.route.stack[0].method
            }
        })

        console.log(routes);
    }




}
