import { User } from "src/app/auth/interfaces";
import { Estadio } from "src/app/estadio/interfaces/estadio.interface";
import { Sansion } from "./sansion.interface";
import { Testigo } from "src/app/testigos/interfaces/testigo.interface";
import { Documento } from "./documento.interface";

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
  sansion?: Sansion;
  testigos: Testigo[];
  documentos: Documento[];

}
