import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMessagesDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  // http://localhost:3000/messages => Get
  @Get()
  listMessages() {}

  // http://localhost:3000/messages => Post
  @Post()
  createMessages(@Body() body: CreateMessagesDto) {
    console.log(body);
  }

  // http://localhost:3000/messages/:id => Get
  @Get('/:id')
  getMessages(@Param('id') id: string) {
    console.log(id);
  }
}
