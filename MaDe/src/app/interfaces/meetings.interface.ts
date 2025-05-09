export interface Meetings {
    [key: string]: Dati[];
  }

export interface Dati{
 dataInizio : string,
 dataFine : string, 
 title : string,
 icona : string, 
 luogo : string,
 idScuola : string,
 scuola : string,
 descrizione : string
}