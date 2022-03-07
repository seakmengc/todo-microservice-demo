import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>, private httpService: HttpService){}

  async create(createTodoDto: CreateTodoDto) {
    const todo = this.todoRepo.create(createTodoDto);

    try {
     const res = await firstValueFrom(this.httpService.get('http://user_api:3000/user/' + todo.userId));

      Logger.log(res.data);
    } catch(_) {
      Logger.log(_.message);
      throw new ForbiddenException();
    }

    return this.todoRepo.save(todo);
  }

  findAll(userId: number) {
    return this.todoRepo.find({userId});
  }

  findOne(id: number) {
    return this.todoRepo.findOne(id);
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.todoRepo.update(id, updateTodoDto);
  }

  remove(id: number) {
    return this.todoRepo.delete(id);
  }
}
