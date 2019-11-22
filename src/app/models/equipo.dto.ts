export class EquipoDto {
    constructor(
        public nombre : string,
        public creado_por: string,
        public codigo_acceso: string
    ) {}

    transformarDto() {
        return {
            nombre: this.nombre,
            creado_por: this.creado_por,
            codigo_acceso: this.codigo_acceso
        };
    }
}