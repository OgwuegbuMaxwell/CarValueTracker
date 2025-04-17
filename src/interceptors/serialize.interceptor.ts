import { 
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
// import { plainToClass } from "class-transformer";
import { plainToInstance } from "class-transformer"; 

// all DTOs passed to the interceptor should at least be a class
interface ClassConstructor {
    new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}
    intercept(context: ExecutionContext, handler: CallHandler) : Observable<any> {
        // Run something before a request is handled by the request handler
        // console.log('I am running before handler: ', context)


        return handler.handle().pipe(
            map((data: any) => {
                // Run something before the response is sent out
                // console.log('I am running before the response is sent out: ', data)

                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true
                })

            })
        )

        
    }
}
