import type { Listing, User, ListingImage, Notification } from "./types";

/* ─── LOCAL TYPES ─── */
interface University {
  id: string; name: string; shortName: string; domain: string; color: string; studentCount: number;
}

interface LocalUser {
  id: number; name: string; email: string; universityId: string; universityName: string;
  universityShort: string; avatar: string; bio: string; rating: number; reviewCount: number;
  listingCount: number; joinedAt: Date; verified: boolean;
}

export interface Message {
  id: string; conversationId: string; senderId: string; content: string; sentAt: Date; read: boolean;
}

interface Conversation {
  id: string; participants: [string, string]; listingId?: number; listingTitle?: string;
  lastMessage: string; lastMessageAt: Date; unreadCount: number; messages: Message[];
}

interface LocalReview {
  id: string; authorId: number; author: LocalUser; recipientId: number; rating: number;
  comment: string; createdAt: Date;
}

/* ─── UNIVERSITIES ─── */
export const universities: University[] = [
  { id: "uvg", name: "Universidad del Valle de Guatemala", shortName: "UVG", domain: "uvg.edu.gt", color: "#0052CC", studentCount: 1240 },
  { id: "galileo", name: "Universidad Galileo", shortName: "Galileo", domain: "galileo.edu", color: "#E31E24", studentCount: 2180 },
  { id: "url", name: "Universidad Rafael Landívar", shortName: "URL", domain: "url.edu.gt", color: "#003087", studentCount: 1870 },
  { id: "usac", name: "Universidad de San Carlos", shortName: "USAC", domain: "usac.edu.gt", color: "#006838", studentCount: 4320 },
  { id: "ufm", name: "Universidad Francisco Marroquín", shortName: "UFM", domain: "ufm.edu", color: "#8B1A1A", studentCount: 980 },
  { id: "umg", name: "Universidad Mariano Gálvez", shortName: "UMG", domain: "umg.edu.gt", color: "#1565C0", studentCount: 1540 },
  { id: "umes", name: "Universidad Mesoamericana", shortName: "UMES", domain: "umes.edu.gt", color: "#FF6B00", studentCount: 760 },
  { id: "unis", name: "Universidad del Istmo", shortName: "UNIS", domain: "unis.edu.gt", color: "#2E4057", studentCount: 650 },
  { id: "upana", name: "Universidad Panamericana", shortName: "UPANA", domain: "upana.edu.gt", color: "#7B2D8B", studentCount: 420 },
  { id: "uni", name: "Universidad Internaciones", shortName: "UNI", domain: "uni.edu.gt", color: "#C0392B", studentCount: 310 },
  { id: "urural", name: "Universidad Rural de Guatemala", shortName: "URURAL", domain: "urural.edu.gt", color: "#27AE60", studentCount: 580 },
  { id: "usanpablo", name: "Universidad San Pablo de Guatemala", shortName: "USANPABLO", domain: "usanpablo.edu.gt", color: "#2980B9", studentCount: 290 },
  { id: "udavinci", name: "Universidad Leonardo Da Vinci", shortName: "DAVINCI", domain: "udavinci.edu.gt", color: "#E67E22", studentCount: 210 },
  { id: "udeo", name: "Universidad Del Este de Guatemala", shortName: "UDEO", domain: "udeo.edu.gt", color: "#16A085", studentCount: 180 },
  { id: "ureg", name: "Universidad Regional de Guatemala", shortName: "UREG", domain: "ureg.edu.gt", color: "#8E44AD", studentCount: 240 },
];

/* ─── CATEGORIES ─── */
export const categories: { name: string; icon: string; color: string }[] = [
  { name: "Books", icon: "BookOpen", color: "#7C3AED" },
  { name: "Electronics", icon: "Laptop", color: "#2563EB" },
  { name: "Clothing", icon: "Shirt", color: "#EC4899" },
  { name: "Sports", icon: "Dumbbell", color: "#059669" },
  { name: "Home", icon: "Home", color: "#D97706" },
  { name: "Art", icon: "Palette", color: "#DC2626" },
  { name: "Music", icon: "Music", color: "#7C3AED" },
  { name: "Transport", icon: "Bike", color: "#0891B2" },
  { name: "Services", icon: "Briefcase", color: "#65A30D" },
  { name: "Notes", icon: "FileText", color: "#9333EA" },
  { name: "Food", icon: "UtensilsCrossed", color: "#EF4444" },
  { name: "Other", icon: "Package", color: "#6B7280" },
];

