import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListUserDTO } from './dto/list-user.dto';

@Controller('/usuarios')
export class UsuarioController {

  constructor(private usuarioRepository: UsuarioRepository) { }

  @Post()
  async criarUsuario(@Body() dadosUsuario: CreateUserDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.id = uuid();
    usuarioEntity.nome = dadosUsuario.nome;
    usuarioEntity.email = dadosUsuario.email;
    usuarioEntity.senha = dadosUsuario.senha;

    this.usuarioRepository.salvar(usuarioEntity);

    return {
      user: new ListUserDTO(usuarioEntity.id, usuarioEntity.nome),
      message: 'Usuário criado com sucesso!'
    };
  }

  @Get()
  async listarUsuarios() {
    const savedUsers = await this.usuarioRepository.listar();
    const userList = savedUsers.map(
      user => new ListUserDTO(user.id, user.nome)
    );

    return userList;
  }
}
