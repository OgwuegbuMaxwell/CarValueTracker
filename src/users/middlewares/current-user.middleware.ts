import { 
    Injectable,
    NestMiddleware
} from "@nestjs/common";

import { Request, Response, NextFunction } from "express";
import { UsersService } from "../users.service";
import { User } from "../user.entity";

declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(
        private usersService: UsersService
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {} // if there's no session object, return empty object
        if (userId) {
            const user = await this.usersService.findOneBy(userId);
            if(user) {
                req.currentUser = user;
            }
        }

        next();
    }
}