// src/comments/controller.ts
import { JsonController, Get, Param, Body, HttpCode, Post, Authorized } from 'routing-controllers'
import Comment from './entity'
import {io} from '../index'

@JsonController()
export default class CommentController {
  
  @Get('/comments/:id')
  getEvent(
    @Param('id') id: number
  ) {
    return Comment.findOne(id)
  }

  @Get('/comments')
  allTickets() {
    return Comment.find()
  }

  @Authorized()
  @Post('/comments')
  @HttpCode(201)
  async createComment(
    @Body() data: Comment
  ) {
    const entity = await data.save()
    const comment = await Comment.findOne(entity.id)

    io.emit('action', {
      type: 'ADD_COMMENT',
      payload: comment
    })

    return comment
  }

}