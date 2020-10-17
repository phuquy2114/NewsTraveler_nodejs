import { Entity, Column, PrimaryGeneratedColumn, BaseEntity,CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "news"})
export class News extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 255
    })
    title: string;

    @Column()
    thumbnail: string;

    @Column({
        length: 3000
    })
    decscription: string;

    @Column()
    thumbnailone: string;

    @Column({
        length: 3000
    })
    decscriptionone: string;

    @Column()
    thumbnailtwo: string;

    @Column({
        length: 3000
    })
    decscriptiontwo: string;

    @Column()
    thumbnailthree: string;

    @Column({
        length: 3000
    })
    decscriptionthree: string;

    @Column({ default: new Date() })
    @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;

    @Column({ default: new Date() })
    @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
}