import { Infraccion } from "./infraccion.interface";

export interface Documento {
  nombre: string;
  dir: string;
  descripcion: string;
  tipo: string;
  infraccion: Infraccion;
}
