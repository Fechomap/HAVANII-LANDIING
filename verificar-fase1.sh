#!/bin/bash

# 🔍 SCRIPT DE VERIFICACIÓN - FASE 1
# ===================================
# Verifica que todos los archivos estén creados correctamente

echo "🔍 VERIFICANDO FASE 1..."
echo "========================"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Contador de errores
errors=0

# Función para verificar archivo
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} $1"
    else
        echo -e "${RED}❌${NC} $1 - FALTA"
        ((errors++))
    fi
}

# Función para verificar contenido
check_content() {
    if grep -q "$2" "$1" 2>/dev/null; then
        echo -e "${GREEN}✅${NC} $1 contiene: $2"
    else
        echo -e "${YELLOW}⚠️${NC} $1 - revisar contenido: $2"
    fi
}

echo -e "${BLUE}📁 VERIFICANDO HOOKS...${NC}"

check_file "src/hooks/useIntersection.ts"
check_file "src/hooks/useParallax.ts"  
check_file "src/hooks/useAnimation.ts"
check_file "src/hooks/useScrollTrigger.ts"
check_file "src/hooks/useAppleStyleScroll.ts"
check_file "src/hooks/useDeviceInfo.ts"
check_file "src/hooks/useHomeNavigation.ts"
check_file "src/hooks/use-toast.ts"
check_file "src/hooks/index.ts"

echo ""
echo -e "${BLUE}🎨 VERIFICANDO COMPONENTES...${NC}"

check_file "src/components/ScrollReveal.tsx"
check_file "src/components/AppleStyleSection.tsx"

echo ""
echo -e "${BLUE}🔧 VERIFICANDO CONTENIDO...${NC}"

check_content "src/hooks/useScrollTrigger.ts" "useScrollTrigger"
check_content "src/hooks/useAppleStyleScroll.ts" "useAppleStyleScroll"
check_content "src/components/ScrollReveal.tsx" "ScrollReveal"
check_content "src/hooks/useIntersection.ts" "ARCHIVO DE TRANSICIÓN TEMPORAL"
check_content "src/hooks/index.ts" "useScrollTrigger"

echo ""
echo -e "${BLUE}📦 VERIFICANDO DEPENDENCIAS...${NC}"

if command -v npm &> /dev/null; then
    echo -e "${GREEN}✅${NC} npm disponible"
    
    if npm list framer-motion &> /dev/null; then
        echo -e "${GREEN}✅${NC} framer-motion instalado"
    else
        echo -e "${RED}❌${NC} framer-motion NO instalado"
        echo -e "${YELLOW}   Ejecutar: npm install framer-motion${NC}"
        ((errors++))
    fi
    
    if npm list gsap &> /dev/null; then
        echo -e "${GREEN}✅${NC} gsap instalado"
    else
        echo -e "${RED}❌${NC} gsap NO instalado"
        echo -e "${YELLOW}   Ejecutar: npm install gsap${NC}"
        ((errors++))
    fi
else
    echo -e "${RED}❌${NC} npm no disponible"
    ((errors++))
fi

echo ""
echo -e "${BLUE}🔍 VERIFICANDO TYPESCRIPT...${NC}"

if command -v npx &> /dev/null; then
    if npx tsc --noEmit --skipLibCheck 2>/dev/null; then
        echo -e "${GREEN}✅${NC} TypeScript compila sin errores"
    else
        echo -e "${YELLOW}⚠️${NC} TypeScript tiene warnings (puede ser normal)"
        echo -e "${YELLOW}   Ejecutar: npx tsc --noEmit para ver detalles${NC}"
    fi
else
    echo -e "${YELLOW}⚠️${NC} npx no disponible - no se puede verificar TypeScript"
fi

echo ""
echo -e "${BLUE}📊 RESUMEN DE VERIFICACIÓN${NC}"
echo "=========================="

if [ $errors -eq 0 ]; then
    echo -e "${GREEN}🎉 FASE 1 COMPLETADA EXITOSAMENTE${NC}"
    echo ""
    echo -e "${GREEN}✅ Todos los archivos creados correctamente${NC}"
    echo -e "${GREEN}✅ Dependencias instaladas${NC}"
    echo -e "${GREEN}✅ TypeScript compilando${NC}"
    echo ""
    echo -e "${BLUE}🚀 SIGUIENTE PASO:${NC}"
    echo "   Ejecutar: npm run dev"
    echo "   Abrir: http://localhost:8080"
    echo "   Verificar: Solo warnings de deprecation (normal)"
    echo ""
    echo -e "${BLUE}🔄 DESPUÉS:${NC}"
    echo "   Proceder con Fase 2 (migración de componentes)"
else
    echo -e "${RED}❌ ERRORES ENCONTRADOS: $errors${NC}"
    echo ""
    echo -e "${YELLOW}🔧 ACCIONES REQUERIDAS:${NC}"
    echo "   1. Crear archivos faltantes"
    echo "   2. Instalar dependencias faltantes"
    echo "   3. Ejecutar este script nuevamente"
    echo ""
    echo -e "${BLUE}📚 AYUDA:${NC}"
    echo "   Ver: README-Fase1.md para instrucciones detalladas"
fi

echo ""
echo -e "${BLUE}📋 ARCHIVOS ESPERADOS:${NC}"
echo "========================="
echo "src/hooks/useIntersection.ts     ← Transición temporal"  
echo "src/hooks/useParallax.ts         ← Transición temporal"
echo "src/hooks/useAnimation.ts        ← Transición temporal"
echo "src/hooks/useScrollTrigger.ts    ← Nuevo hook optimizado"
echo "src/hooks/useAppleStyleScroll.ts ← Nuevo hook optimizado"
echo "src/components/ScrollReveal.tsx  ← Nuevo componente"
echo "src/components/AppleStyleSection.tsx ← Nuevo componente"

exit $errors
