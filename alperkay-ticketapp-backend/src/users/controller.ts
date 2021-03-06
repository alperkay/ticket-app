// src/users/controller.ts
import { JsonController, Get, Param, Body, Post  } from 'routing-controllers';
import User from './entity'
import { io } from '../index'

@JsonController()
export default class UserController {

    @Post('/users')
    async createUser(
        @Body() data: User
    ) {
        const {password, ...rest} = data
        const entity = User.create(rest)
        await entity.setPassword(password)
        const user = await entity.save()

        io.emit('action', {
            type: 'ADD_USER',
            payload: entity
        })
      
        return user
    }


    @Get('/users/:id([0-9]+)')
    getUser(
        @Param('id') id: number
    ) {
        return User.findOne(id, {relations: ["tickets","comments"]})   
    }

    @Get('/users')
    allUsers() { 
        return User.find({relations: ["tickets","comments"]})
    }
}