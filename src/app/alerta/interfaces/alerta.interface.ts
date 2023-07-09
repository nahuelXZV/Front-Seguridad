import { Infractor } from "src/app/infractor/interfaces/infractor.interface";
import { Imagene } from "./imagen.interface";

export interface Alerta {
  id:          string;
  createdAt:   string;
  updatedAt:   string;
  motivo:      string;
  fecha:       string;
  hora:        string;
  imagenes:    Imagene[];
  infractores?: Infractor[];
}
