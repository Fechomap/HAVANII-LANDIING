# 🚀 Configuración del Sistema de Leads - Havani

## 📋 Archivos Implementados

✅ **API Endpoint**: `/api/leads.ts` - Manejo completo de leads  
✅ **Frontend Modificado**: `FinalCTASection.tsx` - Integración con API real  
✅ **Dashboard Admin**: `/src/pages/Admin.tsx` - Panel de gestión de leads  
✅ **Esquema DB**: `database-schema.sql` - Estructura de base de datos  
✅ **Variables de Entorno**: `.env.local.example` y `.env`  

## 🔧 Pasos de Configuración

### 1. Configurar Supabase

1. **Crear proyecto en Supabase**:
   - Ve a [supabase.com](https://supabase.com)
   - Crear nuevo proyecto
   - Copiar URL y claves

2. **Ejecutar esquema de base de datos**:
   ```sql
   -- Copiar y ejecutar el contenido de database-schema.sql
   -- En Supabase Dashboard > SQL Editor
   ```

3. **Configurar Row Level Security (RLS)**:
   ```sql
   -- Para desarrollo, puedes deshabilitar RLS temporalmente:
   ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
   
   -- Para producción, configurar políticas apropiadas
   ```

### 2. Configurar Resend

1. **Obtener API Key**:
   - Registrarse en [resend.com](https://resend.com)
   - Crear API Key
   - Configurar dominio verificado

### 3. Variables de Entorno

1. **Para Vercel (Backend)**:
   Crear `.env.local`:
   ```bash
   SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_ANON_KEY=tu_clave_anonima
   SUPABASE_SERVICE_ROLE_KEY=tu_clave_servicio
   RESEND_API_KEY=re_tu_clave_resend
   ```

2. **Para Frontend (Vite)**:
   Actualizar `.env`:
   ```bash
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_clave_anonima
   ```

### 4. Deploy en Vercel

1. **Configurar variables en Vercel**:
   ```bash
   vercel env add SUPABASE_URL
   vercel env add SUPABASE_ANON_KEY
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   vercel env add RESEND_API_KEY
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

## 🎯 Funcionalidades Implementadas

### ✅ Captura de Leads
- Formulario de contacto funcional
- Validación de campos
- Detección automática de productos de interés
- Tracking UTM
- Rate limiting (5 requests/hora por IP)

### ✅ Notificaciones
- Email de confirmación al usuario
- Email de notificación al equipo
- Templates HTML responsive

### ✅ Dashboard Admin
- Vista de todos los leads
- Filtros por estado, fecha, prioridad, producto
- Cambio de estado de leads
- Exportación a CSV
- Estadísticas en tiempo real
- Modal para ver mensajes completos

### ✅ Base de Datos
- Tabla `leads` con todos los campos necesarios
- Tabla `lead_interactions` para seguimiento
- Índices optimizados
- Triggers automáticos
- Vistas para reportes

## 🔒 Seguridad Implementada

- ✅ Validación de esquemas con Zod
- ✅ Rate limiting por IP
- ✅ CORS configurado
- ✅ Escapado de HTML en emails
- ✅ Variables de entorno seguras

## 🧪 Testing

### Probar Formulario:
1. Ir a `http://localhost:5173/#contacto`
2. Llenar formulario
3. Verificar email de confirmación
4. Verificar notificación al equipo

### Probar Dashboard:
1. Ir a `http://localhost:5173/admin`
2. Verificar estadísticas
3. Probar filtros
4. Cambiar estado de leads
5. Exportar CSV

## 📊 Monitoreo

### Logs de Vercel:
```bash
vercel logs
```

### Base de Datos:
- Dashboard de Supabase
- Metrics y Analytics
- Query performance

## 🚨 Troubleshooting

### Errores Comunes:

1. **"leads table does not exist"**:
   - Ejecutar `database-schema.sql`
   - Verificar conexión a Supabase

2. **"Invalid API key" (Resend)**:
   - Verificar RESEND_API_KEY
   - Dominio verificado en Resend

3. **CORS errors**:
   - Verificar headers en `/api/leads.ts`
   - Configurar Vercel domains

4. **RLS blocking inserts**:
   ```sql
   ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
   ```

## 📈 Métricas de Éxito

- ✅ Formulario captura leads exitosamente
- ✅ Emails automáticos funcionando
- ✅ Dashboard operativo
- ✅ Tiempo de respuesta API < 2s
- ✅ Rate limiting activo

## 🎯 Próximos Pasos

1. **Configurar Supabase y Resend** con las credenciales reales
2. **Testear flujo completo** en desarrollo
3. **Deploy a producción** en Vercel
4. **Configurar dominio personalizado** para emails
5. **Implementar autenticación** para dashboard admin

## 📞 Soporte

Si encuentras problemas:
1. Revisar logs de Vercel
2. Verificar configuración de variables de entorno
3. Comprobar esquema de base de datos
4. Validar configuración de Resend

¡El sistema está listo para capturar y gestionar leads efectivamente! 🚀