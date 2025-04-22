import { Report } from "src/reports/report.entity";
import {
    AfterInsert, 
    AfterRemove, 
    AfterUpdate, 
    Entity, 
    Column, 
    PrimaryGeneratedColumn ,
    OneToMany
} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    // Relationshipt to report model
    @OneToMany(() => Report, (report) => report.user)
    reports: Report[]

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id: ', this.id)
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with is: ', this.id)
    }

    @AfterRemove()
    logRemove() {   
        console.log('Removed User with id: ', this.id)
    }
}









