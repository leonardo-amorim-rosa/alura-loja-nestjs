import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListUserDTO } from './dto/list-user.dto';

@Controller('/usuarios')
export class UsuarioController {

  constructor(private usuarioRepository: UsuarioRepository) { }

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.id = uuid();
    usuarioEntity.nome = userData.nome;
    usuarioEntity.email = userData.email;
    usuarioEntity.senha = userData.senha;

    this.usuarioRepository.salvar(usuarioEntity);

    return {
      user: new ListUserDTO(usuarioEntity.id, usuarioEntity.nome),
      message: 'Usuário criado com sucesso!'
    };
  }

  @Get()
  async listUsers() {
    const savedUsers = await this.usuarioRepository.listar();
    const userList = savedUsers.map(
      user => new ListUserDTO(user.id, user.nome)
    );

    return userList;
  }

  @Put("/:id")
  async updateUser(@Param('id') id: string, @Body() userData) {
    const updatedUser = await this.usuarioRepository.update(id, userData);

    return {
      usuario: updatedUser,
      message: "usuário atualizado com sucesso"
    }
  }

  @Delete("/:id")
  async removeUser(@Param('id') id: string) {
    const removedUser = await this.usuarioRepository.remove(id);

    return {
      usuario: removedUser,
      message: "usuário removido com sucesso"
    }    
  }
}