/* ─── USERS ─── */
const img = (seed: string) => `https://picsum.photos/seed/${seed}/100/100`;

const localUsers: LocalUser[] = [
  { id: 1, name: "Ana González", email: "ana.gonzalez@uvg.edu.gt", universityId: "uvg", universityName: "Universidad del Valle de Guatemala", universityShort: "UVG", avatar: img("avatar-ana"), bio: "Estudiante de Ingeniería en Sistemas.", rating: 4.9, reviewCount: 23, listingCount: 8, joinedAt: new Date("2024-02-10"), verified: true },
  { id: 2, name: "Carlos Mendoza", email: "carlos.mendoza@galileo.edu", universityId: "galileo", universityName: "Universidad Galileo", universityShort: "Galileo", avatar: img("avatar-carlos"), bio: "Diseño gráfico y fotografía.", rating: 4.7, reviewCount: 15, listingCount: 12, joinedAt: new Date("2024-01-20"), verified: true },
  { id: 3, name: "María López", email: "maria.lopez@url.edu.gt", universityId: "url", universityName: "Universidad Rafael Landívar", universityShort: "URL", avatar: img("avatar-maria"), bio: "Medicina. Vendo libros y material de estudio.", rating: 5.0, reviewCount: 31, listingCount: 6, joinedAt: new Date("2023-09-15"), verified: true },
  { id: 4, name: "Pedro Pérez", email: "pedro.perez@usac.edu.gt", universityId: "usac", universityName: "Universidad de San Carlos", universityShort: "USAC", avatar: img("avatar-pedro"), bio: "Ingeniería Civil.", rating: 4.5, reviewCount: 8, listingCount: 5, joinedAt: new Date("2024-03-01"), verified: true },
  { id: 5, name: "Sofía Ramírez", email: "sofia.ramirez@ufm.edu", universityId: "ufm", universityName: "Universidad Francisco Marroquín", universityShort: "UFM", avatar: img("avatar-sofia"), bio: "Economía y negocios. Ofrezco tutorías.", rating: 4.8, reviewCount: 19, listingCount: 9, joinedAt: new Date("2024-01-05"), verified: true },
  { id: 6, name: "Diego Castro", email: "diego.castro@umg.edu.gt", universityId: "umg", universityName: "Universidad Mariano Gálvez", universityShort: "UMG", avatar: img("avatar-diego"), bio: "Derecho. Apuntes y libros jurídicos.", rating: 4.6, reviewCount: 11, listingCount: 7, joinedAt: new Date("2024-02-28"), verified: true },
  { id: 7, name: "Valeria Torres", email: "valeria.torres@unis.edu.gt", universityId: "unis", universityName: "Universidad del Istmo", universityShort: "UNIS", avatar: img("avatar-valeria"), bio: "Arquitectura. Vendo materiales y equipo de dibujo.", rating: 4.9, reviewCount: 14, listingCount: 4, joinedAt: new Date("2024-03-10"), verified: true },
  { id: 8, name: "Javier Morales", email: "javier.morales@uvg.edu.gt", universityId: "uvg", universityName: "Universidad del Valle de Guatemala", universityShort: "UVG", avatar: img("avatar-javier"), bio: "Ciencias de la Computación. Gadgets y accesorios tech.", rating: 4.4, reviewCount: 7, listingCount: 11, joinedAt: new Date("2024-04-01"), verified: true },
  { id: 9, name: "Isabella Ruiz", email: "isabella.ruiz@galileo.edu", universityId: "galileo", universityName: "Universidad Galileo", universityShort: "Galileo", avatar: img("avatar-isabella"), bio: "Ingeniería de Datos.", rating: 4.7, reviewCount: 9, listingCount: 6, joinedAt: new Date("2024-01-18"), verified: true },
  { id: 10, name: "Rodrigo Santos", email: "rodrigo.santos@url.edu.gt", universityId: "url", universityName: "Universidad Rafael Landívar", universityShort: "URL", avatar: img("avatar-rodrigo"), bio: "Administración de Empresas. Bicicletas y deportes.", rating: 4.8, reviewCount: 17, listingCount: 3, joinedAt: new Date("2023-11-20"), verified: true },
  { id: 11, name: "Camila Díaz", email: "camila.diaz@ufm.edu", universityId: "ufm", universityName: "Universidad Francisco Marroquín", universityShort: "UFM", avatar: img("avatar-camila"), bio: "Psicología. Vendo libros, ropa y artículos del hogar.", rating: 5.0, reviewCount: 22, listingCount: 8, joinedAt: new Date("2023-10-05"), verified: true },
  { id: 12, name: "Andrés García", email: "andres.garcia@usac.edu.gt", universityId: "usac", universityName: "Universidad de San Carlos", universityShort: "USAC", avatar: img("avatar-andres"), bio: "Medicina veterinaria.", rating: 4.3, reviewCount: 5, listingCount: 4, joinedAt: new Date("2024-04-15"), verified: true },
  { id: 13, name: "Valentina Cruz", email: "valentina.cruz@uvg.edu.gt", universityId: "uvg", universityName: "Universidad del Valle de Guatemala", universityShort: "UVG", avatar: img("avatar-valentina"), bio: "Arte y Diseño. Materiales artísticos e instrumentos.", rating: 4.9, reviewCount: 28, listingCount: 15, joinedAt: new Date("2023-08-01"), verified: true },
  { id: 14, name: "Santiago López", email: "santiago.lopez@galileo.edu", universityId: "galileo", universityName: "Universidad Galileo", universityShort: "Galileo", avatar: img("avatar-santiago"), bio: "Ingeniería en Sistemas. Gadgets y libros técnicos.", rating: 4.6, reviewCount: 12, listingCount: 9, joinedAt: new Date("2024-02-14"), verified: true },
  { id: 15, name: "Lucía Hernández", email: "lucia.hernandez@url.edu.gt", universityId: "url", universityName: "Universidad Rafael Landívar", universityShort: "URL", avatar: img("avatar-lucia"), bio: "Comunicación y periodismo. Clases de inglés.", rating: 4.8, reviewCount: 16, listingCount: 5, joinedAt: new Date("2023-12-01"), verified: true },
];

