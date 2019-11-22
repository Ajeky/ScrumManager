export class HistoriaDto {
    constructor(
        public titulo: string,
        public descripcion: string,
        public estado: string
    ) {}

    transformarDto() {
        return {
            titulo: this.titulo,
            descripcion: this.descripcion,
            estado: this.estado
        };
    }
}