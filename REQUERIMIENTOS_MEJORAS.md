# Requerimientos para Mejoras en Landing HAVANI

## 1. Estructura de Imágenes Específicas por Producto

### Contexto Actual
Actualmente, todas las páginas de productos utilizan imágenes comunes, como el archivo `placeholder.svg` (2.6MB). Esto genera dos problemas:
1. No hay diferenciación visual entre productos
2. Se repiten recursos pesados innecesariamente

### Requerimiento
Implementar una estructura organizada para las imágenes de cada producto, garantizando que cada página pueda tener sus propias imágenes sin afectar a las demás.

### Implementación Técnica
1. **Crear estructura de directorios específica:**
   ```
   public/
     └── images/
         ├── automike/           # Imágenes específicas de AutoMike
         ├── neural-crane/       # Imágenes específicas de Neural Crane
         ├── analytic-pulse/     # Imágenes específicas de otros productos
         └── shared/             # Imágenes compartidas (logos, íconos)
   ```

2. **Actualizar referencias en componentes:**
   - Modificar los componentes de cada página para referenciar las imágenes desde su directorio correspondiente
   - Ejemplo: cambiar `/placeholder.svg` por `/images/automike/dashboard.webp` en AutoMike.tsx

3. **Optimización de recursos:**
   - Las imágenes nuevas deben estar en formato WebP (mejor compresión)
   - Tamaño máximo recomendado: 400KB por imagen (vs 2.6MB actual)
   - Dimensiones adecuadas para cada dispositivo (usar srcset cuando sea posible)

## 2. Homologación de Botón "Watch Demo" en Todas las Páginas de Producto

### Contexto Actual
El botón "Watch Demo" se implementó en la página principal con un modal que muestra un video de demostración. Sin embargo, otras páginas de producto solo tienen botones "Solicitar Demo" y "Conocer Más", sin la funcionalidad de video.

### Requerimiento
Homologar todas las páginas de productos añadiendo el botón "Watch Demo" con su respectivo modal de video, reemplazando el botón "Conocer Más" en cada caso.

### Implementación Técnica
1. **En cada página de producto (AutoMike.tsx, NeuralCrane.tsx, etc.):**
   - Importar el componente `VideoModal` desarrollado recientemente
   - Añadir estado para controlar la visibilidad del modal (`isVideoModalOpen`)
   - Añadir estado para la URL del video específico del producto (`videoSrc`)
   - Implementar las funciones `handleOpenVideoModal` y `handleCloseVideoModal`

2. **Reemplazar el botón "Conocer Más" por "Watch Demo":**
   - Sustituir el botón actual:
     ```tsx
     <Button variant="outline" className="...">
       Conocer Más
     </Button>
     ```
   - Por el nuevo botón con ícono de reproducción:
     ```tsx
     <Button 
       variant="outline" 
       className="group flex items-center justify-center gap-3..."
       onClick={handleOpenVideoModal}
     >
       <div className="...">
         <Play className="w-4 h-4 ml-0.5" />
       </div>
       Watch Demo
     </Button>
     ```

3. **Añadir el componente de modal al final de cada página:**
   ```tsx
   <VideoModal
     isOpen={isVideoModalOpen}
     onClose={handleCloseVideoModal}
     videoSrc={videoSrc}
     videoTitle="[NOMBRE-PRODUCTO]: [DESCRIPCIÓN-ESPECÍFICA]"
   />
   ```

4. **Crear directorio específico para videos:**
   ```
   public/
     └── videos/
         ├── automike-demo.mp4
         ├── neural-crane-demo.mp4
         └── [otros-productos]-demo.mp4
   ```

### Consideraciones de UX
- Los videos deben ser cortos (máximo 30-45 segundos)
- Cada video debe mostrar específicamente las características del producto correspondiente
- Mantener coherencia visual pero con contenido específico por producto
- Optimizar videos para web (codec h.264, resolución 720p, bitrate moderado)

## Priorización Sugerida

1. **Alta Prioridad:**
   - Implementar el botón "Watch Demo" en todas las páginas de producto
   - Crear la estructura de directorios para videos

2. **Media Prioridad:**
   - Crear la estructura de directorios para imágenes específicas por producto
   - Migrar imágenes existentes a la nueva estructura

3. **Baja Prioridad:**
   - Optimizar imágenes existentes (conversión a WebP, redimensionamiento)
   - Implementar srcset para carga responsiva de imágenes

## Métricas de Éxito

- **Peso de página:** Reducción mínima del 40% en el tamaño de descarga inicial
- **Consistencia visual:** 100% de las páginas de producto con botón "Watch Demo" funcional
- **Engagement:** Aumento en tiempo promedio de permanencia en páginas de producto
