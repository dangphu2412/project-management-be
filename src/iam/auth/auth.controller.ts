import {
  BadRequestException,
  Body,
  Controller,
  PipeTransform,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { z, ZodObject } from 'zod/v4';

const STRONG_PASSWORD_REGEX =
  /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}/;
const loginModel = z.object({
  username: z.string().min(6),
  password: z.string().regex(STRONG_PASSWORD_REGEX),
});
export type LoginDTO = z.infer<typeof loginModel>;
export type LoginResponse = {
  accessToken: string;
};
export const ZodValidationPipe = (model: ZodObject<any>): PipeTransform => ({
  transform(value: any) {
    const result = model.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(result.error.format());
    }
    return result.data;
  },
});

const registerModel = z.object({
  username: z.string().min(6),
  name: z.string().min(6),
  password: z.string().regex(STRONG_PASSWORD_REGEX),
});
export type RegisterDTO = z.infer<typeof registerModel>;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body(ZodValidationPipe(loginModel)) loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @Post('register')
  register(@Body(ZodValidationPipe(registerModel)) registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }
}
