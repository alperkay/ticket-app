// src/events/controller.ts
import { JsonController, Get, Param, Body, Post, HttpCode, Authorized } from 'routing-controllers'
import Event from './entity'
import {io} from '../index'

@JsonController()
export default class EventController {

  @Get('/events/:id')
  getEvent(
    @Param('id') id: number
  ) {
    return Event.findOne(id, {relations: ["tickets"]})
  }

  @Get('/events')
  allEvents() {
    return Event.find({relations: ["tickets"]})
  }

  @Authorized()
  @Post('/events')
  @HttpCode(201)
  async createEvent(
    @Body() data: Event
  ) {
    const entity = await data.save()
    const event = await Event.findOne(entity.id)

    io.emit('action', {
      type: 'ADD_EVENT',
      payload: event
    })

    return event
  }


}