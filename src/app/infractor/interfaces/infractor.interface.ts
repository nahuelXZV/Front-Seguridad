import { Huella } from "./huella.interface";
import { Infraccion } from "./infraccion.interface";

export interface Infractor {
  id: string;
  createdAt: string;
  updatedAt: string;
  nombre: string;
  apellido: string;
  cedulaIdentidad: string;
  nacionalidad: string;
  fechaNacimiento: string;
  sexo: string;
  otros: string;
  fotos: string[];
  huellas: Huella[];
  infracciones: Infraccion[];
}
