// src/events/entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import User from '../users/entity'
import Event from '../events/entity'
import Comment from '../comments/entity'


@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  price: number

  @Column('text', {nullable:false})
  description: string

  @Column('text', {nullable:true})
  fraudRisk: number
  
  @Column('text', {nullable:true})
  pictureUrl: string

  @ManyToOne(() => User, user => user.id, {
    eager: true
})
  seller: User

  @ManyToOne(() => Event, event => event.id, {
    eager: true
})
  event: Event

  @Column()
  creationDate: Date= new Date()

  @OneToMany(() => Comment, comment => comment.ticket)
  comments: Comment[];

}

