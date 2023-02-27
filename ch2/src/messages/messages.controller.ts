import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  // http://localhost:3000/messages => Get
  @Get()
  listMessages() {}

  // http://localhost:3000/messages => Post
  @Post()
  createMessages() {}

  // http://localhost:3000/messages/:id => Get
  @Get('/:id')
  getMessages() {}
}