/* ─── HELPERS ─── */
const u = (id: number) => localUsers.find((u) => u.id === id)!;
const pimg = (seed: string) => `https://picsum.photos/seed/${seed}/600/450`;

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function daysAgoStr(n: number): string {
  return daysAgo(n).toISOString();
}

function toSeller(user: LocalUser): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    university: user.universityShort,
    verified: user.verified,
    active: true,
    createdAt: user.joinedAt.toISOString(),
  };
}

function imgs(...seeds: string[]): { imageUrl: string; images: ListingImage[] } {
  return {
    imageUrl: pimg(seeds[0]),
    images: seeds.map((s, i) => ({ url: pimg(s), sortOrder: i })),
  };
}

/* ─── LISTINGS ─── */
export const listings: Listing[] = [
  /* BOOKS */
  { id: 1, title: "Cálculo de una Variable – James Stewart, 8va edición", price: 150, description: "Libro en muy buen estado, pocas marcas de lápiz. Ideal para Cálculo I y II. Incluye acceso web.", ...imgs("libro-calculo-1", "libro-calculo-2"), category: { id: 1, name: "Books" }, itemCondition: "good", seller: toSeller(u(1)), publishedAt: daysAgoStr(2), active: true },
  { id: 2, title: "Álgebra Lineal con Aplicaciones – Steven Leon, 9na ed.", price: 120, description: "Sin marcas, como nuevo. Perfecto para Álgebra Lineal universitaria.", ...imgs("libro-algebra-1", "libro-algebra-2"), category: { id: 1, name: "Books" }, itemCondition: "new", seller: toSeller(u(14)), publishedAt: daysAgoStr(5), active: true },
  { id: 3, title: "Química Orgánica – McMurry, 8va edición", price: 200, description: "Libro base para Química Orgánica. Algunas marcas de resaltador en capítulos 1-5.", ...imgs("libro-quimica-1", "libro-quimica-2", "libro-quimica-3"), category: { id: 1, name: "Books" }, itemCondition: "good", seller: toSeller(u(3)), publishedAt: daysAgoStr(1), active: true },
  { id: 4, title: "Física Universitaria – Sears & Zemansky Vol. 1 y 2", price: 180, description: "Ambos volúmenes incluidos. Buen estado general, tapa firme.", ...imgs("libro-fisica-1", "libro-fisica-2"), category: { id: 1, name: "Books" }, itemCondition: "good", seller: toSeller(u(4)), publishedAt: daysAgoStr(7), active: true },
  { id: 5, title: "Principios de Economía – N. Gregory Mankiw, 7ma ed.", price: 160, description: "Excelente libro de microeconomía y macroeconomía. Sin marcas.", ...imgs("libro-economia-1"), category: { id: 1, name: "Books" }, itemCondition: "new", seller: toSeller(u(5)), publishedAt: daysAgoStr(3), active: true },
  { id: 6, title: "Bundle: 3 libros de Ingeniería Eléctrica", price: 350, description: "Sedra-Smith, Hayt y Dorf. Los tres en buen estado. Perfectos para cursos de circuitos.", ...imgs("libros-bundle-1", "libros-bundle-2"), category: { id: 1, name: "Books" }, itemCondition: "good", seller: toSeller(u(1)), publishedAt: daysAgoStr(10), active: true },
  { id: 7, title: "Introducción al Derecho Civil – Borda, 12va ed.", price: 130, description: "Libro subrayado con resaltadores de colores. Ideal con mis apuntes de clase.", ...imgs("libro-derecho-1"), category: { id: 1, name: "Books" }, itemCondition: "fair", seller: toSeller(u(6)), publishedAt: daysAgoStr(4), active: true },
  { id: 8, title: "Manual de Anatomía Humana – Frank Netter", price: 280, description: "Atlas de anatomía en perfecto estado. Es la versión más reciente.", ...imgs("libro-anatomia-1", "libro-anatomia-2"), category: { id: 1, name: "Books" }, itemCondition: "good", seller: toSeller(u(3)), publishedAt: daysAgoStr(6), active: true },
  /* ELECTRONICS */
  { id: 9, title: "MacBook Air M2 – 8 GB RAM / 256 GB SSD", price: 8500, description: "12 meses de uso, sin golpes ni rayaduras. Batería al 92%. Incluye cargador original.", ...imgs("macbook-1", "macbook-2", "macbook-3"), category: { id: 2, name: "Electronics" }, itemCondition: "good", seller: toSeller(u(5)), publishedAt: daysAgoStr(1), active: true },
  { id: 10, title: "iPad Pro 11\" + Apple Pencil 2da gen.", price: 6800, description: "Perfecto para tomar apuntes y diseño. 14 meses de uso, excelente estado.", ...imgs("ipad-1", "ipad-2"), category: { id: 2, name: "Electronics" }, itemCondition: "good", seller: toSeller(u(8)), publishedAt: daysAgoStr(3), active: true },
  { id: 11, title: "Calculadora Científica Texas Instruments TI-84 Plus", price: 350, description: "En perfectas condiciones. Incluye pilas y estuche. Imprescindible para Cálculo y Estadística.", ...imgs("calculadora-1", "calculadora-2"), category: { id: 2, name: "Electronics" }, itemCondition: "good", seller: toSeller(u(4)), publishedAt: daysAgoStr(8), active: true },
  { id: 12, title: "Auriculares Sony WH-1000XM4 – cancelación de ruido", price: 1200, description: "Ideales para estudiar. Con cancelación activa de ruido. 8 meses de uso.", ...imgs("auriculares-1", "auriculares-2"), category: { id: 2, name: "Electronics" }, itemCondition: "good", seller: toSeller(u(9)), publishedAt: daysAgoStr(2), active: true },
  { id: 13, title: "Monitor LG 27\" 4K – IPS, 60 Hz", price: 1800, description: "Perfecto para programar y diseño. Sin pixeles muertos. 1 año de uso.", ...imgs("monitor-1", "monitor-2"), category: { id: 2, name: "Electronics" }, itemCondition: "good", seller: toSeller(u(14)), publishedAt: daysAgoStr(5), active: true },
  { id: 14, title: "Laptop Lenovo ThinkPad E15 – i5, 16 GB, 512 SSD", price: 5500, description: "Excelente para programación y trabajo universitario. Con garantía vigente.", ...imgs("lenovo-1", "lenovo-2", "lenovo-3"), category: { id: 2, name: "Electronics" }, itemCondition: "good", seller: toSeller(u(6)), publishedAt: daysAgoStr(4), active: true },
  { id: 15, title: "Cámara Canon EOS M50 Mark II + lente 15-45mm", price: 3200, description: "Para proyectos de comunicación y fotografía. 6 meses de uso, como nueva.", ...imgs("camara-1", "camara-2"), category: { id: 2, name: "Electronics" }, itemCondition: "good", seller: toSeller(u(15)), publishedAt: daysAgoStr(9), active: true },
  { id: 16, title: "Teclado mecánico Anne Pro 2 – switches Brown", price: 650, description: "Teclado 60%. Perfecto para programadores. Como nuevo.", ...imgs("teclado-1"), category: { id: 2, name: "Electronics" }, itemCondition: "new", seller: toSeller(u(8)), publishedAt: daysAgoStr(6), active: true },
  /* CLOTHING */
  { id: 17, title: "Sudadera oficial UVG – talla XL", price: 180, description: "Sudadera 100% algodón, talla XL. Solo usada 3 veces.", ...imgs("sudadera-1", "sudadera-2"), category: { id: 3, name: "Clothing" }, itemCondition: "new", seller: toSeller(u(1)), publishedAt: daysAgoStr(3), active: true },
  { id: 18, title: "Set deportivo Adidas – camiseta + shorts + calcetas", price: 380, description: "Talla M. En perfecto estado, lavado 2 veces. Color azul marino.", ...imgs("ropa-adidas-1"), category: { id: 3, name: "Clothing" }, itemCondition: "good", seller: toSeller(u(9)), publishedAt: daysAgoStr(11), active: true },
  { id: 19, title: "Camisa formal slim fit – talla S", price: 120, description: "Ideal para presentaciones y entrevistas. Color blanco, sin mancha ni daños.", ...imgs("camisa-formal-1"), category: { id: 3, name: "Clothing" }, itemCondition: "new", seller: toSeller(u(5)), publishedAt: daysAgoStr(7), active: true },
  { id: 20, title: "Uniforme de laboratorio – talla M (2 piezas)", price: 95, description: "Bata + pantalón. Usado 1 semestre. Limpio y en buen estado.", ...imgs("uniforme-lab-1"), category: { id: 3, name: "Clothing" }, itemCondition: "good", seller: toSeller(u(12)), publishedAt: daysAgoStr(14), active: true },
  /* SPORTS */
  { id: 21, title: "Bicicleta de montaña Trek Marlin 5 – 2022", price: 3500, description: "Talla M, 21 velocidades. En excelente estado, cambios recién ajustados.", ...imgs("bicicleta-1", "bicicleta-2", "bicicleta-3"), category: { id: 4, name: "Sports" }, itemCondition: "good", seller: toSeller(u(10)), publishedAt: daysAgoStr(4), active: true },
  { id: 22, title: "Kit completo de fútbol – pelota + espinilleras + tacos", price: 250, description: "Pelota Molten tamaño 5. Todo en buen estado, poco uso.", ...imgs("futbol-1"), category: { id: 4, name: "Sports" }, itemCondition: "good", seller: toSeller(u(12)), publishedAt: daysAgoStr(8), active: true },
  { id: 23, title: "Mancuernas ajustables 20 kg (par)", price: 850, description: "Perfectas para entrenar en casa. Sin daños. Incluye soporte de piso.", ...imgs("mancuernas-1", "mancuernas-2"), category: { id: 4, name: "Sports" }, itemCondition: "good", seller: toSeller(u(2)), publishedAt: daysAgoStr(6), active: true },
  { id: 24, title: "Set de yoga – mat, bloques y correa", price: 180, description: "Mat 6mm antideslizante, 2 bloques espuma, 1 correa. Poco uso.", ...imgs("yoga-1"), category: { id: 4, name: "Sports" }, itemCondition: "good", seller: toSeller(u(11)), publishedAt: daysAgoStr(12), active: true },
  /* HOME */
  { id: 25, title: "Minibar / Refrigeradora pequeña 3.2 pies", price: 950, description: "Ideal para cuarto de estudiante. Funciona perfectamente, 1 año de uso.", ...imgs("minibar-1", "minibar-2"), category: { id: 5, name: "Home" }, itemCondition: "good", seller: toSeller(u(4)), publishedAt: daysAgoStr(5), active: true },
  { id: 26, title: "Escritorio de madera con cajones – 1.20 m", price: 550, description: "Escritorio amplio en buen estado. Ideal para estudiar. Sin daños importantes.", ...imgs("escritorio-1", "escritorio-2"), category: { id: 5, name: "Home" }, itemCondition: "good", seller: toSeller(u(7)), publishedAt: daysAgoStr(9), active: true },
  { id: 27, title: "Cafetera Keurig K-Mini + 24 cápsulas", price: 450, description: "Perfecta para sobrevivir semana de parciales. Incluye 24 cápsulas variadas.", ...imgs("cafetera-1"), category: { id: 5, name: "Home" }, itemCondition: "good", seller: toSeller(u(13)), publishedAt: daysAgoStr(2), active: true },
  { id: 28, title: "Ventilador de torre Honeywell – silencioso", price: 320, description: "3 velocidades, temporizador. Perfecto para el cuarto. Sin ruido.", ...imgs("ventilador-1"), category: { id: 5, name: "Home" }, itemCondition: "good", seller: toSeller(u(9)), publishedAt: daysAgoStr(13), active: true },
  /* ART */
  { id: 29, title: "Set profesional de óleos Winsor & Newton (36 colores)", price: 280, description: "Set casi completo, faltan 3 colores. Incluye 5 pinceles de cerdas.", ...imgs("oleos-1", "oleos-2"), category: { id: 6, name: "Art" }, itemCondition: "good", seller: toSeller(u(13)), publishedAt: daysAgoStr(3), active: true },
  { id: 30, title: "Lienzos estirados 40×50 cm (lote de 5)", price: 150, description: "Lienzos sin usar, 100% algodón. Ideales para pintura al óleo y acrílico.", ...imgs("lienzos-1"), category: { id: 6, name: "Art" }, itemCondition: "new", seller: toSeller(u(13)), publishedAt: daysAgoStr(6), active: true },
  /* MUSIC */
  { id: 31, title: "Guitarra acústica Yamaha F310 + funda + capotraste", price: 1100, description: "2 años de uso, bien cuidada. Cuerdas nuevas. Ideal para aprender.", ...imgs("guitarra-1", "guitarra-2"), category: { id: 7, name: "Music" }, itemCondition: "good", seller: toSeller(u(10)), publishedAt: daysAgoStr(7), active: true },
  { id: 32, title: "Controlador MIDI M-Audio Keystation 49 teclas", price: 750, description: "Perfecto para producción musical y DJ. Incluye cable USB y soporte.", ...imgs("midi-1", "midi-2"), category: { id: 7, name: "Music" }, itemCondition: "good", seller: toSeller(u(2)), publishedAt: daysAgoStr(10), active: true },
  { id: 33, title: "Ukelele soprano Kala KA-15S + afinador", price: 350, description: "Poco uso, en perfectas condiciones. Incluye bolsa y afinador clip.", ...imgs("ukelele-1"), category: { id: 7, name: "Music" }, itemCondition: "new", seller: toSeller(u(11)), publishedAt: daysAgoStr(4), active: true },
  /* TRANSPORT */
  { id: 34, title: "Bicicleta urbana Btwin Riverside 120 – talla M", price: 1800, description: "Perfecta para moverse en el campus. 7 velocidades, frenos de disco.", ...imgs("bici-urbana-1", "bici-urbana-2"), category: { id: 8, name: "Transport" }, itemCondition: "good", seller: toSeller(u(7)), publishedAt: daysAgoStr(8), active: true },
  { id: 35, title: "Patín eléctrico Xiaomi Mi Pro 2", price: 2200, description: "25 km/h, autonomía 45 km. Perfecto estado, batería al 88%.", ...imgs("patin-1", "patin-2"), category: { id: 8, name: "Transport" }, itemCondition: "good", seller: toSeller(u(8)), publishedAt: daysAgoStr(3), active: true },
  /* SERVICES */
  { id: 36, title: "Tutorías de Cálculo I, II y III – online/presencial", price: 75, description: "Clases personalizadas por hora. Más de 30 alumnos aprobados. UVG / Galileo.", ...imgs("tutorias-1"), category: { id: 9, name: "Services" }, itemCondition: "new", seller: toSeller(u(1)), publishedAt: daysAgoStr(1), active: true },
  { id: 37, title: "Clases de inglés conversacional – nivel B2/C1", price: 80, description: "Clases de 1 hora, enfoque conversacional y preparación para entrevistas.", ...imgs("ingles-1"), category: { id: 9, name: "Services" }, itemCondition: "new", seller: toSeller(u(15)), publishedAt: daysAgoStr(5), active: true },
  /* NOTES */
  { id: 38, title: "Apuntes completos de Anatomía Humana I – URL Med.", price: 80, description: "PDF + resúmenes impresos, 120 páginas. Incluye todas las unidades del semestre.", ...imgs("apuntes-anatomia-1"), category: { id: 10, name: "Notes" }, itemCondition: "new", seller: toSeller(u(3)), publishedAt: daysAgoStr(2), active: true },
  { id: 39, title: "Resúmenes de Derecho Civil – UMG, 2do año", price: 60, description: "Resúmenes de cada unidad con jurisprudencia relevante. Formato PDF.", ...imgs("apuntes-derecho-1"), category: { id: 10, name: "Notes" }, itemCondition: "new", seller: toSeller(u(6)), publishedAt: daysAgoStr(4), active: true },
  { id: 40, title: "Guía de estudio TOEFL iBT – 2024 actualizada", price: 90, description: "Guía con 3 exámenes de práctica completos y estrategias por sección.", ...imgs("toefl-guia-1", "toefl-guia-2"), category: { id: 10, name: "Notes" }, itemCondition: "new", seller: toSeller(u(5)), publishedAt: daysAgoStr(6), active: true },
  /* FOOD */
  { id: 41, title: "Venta de almuerzos caseros – entrega en campus UVG", price: 35, description: "Almuerzo completo (sopa, plato fuerte, postre). De lunes a viernes.", ...imgs("almuerzo-1", "almuerzo-2"), category: { id: 11, name: "Food" }, itemCondition: "new", seller: toSeller(u(13)), publishedAt: daysAgoStr(0), active: true },
  { id: 42, title: "Brownies caseros (caja de 12 unidades)", price: 45, description: "Brownies de chocolate intenso, sin conservantes. Entrega en Galileo o zona 10.", ...imgs("brownies-1"), category: { id: 11, name: "Food" }, itemCondition: "new", seller: toSeller(u(2)), publishedAt: daysAgoStr(1), active: true },
];

