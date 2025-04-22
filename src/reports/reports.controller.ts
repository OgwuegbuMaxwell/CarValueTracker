import { 
    Body, 
    Controller, 
    Post, 
    UseGuards,
    Param,
    Patch,
    Get,
    Query
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimatetDto } from './dtos/get-estimate.dto';


@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user:User) {
        return this.reportsService.create(body, user);
    }


    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
        return this.reportsService.changeApproval(id, body.approved);
    }


    @Get()
    getEstimate(@Query() query: GetEstimatetDto) {
        // console.log('Query: ', query)
        return this.reportsService.createEstimate(query)
    }


}


// async changeApproval(id: string, approved: boolean) {
//     const report = await this.repo.findOne({ where: { id: parseInt(id) } 