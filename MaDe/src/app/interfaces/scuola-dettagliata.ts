export interface ScuolaDettagliata {
  data: ScuolaDettaglio[];
}

export interface ScuolaDettaglio {
  id: string;
  name: string;
  description?: string;
  logo: Logo;
  type: TipoScuola;
  // Altri campi necessari...
}

export interface Logo {
  id: string;
  filename_disk: string;
  // Altri campi necessari...
}

export interface TipoScuola {
  id: string;
  name: string;
  description: string;
}
