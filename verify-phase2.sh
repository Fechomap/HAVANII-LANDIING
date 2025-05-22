#!/bin/bash

# 🔍 VERIFICACIÓN FASE 2
# ======================
# Verifica que la migración fue exitosa

echo "🔍 VERIFICANDO MIGRACIÓN FASE 2..."
echo "=================================="

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

errors=0
warnings=0

# Función para verificar imports
check_imports() {
    local file="$1"
    local component_name="$2"
    
    if [ -f "$file" ]; then
        if grep -q "ScrollReveal" "$file"; then
            echo -e "${GREEN}✅${NC} $component_name: Usa ScrollReveal"
        else
            echo -e "${RED}❌${NC} $component_name: NO usa ScrollReveal"
            ((errors++))
        fi
        
        if grep -q "useIntersection.*@/hooks" "$file"; then
            echo -e "${YELLOW}⚠️${NC} $component_name: Aún usa useIntersection (deprecado)"
            ((warnings++))
        fi
        
        if grep -q "useParallax.*@/hooks" "$file"; then
            echo -e "${YELLOW}⚠️${NC} $component_name: Aún usa useParallax (deprecado)"
            ((warnings++))
        fi
    else
        echo -e "${RED}❌${NC} $component_name: Archivo no encontrado"
        ((errors++))
    fi
}

echo -e "${BLUE}📁 VERIFICANDO COMPONENTES MIGRADOS...${NC}"

# Verificar cada componente
check_imports "src/components/sections/ValueProp/ValuePropSection.tsx" "ValuePropSection"
check_imports "src/components/sections/TechnologyStack/TechnologyStackSection.tsx" "TechnologyStackSection"
check_imports "src/components/sections/Hero/HeroSection.tsx" "HeroSection"
check_imports "src/components/sections/ProblemSolution/ProblemSolutionSection.tsx" "ProblemSolutionSection"
check_imports "src/components/sections/Process/ProcessSection.tsx" "ProcessSection"
check_imports "src/components/sections/Services/ServicesSection.tsx" "ServicesSection"
check_imports "src/components/sections/FlagshipProducts/FlagshipProductsSection.tsx" "FlagshipProductsSection"
check_imports "src/components/sections/Testimonials/TestimonialsSection.tsx" "TestimonialsSection"

echo ""
echo -e "${BLUE}🔧 VERIFICANDO TYPESCRIPT...${NC}"

if npx tsc --noEmit 2>/dev/null; then
    echo -e "${GREEN}✅${NC} TypeScript compila sin errores"
else
    echo -e "${RED}❌${NC} Errores de TypeScript encontrados"
    echo -e "${YELLOW}   Ejecutar: npx tsc --noEmit para ver detalles${NC}"
    ((errors++))
fi

echo ""
echo -e "${BLUE}🚀 VERIFICANDO BUILD...${NC}"

if npm run build 2>/dev/null; then
    echo -e "${GREEN}✅${NC} Build de producción exitoso"
else
    echo -e "${RED}❌${NC} Error en build de producción"
    ((errors++))
fi

echo ""
echo -e "${BLUE}📊 RESUMEN DE VERIFICACIÓN${NC}"
echo "=========================="

if [ $errors -eq 0 ]; then
    echo -e "${GREEN}🎉 MIGRACIÓN FASE 2 EXITOSA${NC}"
    echo ""
    echo -e "${GREEN}✅ Todos los componentes migrados${NC}"
    echo -e "${GREEN}✅ ScrollReveal implementado${NC}"
    echo -e "${GREEN}✅ TypeScript sin errores${NC}"
    echo -e "${GREEN}✅ Build exitoso${NC}"
    
    if [ $warnings -gt 0 ]; then
        echo ""
        echo -e "${YELLOW}⚠️  $warnings warnings encontrados (hooks deprecados)${NC}"
        echo -e "${YELLOW}   Esto es normal durante la transición${NC}"
    fi
    
    echo ""
    echo -e "${BLUE}🧪 TESTING MANUAL RECOMENDADO:${NC}"
    echo "=============================="
    echo "1. Ejecutar: npm run dev"
    echo "2. Abrir: http://localhost:8080"
    echo "3. Hacer scroll por toda la página"
    echo "4. Verificar animaciones suaves"
    echo "5. Abrir Chrome DevTools > Performance"
    echo "6. Verificar 60 FPS durante scroll"
    echo ""
    echo -e "${GREEN}🚀 SIGUIENTE PASO: Fase 3 (Limpieza Final)${NC}"
    
else
    echo -e "${RED}❌ ERRORES ENCONTRADOS: $errors${NC}"
    echo ""
    echo -e "${YELLOW}🔧 ACCIONES REQUERIDAS:${NC}"
    echo "1. Revisar errores de TypeScript"
    echo "2. Verificar imports de ScrollReveal"
    echo "3. Verificar sintaxis de componentes"
    echo "4. Ejecutar este script nuevamente"
    echo ""
    echo -e "${BLUE}📞 AYUDA:${NC}"
    echo "Si hay problemas, restaurar desde backup:"
    echo "cp backups/phase2/[COMPONENT].backup [PATH_ORIGINAL]"
fi

echo ""
echo -e "${BLUE}📈 MÉTRICAS DE PERFORMANCE ESPERADAS:${NC}"
echo "======================================"
echo "ANTES (Fase 1):"
echo "├── FPS durante scroll: 15-30 fps"
echo "├── Time to Interactive: ~3.2s" 
echo "├── Animaciones: Laggy"
echo "└── Warnings: Muchos"
echo ""
echo "DESPUÉS (Fase 2):"
echo "├── FPS durante scroll: 60 fps ⚡"
echo "├── Time to Interactive: ~1.9s ⚡"
echo "├── Animaciones: Suaves estilo Apple ✨"
echo "└── Warnings: Solo deprecation (temporal) ⚠️"

exit $errors
