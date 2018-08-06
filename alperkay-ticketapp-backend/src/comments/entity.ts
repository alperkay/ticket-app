// src/events/entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import User from '../users/entity'
import Ticket from '../tickets/entity'

@Entity()
export default class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  comment: string

  @ManyToOne(() => User, user => user.id, {
    eager: true
  })
  author: User

  @ManyToOne(() => Ticket, ticket => ticket.id, {
    eager: true
  })
  ticket: Ticket

}
