import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({summary: '현재 고양이 가져오기'})
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...'
  })
  @ApiResponse({
    status: 200,
    description: 'Success!',
    type: ReadOnlyCatDto
  })
  @ApiOperation({summary: '회원가입'})
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body)
  }

  @ApiOperation({summary: '로그인'})
  @Post('login')
  logIn() {
    return 'login';
  }

  @ApiOperation({summary: '로그아웃'})
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({summary: '고양이 이미지 업로드'})
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
