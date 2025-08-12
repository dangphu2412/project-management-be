import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserStoriesService } from './user-stories.service';
import { z } from 'zod/v4';
import { ZodDataTransformPipe } from '../shared/data-transform/zod-data-transform.pipe';

const createUserStoryDto = z.object({
  title: z.string(),
  description: z.string(),
  priorityId: z.string(),
  point: z.number(),
  sprintId: z.string().nullable(),
  tags: z.array(z.string()),
});
export type CreateUserStoryDto = z.infer<typeof createUserStoryDto>;

const updateUserStoryDto = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  priorityId: z.string(),
  point: z.number(),
  sprintId: z.string().nullable(),
  tags: z.array(z.string()),
});
export type UpdateUserStoryDto = z.infer<typeof updateUserStoryDto>;

@Controller('user-stories')
export class UserStoriesController {
  constructor(private readonly userStoriesService: UserStoriesService) {}

  @Post()
  create(
    @Body(ZodDataTransformPipe(createUserStoryDto))
    createUserStoryDto: CreateUserStoryDto,
  ) {
    return this.userStoriesService.create(createUserStoryDto);
  }

  @Get()
  findAll() {
    return this.userStoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userStoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ZodDataTransformPipe(updateUserStoryDto))
    updateUserStoryDto: UpdateUserStoryDto,
  ) {
    return this.userStoriesService.update(id, updateUserStoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userStoriesService.remove(id);
  }
}
