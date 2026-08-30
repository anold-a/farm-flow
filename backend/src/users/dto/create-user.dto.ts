import { Role} from "@prisma/client";

export class CreateUserDto{
fullName:string;
email:string;
password:string;
role?:Role;
}