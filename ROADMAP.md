# 🚀 ROADMAP DE LIMPIEZA - LANDING HAVANI

**Proyecto**: Landing-HAVANI-1  
**Rama**: `cleanup/dead-code-removal`  
**Objetivo**: Optimización del 85% → 100% listo para producción  
**Reducción estimada**: 5.5MB (34% del código fuente)  

---

## 📊 MÉTRICAS ACTUALES

| Métrica | Antes | Objetivo | Reducción |
|---------|-------|----------|-----------|
| **Tamaño Total** | 270MB | 264MB | 6MB |
| **Código Fuente** | 8.2MB | 5.4MB | 2.8MB (34%) |
| **Archivos** | 127 | 89 | 38 archivos (30%) |
| **Líneas de Código** | ~12,000 | ~9,153 | 2,847 líneas |

---

# 🗺️ FASES DEL ROADMAP

## ✅ PREPARACIÓN
- [x] **Commit cambios actuales** - `e16811f`
- [x] **Push a main** - Sincronizado
- [x] **Crear rama** - `cleanup/dead-code-removal`
- [x] **Crear ROADMAP.md** - Documentación completa

---

## ✅ FASE 1: ARCHIVOS SEGUROS (RIESGO: NINGUNO)
**Estado**: ✅ COMPLETADA  
**Tiempo real**: 15 minutos  
**Reducción**: ~180K archivos eliminados

### 📋 Tareas FASE 1

- [x] **1.1 Eliminar Backups** (124K)
  ```bash
  rm -rf backups/  # ✅ Eliminado completo
  ```
  
- [x] **1.2 Scripts Obsoletos** (~40K)
  ```bash
  rm cleanup-phase3.sh final-testing.sh implement-phase2.sh
  rm implement-phase3-complete.sh verificar-fase1.sh 
  rm verify-phase2.sh verify-phase3.sh  # ✅ Eliminados
  ```
  
- [x] **1.3 Documentación Obsoleta** (~15K)
  ```bash
  rm README-Sistema-Final.md READMEfase1.md  # ✅ Eliminados
  ```

### 🎯 Objetivos FASE 1
- ✅ **Sin riesgo** - Solo archivos de desarrollo
- ✅ **Limpieza rápida** - Eliminación masiva segura
- ✅ **Verificación** - `npm run build` debe seguir funcionando

---

## ✅ FASE 2: COMPONENTES OBSOLETOS (RIESGO: BAJO)
**Estado**: ✅ COMPLETADA  
**Tiempo real**: 45 minutos  
**Reducción**: 2KB + optimización COMPLETA

### 📋 Tareas FASE 2

- [x] **2.1 Auditoría COMPLETA de todas las páginas**
  ```bash
  ✅ 6 páginas de productos auditadas
  ✅ TelegramBot agregada al router (/telegrambot)
  ```
  
- [x] **2.2 Migrar TestimonialsSection**
  ```bash
  ✅ AnimateOnScroll → ScrollReveal migrado
  ✅ src/components/AnimateOnScroll.tsx eliminado (2KB)
  ```
  
- [x] **2.3 Limpiar Imports en TODAS las páginas**
  ```bash
  ✅ useScrollTrigger removido de 4 páginas:
     - AutoMike.tsx, FacturAPISaaS.tsx
     - TeXMLBotIVR.tsx, TelegramBot.tsx
  ```

### 🎯 Objetivos FASE 2
- ✅ **Auditoría completa** - TODAS las páginas verificadas
- ✅ **Limpieza universal** - Imports obsoletos eliminados
- ✅ **Router actualizado** - TelegramBot ahora accesible
- ✅ **Build exitoso** - Sin errores en ninguna página

---

## ✅ FASE 3: DEPENDENCIAS (RIESGO: MEDIO)
**Estado**: ✅ COMPLETADA  
**Tiempo real**: 30 minutos  
**Reducción**: 6.18KB bundle + dependency cleanup

### 📋 Tareas FASE 3

- [x] **3.1 Auditoría completa de dependencias**
  ```bash
  ✅ GSAP MANTENIDO - Uso activo en TestimonialsSection (carousel)
  ✅ React Query ELIMINADO - Configurado pero no usado
  ```
  
- [x] **3.2 Eliminar React Query completamente**
  ```bash
  ✅ npm uninstall @tanstack/react-query
  ✅ Imports y configuración removidos de App.tsx
  ✅ QueryClientProvider eliminado del árbol de componentes
  ```
  
- [x] **3.3 Verificación de optimización**
  ```bash
  ✅ Bundle reducido: 740.44 KiB → 734.26 KiB (-6.18KB)
  ✅ Build exitoso sin React Query
  ✅ Todas las páginas funcionando correctamente
  ```

### 🎯 Objetivos FASE 3
- ✅ **Análisis inteligente** - GSAP mantenido por uso activo
- ✅ **Eliminación segura** - React Query removido sin impacto
- ✅ **Bundle optimizado** - Reducción real de tamaño
- ✅ **Arquitectura limpia** - Dependencias solo las necesarias

---

## 🟡 VERIFICACIÓN FINAL
**Estado**: 🔄 PENDIENTE  
**Tiempo estimado**: 30 minutos

### 📋 Tareas Verificación

- [ ] **Compilación Completa**
  ```bash
  npm run build
  npm run preview
  ```
  
- [ ] **Análisis Bundle**
  ```bash
  npx vite-bundle-analyzer dist/
  ```
  
- [ ] **Métricas Finales**
  - Documentar tamaños finales
  - Comparar con objetivos
  - Actualizar este roadmap

---

# 🛠️ COMANDOS DE EMERGENCIA

## 🚨 Rollback Completo
```bash
git reset --hard main
git checkout main
git branch -D cleanup/dead-code-removal
```

## 🚨 Rollback Parcial
```bash
git log --oneline  # Encontrar commit anterior
git reset --hard <commit-hash>
```

## ✅ Verificación Rápida
```bash
npm run build && echo "✅ Build OK" || echo "❌ Build FAILED"
```

---

# 📝 LOG DE PROGRESO

## 2025-01-25

### ✅ Preparación Completada
- **14:30** - Commit cambios button navigation
- **14:31** - Push a main exitoso  
- **14:32** - Rama `cleanup/dead-code-removal` creada
- **14:33** - ROADMAP.md creado

### 🔄 FASE 1 EN PROGRESO
- **14:35** - Iniciando eliminación de archivos seguros
- **--:--** - [PENDIENTE] Eliminar backups
- **--:--** - [PENDIENTE] Eliminar scripts
- **--:--** - [PENDIENTE] Eliminar documentación

---

# 🎯 CRITERIOS DE ÉXITO

## ✅ Completitud
- [ ] Todas las fases ejecutadas sin errores
- [ ] Build de producción funcional
- [ ] Métricas objetivo alcanzadas
- [ ] Sin funcionalidad perdida

## ✅ Calidad
- [ ] Sin imports rotos
- [ ] Sin referencias a archivos eliminados
- [ ] Bundle optimizado
- [ ] Performance mantenida

---

**🔄 ESTADO ACTUAL**: FASE 1 Lista para Ejecutar  
**📅 ÚLTIMA ACTUALIZACIÓN**: 2025-01-25 14:33  
**👤 RESPONSABLE**: Claude Code + Usuario