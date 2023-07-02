// Generated by https://quicktype.io

export interface Infraccion {
  id:          string;
  createdAt:   string;
  updatedAt:   string;
  fecha:       string;
  hora:        string;
  seccion:     string;
  fila:        string;
  asiento:     string;
  descripcion: string;
  estado:      string;
  estadio:     Estadio;
  creador:     Creador;
  sansion:     null;
  testigos:    Testigo[];
  documentos:  any[];
}

export interface Creador {
  id:        string;
  createdAt: string;
  updatedAt: string;
  nombre:    string;
  apellido:  string;
  email:     string;
  role:      string;
}

export interface Estadio {
  id:           string;
  createdAt:    string;
  updatedAt:    string;
  nombre:       string;
  departamento: string;
  ciudad:       string;
  direccion:    string;
}

export interface Testigo {
  id:              string;
  createdAt:       string;
  updatedAt:       string;
  nombre:          string;
  apellido:        string;
  cedulaIdentidad: string;
  nacionalidad:    string;
  sexo:            string;
  telefono:        string;
}
