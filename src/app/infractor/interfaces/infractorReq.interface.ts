import { Huella } from "./huella.interface";

export interface InfractorReq {
  nombre: string;
  apellido: string;
  cedulaIdentidad: string;
  nacionalidad: string;
  fechaNacimiento: string;
  sexo: string;
  otros: string;
  huellas: Huella[];

}
