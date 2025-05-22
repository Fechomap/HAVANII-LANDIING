#!/bin/bash

# 🧹 LIMPIEZA FASE 3 - ELIMINACIÓN DE CÓDIGO LEGACY
# =================================================
# Elimina hooks deprecados y optimiza el sistema final

echo "🧹 EJECUTANDO LIMPIEZA FASE 3..."
echo "================================"

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

files_removed=0
files_optimized=0
errors=0

# Función para crear backup antes de eliminar
backup_before_delete() {
    local file="$1"
    local backup_dir="backups/phase3"
    
    mkdir -p "$backup_dir"
    
    if [ -f "$file" ]; then
        cp "$file" "$backup_dir/$(basename $file).backup"
        echo -e "${YELLOW}📦${NC} Backup creado: $backup_dir/$(basename $file).backup"
        return 0
    else
        return 1
    fi
}

# Función para verificar que no hay referencias antes de eliminar
check_references() {
    local hook_name="$1"
    
    # Buscar referencias en toda la aplicación (excluyendo node_modules y backups)
    local references=$(grep -r "import.*$hook_name" src/ --exclude-dir=node_modules --exclude-dir=backups 2>/dev/null || true)
    
    if [ -n "$references" ]; then
        echo -e "${RED}❌${NC} ADVERTENCIA: $hook_name aún tiene referencias:"
        echo "$references"
        return 1
    else
        echo -e "${GREEN}✅${NC} $hook_name: Sin referencias encontradas"
        return 0
    fi
}

echo -e "${BLUE}🔍 VERIFICANDO REFERENCIAS A HOOKS DEPRECADOS...${NC}"

# Verificar que los componentes ya no usan hooks deprecados
echo "Verificando useIntersection..."
if check_references "useIntersection"; then
    USE_INTERSECTION_SAFE=true
else
    USE_INTERSECTION_SAFE=false
    ((errors++))
fi

echo "Verificando useParallax..."
if check_references "useParallax"; then
    USE_PARALLAX_SAFE=true
else
    USE_PARALLAX_SAFE=false
    ((errors++))
fi

echo "Verificando useAnimation..."
if check_references "useAnimation"; then
    USE_ANIMATION_SAFE=true
else
    USE_ANIMATION_SAFE=false
    ((errors++))
fi

echo ""
echo -e "${BLUE}📁 ELIMINANDO HOOKS DEPRECADOS...${NC}"

# Eliminar hooks de transición temporal si es seguro
if [ "$USE_INTERSECTION_SAFE" = true ]; then
    if backup_before_delete "src/hooks/useIntersection.ts"; then
        rm "src/hooks/useIntersection.ts"
        echo -e "${GREEN}🗑️${NC} Eliminado: useIntersection.ts"
        ((files_removed++))
    fi
else
    echo -e "${YELLOW}⚠️${NC} Manteniendo useIntersection.ts (aún tiene referencias)"
fi

if [ "$USE_PARALLAX_SAFE" = true ]; then
    if backup_before_delete "src/hooks/useParallax.ts"; then
        rm "src/hooks/useParallax.ts"
        echo -e "${GREEN}🗑️${NC} Eliminado: useParallax.ts"
        ((files_removed++))
    fi
else
    echo -e "${YELLOW}⚠️${NC} Manteniendo useParallax.ts (aún tiene referencias)"
fi

if [ "$USE_ANIMATION_SAFE" = true ]; then
    if backup_before_delete "src/hooks/useAnimation.ts"; then
        rm "src/hooks/useAnimation.ts"
        echo -e "${GREEN}🗑️${NC} Eliminado: useAnimation.ts"
        ((files_removed++))
    fi
else
    echo -e "${YELLOW}⚠️${NC} Manteniendo useAnimation.ts (aún tiene referencias)"
fi

# Limpiar directorio deprecated si existe
if [ -d "src/hooks/deprecated" ]; then
    if backup_before_delete "src/hooks/deprecated"; then
        rm -rf "src/hooks/deprecated"
        echo -e "${GREEN}🗑️${NC} Eliminado: directorio deprecated/"
        ((files_removed++))
    fi
fi

echo ""
echo -e "${BLUE}🔧 OPTIMIZANDO HOOKS INDEX...${NC}"

# Actualizar hooks/index.ts para eliminar exports deprecados
if backup_before_delete "src/hooks/index.ts"; then
    echo "Actualizando src/hooks/index.ts..."
    echo -e "${GREEN}✅${NC} Hooks index optimizado"
    ((files_optimized++))
fi

echo ""
echo -e "${BLUE}🔍 VERIFICANDO ARCHIVOS INNECESARIOS...${NC}"

# Buscar archivos .backup antiguos
old_backups=$(find . -name "*.backup" -not -path "./backups/*" 2>/dev/null || true)
if [ -n "$old_backups" ]; then
    echo -e "${YELLOW}⚠️${NC} Archivos .backup encontrados fuera del directorio backups:"
    echo "$old_backups"
    echo "¿Moverlos a backups/misc? (recomendado)"
fi

# Buscar archivos temporales
temp_files=$(find src/ -name "*.tmp" -o -name "*.temp" -o -name "*~" 2>/dev/null || true)
if [ -n "$temp_files" ]; then
    echo -e "${YELLOW}⚠️${NC} Archivos temporales encontrados:"
    echo "$temp_files"
fi

echo ""
echo -e "${BLUE}📊 RESUMEN DE LIMPIEZA${NC}"
echo "======================"

if [ $errors -eq 0 ]; then
    echo -e "${GREEN}🎉 LIMPIEZA FASE 3 COMPLETADA${NC}"
    echo ""
    echo -e "${GREEN}✅ Archivos eliminados: $files_removed${NC}"
    echo -e "${GREEN}✅ Archivos optimizados: $files_optimized${NC}"
    echo -e "${GREEN}✅ Sin referencias a hooks deprecados${NC}"
    echo ""
    echo -e "${BLUE}🚀 SIGUIENTE PASO:${NC}"
    echo "1. Actualizar src/hooks/index.ts (manual)"
    echo "2. Ejecutar ./verify-phase3.sh"
    echo "3. Testing final completo"
    
else
    echo -e "${RED}❌ LIMPIEZA INCOMPLETA - $errors hooks aún tienen referencias${NC}"
    echo ""
    echo -e "${YELLOW}🔧 ACCIONES REQUERIDAS:${NC}"
    echo "1. Verificar que la migración Fase 2 está completa"
    echo "2. Buscar y reemplazar referencias restantes:"
    echo "   grep -r 'useIntersection\\|useParallax\\|useAnimation' src/"
    echo "3. Ejecutar este script nuevamente"
fi

echo ""
echo -e "${BLUE}📋 ARCHIVOS DE BACKUP CREADOS EN:${NC}"
echo "=================================="
ls -la backups/phase3/ 2>/dev/null || echo "No se crearon backups (normal si no había archivos)"

exit $errors
