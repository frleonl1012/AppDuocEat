export interface Element {
    nombre: string,
    precio: number
}

export interface CarritoCompras {
    total:number,
    elements:Element[],
    elementCount:number,
}