import { Transform, Expose } from "class-transformer";


export class ReportDto {
    @Expose()
    id: number;

    @Expose()
    price: number;

    @Expose()
    year: number;

    @Expose()
    lng: number;

    @Expose()
    lat: number;

    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    mileage: number;

    // obj takes the original entity that we are currently trying to format,
    // look at its properties and find user id, and asign it to userId we defined below
    @Transform(({obj}) => obj.user.id)
    @Expose()
    userId: number;
}