import { Entity, Column, PrimaryGeneratedColumn, BaseEntity,CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "news"})
export class News extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    title: string;

    @Column()
    thumbnail: string;

    @Column()
    decscription: string;

    @Column({ default: new Date() })
    @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;

    @Column({ default: new Date() })
    @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
}