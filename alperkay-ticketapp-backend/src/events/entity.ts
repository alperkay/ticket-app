// src/events/entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import Ticket from '../tickets/entity'

@Entity()
export default class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  name: string

  @Column('text', {nullable:false})
  description: string

  @Column('text', {nullable:false})
  startDate: string

  @Column('text', {nullable:false})
  endDate: string

  @Column('text', {nullable:true})
  pictureUrl: string

  @OneToMany(() => Ticket, ticket => ticket.event)
  tickets: Ticket[];
}