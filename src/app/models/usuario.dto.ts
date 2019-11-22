export class UsuarioDto {
    constructor(
        public email: string,
        public nombre: string,
        public photo: string
    ) {}

    transformarDto() {
        return { 
            email: this.email, 
            nombre: this.nombre, 
            photo: this.photo
        };
    }
}