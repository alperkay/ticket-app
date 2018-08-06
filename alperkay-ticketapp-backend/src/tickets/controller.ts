// src/events/controller.ts
import { JsonController, Get, Param, Body, NotFoundError, Patch, Post, HttpCode, Authorized } from 'routing-controllers'
import Ticket from './entity'
import {io} from '../index'

@JsonController()
export default class TicketController {
  
  @Get('/tickets/:id')
  getEvent(
    @Param('id') id: number
  ) {
    return Ticket.findOne(id, {relations: ["comments"]})
  }

  @Get('/tickets')
  allTickets() {
    return Ticket.find({relations: ["comments"]})
  }

  // @Authorized()
  @Patch('/tickets/:id([0-9]+)')
  async updateTicket(
    @Param('id') id: number,
    @Body() update: Partial<Ticket>
  ) {
    const ticket = await Ticket.findOne(id)
    if (!ticket) throw new NotFoundError('Cannot find ticket')

    const updatedTicket = await Ticket.merge(ticket, update)

    // DOESNT' WORK PROPERLY
    // if (ticket.comments) {
    //   if (ticket.comments.length>3) ticket.fraudRisk+=0.05
    // }

    await updatedTicket.save()

    io.emit('action', {
      type: 'UPDATE_TICKET',
      payload: updatedTicket
    })

    return updatedTicket
  }

  @Authorized()
  @Post('/tickets')
  @HttpCode(201)
  async createTicket(
    @Body() data: Ticket
  ) {

    //FRAUD ALGO
    data.fraudRisk = 0.05 
    const allTickets = await Ticket.find()
    if (allTickets.filter(ticket=>Number(ticket.seller.id)===Number(data.seller)).length===0) data.fraudRisk+=0.1 //if it's user's only ticket
    
    //ticket price vs avg ticket price of that event
    const eventTickets = allTickets.filter(ticket=>ticket.event.id===data.event.id)
    if (eventTickets.length>0) {
      const arrPrices = eventTickets.map(p=>Number(p.price))
      const avgPrice = ((arrPrices.reduce((acc, curr) => acc + curr))+Number(data.price))/(arrPrices.length+1) //including the new ticket
      if (data.price<avgPrice) {data.fraudRisk+=((avgPrice-data.price)/avgPrice)} 
      if (data.price>avgPrice) {
        if ((data.price-avgPrice)/avgPrice>0.1) {data.fraudRisk-=0.1}
        if ((data.price-avgPrice)/avgPrice<0.1) {data.fraudRisk-=(data.price-avgPrice)/avgPrice}
      }
    }
    
    //if added during business hours
    if (data.creationDate.getHours()>8 && data.creationDate.getHours()<18) {data.fraudRisk-=0.1}
    else {data.fraudRisk+=0.1}

    if (data.fraudRisk>0.95) data.fraudRisk=0.95 //maximum risk treshold
    if (data.fraudRisk<0.05) data.fraudRisk=0.05 //minimum risk treshold

    const entity = await data.save()
    const ticket = await Ticket.findOne(entity.id)

    io.emit('action', {
      type: 'ADD_TICKET',
      payload: ticket
    })

    return ticket
  }
}