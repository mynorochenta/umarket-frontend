export type Condicion = "nuevo" | "bueno" | "regular";

export type Categoria =
  | "Libros"
  | "Electrónica"
  | "Ropa"
  | "Deportes"
  | "Hogar"
  | "Arte"
  | "Música"
  | "Transporte"
  | "Servicios"
  | "Apuntes"
  | "Comida"
  | "Otros";

export interface Universidad {
  id: string;
  nombre: string;
  nombreCorto: string;
  dominio: string;
  color: string;
  estudiantesCount: number;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  universidadId: string;
  universidadNombre: string;
  universidadCorto: string;
  avatar: string;
  bio: string;
  calificacion: number;
  resenasCount: number;
  publicacionesCount: number;
  joinedAt: Date;
  verified: boolean;
}

export interface Publicacion {
  id: string;
  titulo: string;
  precio: number;
  descripcion: string;
  imagenes: string[];
  categoria: Categoria;
  condicion: Condicion;
  vendedor: Usuario;
  universidadId: string;
  universidadNombre: string;
  creadoEn: Date;
  vistas: number;
  likes: number;
  destacada?: boolean;
  activa: boolean;
}

export interface Mensaje {
  id: string;
  conversacionId: string;
  autorId: string;
  contenido: string;
  enviadoEn: Date;
  leido: boolean;
}

export interface Conversacion {
  id: string;
  participantes: [string, string];
  publicacionId?: string;
  publicacionTitulo?: string;
  ultimoMensaje: string;
  ultimoMensajeEn: Date;
  noLeidos: number;
  mensajes: Mensaje[];
}

export interface Resena {
  id: string;
  autorId: string;
  autor: Usuario;
  destinatarioId: string;
  calificacion: number;
  comentario: string;
  creadoEn: Date;
}

export interface Notificacion {
  id: string;
  tipo: "mensaje" | "favorito" | "resena" | "publicacion" | "verificacion";
  titulo: string;
  descripcion: string;
  leida: boolean;
  creadoEn: Date;
  enlace?: string;
  avatar?: string;
}

export interface FiltrosFeed {
  categoria?: Categoria;
  universidadId?: string;
  precioMin?: number;
  precioMax?: number;
  condicion?: Condicion;
  busqueda?: string;
  orden?: "reciente" | "precio_asc" | "precio_desc" | "popular";
}
