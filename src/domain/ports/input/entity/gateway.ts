import { User } from "./user-entity";

export interface UserGateway {
    save(user: User): Promise<void>;
    list(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    delete(id: string): Promise<void>;
    update(id: string): Promise<void>;
}