/* ─── REVIEWS ─── */
const reviews: LocalReview[] = [
  { id: "r1", authorId: 2, author: u(2), recipientId: 1, rating: 5, comment: "Ana fue muy atenta y el libro llegó exactamente como se describía. 100% recomendada.", createdAt: daysAgo(20) },
  { id: "r2", authorId: 4, author: u(4), recipientId: 1, rating: 5, comment: "Excelente vendedora, muy puntual y honesta. El envío fue rápido.", createdAt: daysAgo(15) },
  { id: "r3", authorId: 1, author: u(1), recipientId: 5, rating: 5, comment: "Las tutorías de Sofía son increíbles. Aprobé Cálculo II gracias a ella.", createdAt: daysAgo(10) },
  { id: "r4", authorId: 8, author: u(8), recipientId: 3, rating: 5, comment: "El atlas de anatomía estaba en mejor estado del esperado. Gracias María!", createdAt: daysAgo(5) },
  { id: "r5", authorId: 3, author: u(3), recipientId: 9, rating: 4, comment: "Buenos auriculares, llegaron bien empacados. Una oreja tenía un pequeño rayón.", createdAt: daysAgo(3) },
];

/* ─── CONVERSATIONS ─── */
export const conversations: Conversation[] = [
  {
    id: "c1", participants: ["1", "2"], listingId: 9, listingTitle: "MacBook Air M2",
    lastMessage: "Sí, puedo llevarlo mañana al campus.", lastMessageAt: daysAgo(0), unreadCount: 2,
    messages: [
      { id: "m1", conversationId: "c1", senderId: "2", content: "Hola! Sigo disponible el MacBook?", sentAt: new Date(Date.now() - 3600000 * 3), read: true },
      { id: "m2", conversationId: "c1", senderId: "1", content: "Sí, todavía está disponible. ¿Cuándo puedes verlo?", sentAt: new Date(Date.now() - 3600000 * 2), read: true },
      { id: "m3", conversationId: "c1", senderId: "2", content: "Podría ser mañana en el campus? Mañana estoy en UVG", sentAt: new Date(Date.now() - 1800000), read: true },
      { id: "m4", conversationId: "c1", senderId: "1", content: "Sí, puedo llevarlo mañana al campus.", sentAt: new Date(Date.now() - 600000), read: false },
    ],
  },
  {
    id: "c2", participants: ["1", "3"], listingId: 8, listingTitle: "Atlas de Anatomía",
    lastMessage: "Perfecto, entonces nos vemos el jueves 🙌", lastMessageAt: daysAgo(1), unreadCount: 0,
    messages: [
      { id: "m5", conversationId: "c2", senderId: "1", content: "Hola María! Me interesa el Atlas de Netter, ¿sigue disponible?", sentAt: new Date(Date.now() - 86400000 * 2), read: true },
      { id: "m6", conversationId: "c2", senderId: "3", content: "Claro que sí! Está en excelente estado. ¿Cuándo te conviene?", sentAt: new Date(Date.now() - 86400000 * 2 + 3600000), read: true },
      { id: "m7", conversationId: "c2", senderId: "1", content: "Perfecto, entonces nos vemos el jueves 🙌", sentAt: new Date(Date.now() - 86400000), read: true },
    ],
  },
  {
    id: "c3", participants: ["1", "10"], listingId: 21, listingTitle: "Bicicleta Trek Marlin 5",
    lastMessage: "Me puedes enviar más fotos del marco?", lastMessageAt: daysAgo(2), unreadCount: 1,
    messages: [
      { id: "m8", conversationId: "c3", senderId: "1", content: "Buenas! Tiene algún daño la bici?", sentAt: new Date(Date.now() - 86400000 * 3), read: true },
      { id: "m9", conversationId: "c3", senderId: "10", content: "No, está en excelente estado. Cambios ajustados la semana pasada.", sentAt: new Date(Date.now() - 86400000 * 2 + 7200000), read: true },
      { id: "m10", conversationId: "c3", senderId: "1", content: "Me puedes enviar más fotos del marco?", sentAt: new Date(Date.now() - 86400000 * 2), read: false },
    ],
  },
];

