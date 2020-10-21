import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "thumbnail"})
export class Thumbnail {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 255
    })
    name: string;
}