import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable } from "typeorm";

@Entity({ name: "user" })
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    uid: number;

    @Column({ length: 10 })
    id: string;

    @Column({ length: 50 })
    name: string;

    @Column()
    uniqueAppID: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column()
    deviceToken: string;
}