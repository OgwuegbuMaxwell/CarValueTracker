import { 
    Controller, 
    Post, 
    Body, 
    Get, 
    Patch, 
    Query, 
    Param, 
    Delete , 
    NotFoundException, 
    Session, 
    UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {}


    // @Get('/colors/:color')
    // setColor(@Param('color') color: string, @Session() session: any ) {
    //     session.color = color;
    // }

    // @Get('/colors')
    // getColor(@Session() session: any) {
    //     return session.color;
    // }

    // @Get('/whoami')
    // async whoAmI(@Session() session: any) {
    //     const user = await this.userService.findOneBy(session.userId);

    //     if (!user) {
    //         throw new NotFoundException('user not signed in')
    //     }

    //     return user;
    // }


    @Get('/whoami')
    @UseGuards(AuthGuard) // user cannot access this route if the user is not signed in
    async whoAmI(@CurrentUser() user: User) {
        return user;
    }


    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        // console.log(body)
        const user = await  this.authService.signup(body.email, body.password);
        session.userId = user.id;

        return user;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;

        return user;
    }


    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }


    // @UseInterceptors(new SerializeInterceptor(UserDto))
    // @Serialize(UserDto)
    @Get('/:id')
    async findUser (@Param('id') id: string) {
        // console.log('Handler is running...')
        const user = await this.userService.findOneBy(parseInt(id));
        if(!user) {
            throw new NotFoundException('user not found')
        }

        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id))
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body);
    }

}
