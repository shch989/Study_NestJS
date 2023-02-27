import { Controller, Module, Get } from '@nestjs/common'

@Controller('/app')
export class AppController {
  @Get('/asdf')
  getRootRoute() {
    return 'Hello NestJS!'
  }

  @Get('/bye')
  getByeThere() {
    return 'Bye NestJS'
  }
}