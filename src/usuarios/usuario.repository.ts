import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
    private usuarios: UsuarioEntity[] = [];

    async salvar(usuario: UsuarioEntity) {
        this.usuarios.push(usuario);
    }

    async listar(): Promise<UsuarioEntity[]> {
        return this.usuarios;
    }

    async existeComEmail(email: string): Promise<Boolean> {
        const possivelUsuario = this.usuarios.find(
            usuario => usuario.email === email
        );

        return possivelUsuario !== undefined;
    }

    async update(id: string, userData: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
        const foundedUser = this.findById(id);

        Object.entries(userData).forEach(([key, value]) => {
            if (key === 'id') {
                return;
            }

            foundedUser[key] = value;
        });

        return foundedUser;
    }

    async remove(id: string): Promise<UsuarioEntity> {
        const removedUser = this.findById(id);

        this.usuarios = this.usuarios.filter(
            user => user.id !== id
        );

        return removedUser;
    }

    private findById(id: string): UsuarioEntity {
        const foundedUser = this.usuarios.find(
            u => u.id === id
        );

        if (!foundedUser) {
            throw new Error('Usuário não existe.');
        }

        return foundedUser;
    }
}