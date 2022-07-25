import { RouterLink } from "@angular/router";
import { Role } from "./role.enum";

export class Trainer {
    public id: number;
    public username: string;
    public password: string;
    public displayName: string;
    public money: number;
    public role: Role;

    constructor(id: number, username: string, password: string, displayName: string, money: number, role: Role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.displayName = displayName;
        this.money = money;
        this.role = role;
    }
}