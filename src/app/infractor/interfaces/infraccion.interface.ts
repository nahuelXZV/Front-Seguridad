import { User } from "src/app/auth/interfaces";
import { Estadio } from "src/app/estadio/interfaces/estadio.interface";
import { Sancion } from "./sancion.interface";

export interface Infraccion {
  id: string;
  createdAt: string;
  updatedAt: string;
  fecha: string;
  hora: string;
  seccion: string;
  fila: string;
  asiento: string;
  descripcion: string;
  estado: string;
  estadio: Estadio;
  creador: User;
  sansion?: Sancion;

}
