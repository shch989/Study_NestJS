import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessagesDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  // http://localhost:3000/messages => Get
  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  // http://localhost:3000/messages => Post
  @Post()
  createMessages(@Body() body: CreateMessagesDto) {
    return this.messagesService.create(body.content);
  }

  // http://localhost:3000/messages/:id => Get
  @Get('/:id')
  getMessages(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }
}
