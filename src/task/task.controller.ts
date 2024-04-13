import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTask(@Param('id') id: string) {
    const taskFound = await this.taskService.getTask(Number(id));
    if (!taskFound) throw new NotFoundException('Task not found');
    return taskFound;
  }

  @Post()
  async createTask(@Body() data: Task) {
    return this.taskService.createTask(data);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: Task) {
    try {
    return this.taskService.updateTask(Number(id), data);       
    } catch (err) {
        throw new NotFoundException(err);
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
    return await this.taskService.deleteTask(Number(id));
    } catch (err) {
        throw new NotFoundException(err);
    }
  }
}