/* ─── NOTIFICATIONS ─── */
export const notifications: Notification[] = [
  { id: "n1", type: "message", title: "Carlos te escribió", description: "Hola! Sigo disponible el MacBook?", read: false, createdAt: new Date(Date.now() - 600000).toISOString(), link: "/messages/c1", avatar: img("avatar-carlos") },
  { id: "n2", type: "favorite", title: "Tu publicación recibió un favorito", description: "A Rodrigo le gustó: Calculadora TI-84", read: false, createdAt: new Date(Date.now() - 3600000).toISOString(), link: "/listing/11", avatar: img("avatar-rodrigo") },
  { id: "n3", type: "review", title: "Nueva reseña ⭐⭐⭐⭐⭐", description: "Pedro te dejó una reseña de 5 estrellas", read: false, createdAt: new Date(Date.now() - 7200000).toISOString(), link: "/profile/1", avatar: img("avatar-pedro") },
  { id: "n4", type: "listing", title: "Tu publicación fue vista 100 veces", description: "Cálculo de una Variable alcanzó 100 vistas", read: true, createdAt: daysAgo(1).toISOString(), link: "/listing/1" },
  { id: "n5", type: "verification", title: "Cuenta verificada ✓", description: "Tu email universitario ha sido verificado. ¡Bienvenido a UMarket!", read: true, createdAt: daysAgo(30).toISOString(), link: "/profile/1" },
  { id: "n6", type: "message", title: "Rodrigo te escribió", description: "Me puedes enviar más fotos del marco?", read: true, createdAt: daysAgo(2).toISOString(), link: "/messages/c3", avatar: img("avatar-rodrigo") },
  { id: "n7", type: "favorite", title: "3 personas guardaron tu publicación", description: "Bicicleta Trek Marlin 5 está en favoritos de 3 personas", read: true, createdAt: daysAgo(3).toISOString(), link: "/listing/21" },
];

/* ─── UTILITY EXPORTS ─── */
const FEATURED_IDS = new Set([1, 3, 8, 9, 10, 14, 21, 31, 35]);
export const featuredListings = listings.filter((p) => FEATURED_IDS.has(p.id));

export function getListingById(id: string): Listing | undefined {
  return listings.find((p) => p.id === Number(id));
}

export function getUserById(id: string): LocalUser | undefined {
  return localUsers.find((u) => String(u.id) === id);
}

export function getListingsBySeller(sellerId: number | string): Listing[] {
  return listings.filter((p) => p.seller.id === Number(sellerId) && p.active);
}

export function getReviewsByRecipient(recipientId: string): LocalReview[] {
  return reviews.filter((r) => String(r.recipientId) === recipientId);
}

export function getConversationsByUser(userId: string): Conversation[] {
  return conversations.filter((c) => c.participants.includes(userId));
}
