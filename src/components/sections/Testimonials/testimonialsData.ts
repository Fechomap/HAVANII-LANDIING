interface Testimonial {
  quote: string;
  name: string;
  company?: string;
  position?: string;
}

export const testimonials: Testimonial[] = [
  // Los 10 testimonios originales mejorados con algunos emojis
  {
    quote: "Havani nos ayudó a lanzar nuestra nueva tienda online. En solo el primer trimestre, vimos un aumento importante en las ventas. Su enfoque práctico realmente marca la diferencia.",
    name: "Laura Gómez",
    company: "Marea Moda",
    position: "Fundadora"
  },
  {
    quote: "Necesitábamos optimizar rutas y Havani lo resolvió con una solución robusta y eficiente. La calidad de su desarrollo superó nuestras expectativas y ya estamos viendo los beneficios.",
    name: "Javier Martínez",
    company: "Logística Avanza",
    position: "Gerente de Operaciones"
  },
  {
    quote: "Desde el primer día, el equipo de Havani se integró como parte de nosotros. Nos entregaron una herramienta contable tan fácil de usar que simplificó nuestro trabajo diario. ¡Un verdadero alivio! ✨",
    name: "Sofía Herrera",
    company: "HG Contadores",
    position: "Socia Fundadora"
  },
  {
    quote: "La gestión de nuestra flota mejoró muchísimo con la solución que nos implementaron. Ahora respondemos más rápido y nuestros clientes lo notan. ¡Muy satisfechos! 🚛",
    name: "Ricardo Ortega",
    company: "Rescate 24/7",
    position: "Director General"
  },
  {
    quote: "Teníamos poco tiempo para lanzar nuestra app de rastreo y Havani cumplió con creces. La entregaron antes de lo esperado y exactamente como la pedimos. Excelente experiencia.",
    name: "Miguel Torres",
    company: "Envía Rápido",
    position: "Director de Tecnología"
  },
  {
    quote: "Gracias a Havani, pudimos automatizar parte del servicio en nuestro restaurante, reduciendo los tiempos de espera y mejorando la experiencia de nuestros clientes. ¡Una solución que llegó justo a tiempo! ⏱️",
    name: "Ana Ríos",
    company: "La Cava Gourmet",
    position: "Gerente de Operaciones"
  },
  {
    quote: "Buscábamos una plataforma educativa fácil de usar y escalable. Havani nos entregó justo lo que necesitábamos, y nuestros estudiantes están encantados con la experiencia. ❤️",
    name: "Carlos Duarte",
    company: "AprendeMás",
    position: "Director Académico"
  },
  {
    quote: "Controlar el inventario siempre fue un dolor de cabeza... hasta que llegó Havani. Ahora tenemos toda la información en tiempo real y sin errores. ¡Nos cambiaron la vida! ✅",
    name: "Elena Paredes",
    company: "Farmacias Central",
    position: "Gerente de Operaciones"
  },
  {
    quote: "Desde que trabajamos con Havani, nuestra presencia digital mejoró notablemente. En pocos meses, pasamos de tener pocas visitas a liderar en nuestro sector online.",
    name: "Diego Castañeda",
    company: "InnovaTech",
    position: "CEO"
  },
  {
    quote: "La app que crearon para nuestros gimnasios mejoró muchísimo la experiencia de nuestros socios. Las reseñas positivas no han parado desde que la lanzamos. ¡Gracias por todo! ⭐",
    name: "Valeria Morales",
    company: "FitZone",
    position: "Propietaria"
  },

  // Nuevos testimonios humanizados con emojis
  {
    quote: "El bot de WhatsApp que nos entregaron nos ha ahorrado muchísimas horas de atención al cliente. Ahora más del 70% de las consultas se resuelven automáticamente. ¡Vale cada peso que invertimos! 💬",
    name: "Daniela Moreno",
    company: "ServiFácil Monterrey",
    position: "Directora de Operaciones"
  },
  {
    quote: "Sinceramente, su sistema de punto de venta es una joya. Cerrar caja ahora es cuestión de minutos. Recomendadísimos para cualquier negocio que quiera hacer las cosas más fáciles. ☕",
    name: "Luis Ramírez",
    company: "Cafetería El Rincón",
    position: "Propietario"
  },
  {
    quote: "No sabíamos cómo resolver el tema de la facturación electrónica y Havani nos salvó. Además, su soporte siempre está ahí cuando lo necesitamos. Eso se agradece mucho. ✅",
    name: "Mariana López",
    company: "Distribuidora Industrial del Norte",
    position: "Administradora"
  },
  {
    quote: "Teníamos miedo de que nuestro marketplace no aguantara tanto movimiento, pero el ERP que nos hicieron funciona perfecto, incluso en días de mucha demanda como el Buen Fin. ¡Un 10/10! 🛒",
    name: "Elena Durán",
    company: "MercadoClick",
    position: "Fundadora"
  },
  {
    quote: "Con el sistema que nos implementaron, nuestros webinars se manejan casi solos. Agenda, recordatorios, enlaces... todo automatizado. Nos hicieron la vida mucho más fácil. 🎥",
    name: "Patricia Rincón",
    company: "EduDigital",
    position: "Coordinadora de Eventos"
  },
  {
    quote: "Antes, enviar notificaciones a nuestros clientes nos tomaba horas todos los días. Ahora todo es automático y funciona mejor que nunca. Un verdadero alivio para nuestro equipo. ✉️",
    name: "Gabriel Ortega",
    company: "FinAssist",
    position: "Director de Operaciones"
  },
  {
    quote: "Nuestra tienda en línea necesitaba un cambio urgente y Havani lo logró. Las ventas subieron muchísimo en muy poco tiempo. Estamos felices con el resultado. 🛍️",
    name: "Laura Méndez",
    company: "Artesanías Mexicanas",
    position: "Gerente General"
  },
  {
    quote: "Conocimos a Havani por recomendación y no nos equivocamos. Su ERP especializado en grúas mejoró todo nuestro proceso y nos permitió atender más rápido a nuestros clientes. ⚙️",
    name: "Héctor Nava",
    company: "Grúas Inmediatas",
    position: "Director General"
  },
  {
    quote: "El dashboard que nos hicieron es justo lo que buscábamos: claro, directo y fácil de entender. Ahora tomar decisiones es mucho más sencillo para todo el equipo. 📊",
    name: "Andrés Fuentes",
    company: "RetailMetrics",
    position: "Analista de Datos"
  },
  {
    quote: "Su sistema de cálculo de peajes nos ha permitido ahorrar muchísimo en logística. Los reportes son súper claros y la precisión es increíble. Muy recomendable. 🚚",
    name: "Claudia Montes",
    company: "TransLogic",
    position: "Jefa de Operaciones"
  },
  {
    quote: "Teníamos un caos organizando reuniones, hasta que implementaron su sistema de agendamiento. Ahora todo fluye mejor y perdemos menos tiempo en coordinaciones. 🗓️",
    name: "Fernando Reyes",
    company: "ConsultEx",
    position: "Socio Principal"
  },
  {
    quote: "El bot de Telegram que nos hicieron es como tener un asistente extra que nunca descansa. Nuestros clientes ahora pueden consultar sus pedidos en cualquier momento. 🤖",
    name: "Lucía Valdez",
    company: "DistribuMás",
    position: "Directora Comercial"
  },
  {
    quote: "Procesamos cientos de facturas al día y su sistema nos ayudó a hacerlo todo más rápido y con menos errores. Nos ahorraron muchísimos dolores de cabeza. 🧾",
    name: "Martín Salgado",
    company: "Importadora del Pacífico",
    position: "CFO"
  },
  {
    quote: "Nuestro call center mejoró muchísimo con el IVR que nos implementaron. Ahora casi no perdemos llamadas y la atención es mucho más ágil. Excelente trabajo. ☎️",
    name: "Raúl Domínguez",
    company: "SoporteTotal",
    position: "Supervisor de Centro de Contacto"
  }
];

export type { Testimonial };