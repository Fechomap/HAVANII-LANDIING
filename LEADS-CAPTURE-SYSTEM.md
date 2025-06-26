# 🚀 Sistema de Captura y Seguimiento de Leads - Havani

## 📋 Resumen Ejecutivo

**Objetivo:** Implementar un sistema completo de captura, almacenamiento y seguimiento de leads para el formulario de contacto de Havani, optimizado para la infraestructura Vercel + Vite + React.

**Estado Actual:** Formulario frontend funcional sin backend (simulación con `setTimeout` en línea 95 de `FinalCTASection.tsx`)

**Solución:** Stack moderno serverless con integración nativa a Vercel

---

## 🏗️ Arquitectura Técnica Recomendada

### **Stack Principal**
- **Frontend:** Vite + React + TypeScript (existente)
- **Backend:** Vercel Serverless Functions
- **Base de Datos:** Supabase (PostgreSQL managed)
- **Email:** Resend (by Vercel team)
- **CRM:** Supabase Dashboard + Panel Admin custom
- **Seguridad:** Turnstile (CloudFlare) + Rate Limiting
- **Deploy:** Vercel (existente)

### **Ventajas de esta Arquitectura**
✅ **Cero configuración** - Integración nativa con Vercel  
✅ **Auto-escalable** - Serverless functions bajo demanda  
✅ **Costo-efectivo** - Pago por uso real  
✅ **Mantenimiento mínimo** - Servicios completamente managed  
✅ **Time-to-market rápido** - 2-3 semanas de implementación  

---

## 💾 Estructura de Base de Datos

### **Tabla Principal: `leads`**
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Información del contacto
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(100),
  
  -- Metadata de seguimiento
  source VARCHAR(50) DEFAULT 'landing_form',
  utm_source VARCHAR(50),
  utm_medium VARCHAR(50),
  utm_campaign VARCHAR(50),
  page_url TEXT,
  referrer TEXT,
  
  -- Estado y gestión
  status VARCHAR(20) DEFAULT 'new', -- new, contacted, qualified, converted, lost
  priority VARCHAR(10) DEFAULT 'medium', -- low, medium, high
  assigned_to VARCHAR(100),
  
  -- Productos de interés
  products_interest TEXT[], -- ['neural-crane', 'automike', 'custom-dev']
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  contacted_at TIMESTAMPTZ,
  
  -- Compliance y seguridad
  gdpr_consent BOOLEAN DEFAULT true,
  ip_address INET,
  user_agent TEXT
);

-- Índices para rendimiento
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at);
```

### **Tabla de Interacciones: `lead_interactions`**
```sql
CREATE TABLE lead_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- email, call, meeting, note
  content TEXT,
  created_by VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_lead_interactions_lead_id ON lead_interactions(lead_id);
```

---

## ⚡ Implementación Técnica

### **1. API Endpoint (`/api/leads.ts`)**

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { z } from 'zod';

// Validación de esquema
const LeadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
  products_interest: z.array(z.string()).optional(),
  utm_params: z.object({
    source: z.string().optional(),
    medium: z.string().optional(),
    campaign: z.string().optional(),
  }).optional()
});

// Cliente Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Cliente Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Cors headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validación de datos
    const validatedData = LeadSchema.parse(req.body);
    
    // Rate limiting check
    await checkRateLimit(req);
    
    // Preparar datos para inserción
    const leadData = {
      ...validatedData,
      ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      user_agent: req.headers['user-agent'],
      page_url: req.headers.referer || 'direct',
      source: 'landing_form'
    };
    
    // Guardar en Supabase
    const { data: lead, error } = await supabase
      .from('leads')
      .insert([leadData])
      .select()
      .single();

    if (error) throw error;
    
    // Enviar emails en paralelo
    await Promise.all([
      sendConfirmationEmail(lead),
      sendNotificationToTeam(lead)
    ]);
    
    // Log para analytics
    console.log(`New lead captured: ${lead.email}`);
    
    res.status(200).json({ 
      success: true, 
      message: 'Lead capturado exitosamente',
      id: lead.id 
    });
    
  } catch (error) {
    console.error('Error processing lead:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Datos inválidos', 
        details: error.errors 
      });
    }
    
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Función de rate limiting
async function checkRateLimit(req: VercelRequest) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  // Implementar con Redis/Upstash o memoria simple
  // Máximo 5 envíos por IP por hora
}

// Email de confirmación al usuario
async function sendConfirmationEmail(lead: any) {
  try {
    await resend.emails.send({
      from: 'noreply@havani.dev',
      to: lead.email,
      subject: '¡Gracias por contactarnos! - Havani',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7B61FF;">¡Hola ${lead.name}!</h2>
          <p>Gracias por contactarnos. Hemos recibido tu mensaje:</p>
          <blockquote style="background: #f5f5f5; padding: 15px; border-left: 3px solid #7B61FF;">
            "${lead.message}"
          </blockquote>
          <p>Te contactaremos en las próximas 24 horas.</p>
          <p>Saludos,<br><strong>Equipo Havani</strong></p>
        </div>
      `
    });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

// Email de notificación al equipo
async function sendNotificationToTeam(lead: any) {
  try {
    await resend.emails.send({
      from: 'leads@havani.dev',
      to: 'equipo@havani.dev',
      subject: `🚨 Nuevo Lead: ${lead.name}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Nuevo Lead Capturado</h2>
          <ul>
            <li><strong>Nombre:</strong> ${lead.name}</li>
            <li><strong>Email:</strong> ${lead.email}</li>
            <li><strong>Mensaje:</strong> ${lead.message}</li>
            <li><strong>Origen:</strong> ${lead.page_url}</li>
            <li><strong>Fecha:</strong> ${new Date().toLocaleString()}</li>
          </ul>
          <p><a href="${process.env.VERCEL_URL}/admin/leads/${lead.id}">Ver en Dashboard</a></p>
        </div>
      `
    });
  } catch (error) {
    console.error('Error sending team notification:', error);
  }
}
```

### **2. Modificación del Frontend (`FinalCTASection.tsx`)**

Reemplazar la simulación actual (líneas 92-102) con:

```typescript
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  // Validaciones existentes (mantener)
  let newErr: typeof errors = {};
  if (!fields.name.trim()) newErr.name = "Por favor ingresa tu nombre.";
  if (!fields.email.trim() || !validateEmail(fields.email)) newErr.email = "Ingresa un correo válido.";
  if (!fields.message.trim()) newErr.message = "Describe brevemente tu necesidad.";
  setErrors(newErr);

  if (Object.keys(newErr).length) {
    const firstErrKey = Object.keys(newErr)[0];
    const el = formRef.current?.querySelector(`[name='${firstErrKey}']`);
    if (el && "scrollIntoView" in el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  setLoading(true);
  
  try {
    // Detectar productos de interés basado en la página actual
    const detectProductsInterest = () => {
      const path = window.location.pathname;
      if (path.includes('neural-crane')) return ['neural-crane'];
      if (path.includes('automike')) return ['automike'];
      if (path.includes('telegram-bot')) return ['telegram-bot'];
      return ['custom-development'];
    };

    // Obtener parámetros UTM
    const getUTMParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return {
        source: urlParams.get('utm_source') || undefined,
        medium: urlParams.get('utm_medium') || undefined,
        campaign: urlParams.get('utm_campaign') || undefined,
      };
    };

    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        ...fields,
        products_interest: detectProductsInterest(),
        utm_params: getUTMParams(),
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error en el envío');
    }
    
    const result = await response.json();
    
    setLoading(false);
    setSuccess(true);
    
    // Limpiar formulario
    setFields({ name: "", email: "", message: "" });
    
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'lead_generated', {
        event_category: 'engagement',
        event_label: 'contact_form',
        value: 1
      });
    }
    
  } catch (error) {
    console.error('Error submitting form:', error);
    setLoading(false);
    setErrors({ 
      submit: error instanceof Error ? error.message : 'Error al enviar. Intenta nuevamente.' 
    });
  }
};
```

### **3. Panel de Administración (`/src/pages/Admin.tsx`)**

```typescript
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
  products_interest: string[];
}

const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: '30d'
  });

  useEffect(() => {
    fetchLeads();
  }, [filters]);

  const fetchLeads = async () => {
    try {
      let query = supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      if (filters.dateRange !== 'all') {
        const days = parseInt(filters.dateRange.replace('d', ''));
        const date = new Date();
        date.setDate(date.getDate() - days);
        query = query.gte('created_at', date.toISOString());
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', leadId);

      if (error) throw error;
      
      // Actualizar estado local
      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  if (loading) {
    return <div className="p-8">Cargando leads...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard de Leads</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Leads" 
          value={leads.length} 
          color="blue" 
        />
        <StatsCard 
          title="Nuevos" 
          value={leads.filter(l => l.status === 'new').length} 
          color="green" 
        />
        <StatsCard 
          title="En Proceso" 
          value={leads.filter(l => l.status === 'contacted').length} 
          color="yellow" 
        />
        <StatsCard 
          title="Convertidos" 
          value={leads.filter(l => l.status === 'converted').length} 
          color="purple" 
        />
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <select 
          value={filters.status}
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">Todos los estados</option>
          <option value="new">Nuevos</option>
          <option value="contacted">Contactados</option>
          <option value="qualified">Calificados</option>
          <option value="converted">Convertidos</option>
          <option value="lost">Perdidos</option>
        </select>

        <select
          value={filters.dateRange}
          onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="7d">Últimos 7 días</option>
          <option value="30d">Últimos 30 días</option>
          <option value="90d">Últimos 90 días</option>
          <option value="all">Todo el tiempo</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mensaje
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                    <div className="text-sm text-gray-500">{lead.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    {lead.message}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                    className="text-indigo-600 hover:text-indigo-900 border rounded px-2 py-1"
                  >
                    <option value="new">Nuevo</option>
                    <option value="contacted">Contactado</option>
                    <option value="qualified">Calificado</option>
                    <option value="converted">Convertido</option>
                    <option value="lost">Perdido</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componentes auxiliares
const StatsCard = ({ title, value, color }: { title: string; value: number; color: string }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="text-sm font-medium text-gray-500">{title}</div>
    <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const colors = {
    new: 'bg-green-100 text-green-800',
    contacted: 'bg-blue-100 text-blue-800',
    qualified: 'bg-yellow-100 text-yellow-800',
    converted: 'bg-purple-100 text-purple-800',
    lost: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

export default AdminDashboard;
```

---

## 📦 Variables de Entorno

Crear archivo `.env.local`:

```bash
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend
RESEND_API_KEY=re_xxxxx

# Turnstile (CloudFlare)
TURNSTILE_SECRET_KEY=your_turnstile_secret

# Admin Auth (simple)
ADMIN_PASSWORD=your_secure_admin_password
```

Para Vite frontend (`.env`):

```bash
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_TURNSTILE_SITE_KEY=your_turnstile_site_key
```

---

## 📊 Análisis de Costos

### **Plan Inicial (hasta 1K leads/mes)**
- **Vercel Hobby:** Gratis
- **Supabase Free:** Gratis (hasta 500MB)
- **Resend Free:** Gratis (hasta 3K emails/mes)
- **Turnstile:** Gratis
- **Total:** **$0/mes**

### **Plan Crecimiento (hasta 10K leads/mes)**
- **Vercel Pro:** $20/mes
- **Supabase Pro:** $25/mes
- **Resend Pro:** $20/mes (hasta 50K emails)
- **Turnstile:** Gratis
- **Total:** **$65/mes**

### **Plan Empresarial (50K+ leads/mes)**
- **Vercel Team:** $50/mes
- **Supabase Pro+:** $60/mes
- **Resend Business:** $85/mes
- **Total:** **$195/mes**

---

## 🚀 Plan de Implementación

### **Fase 1: MVP (Semana 1-2)**
- [ ] Configurar Supabase y crear tablas
- [ ] Implementar API endpoint básico
- [ ] Modificar formulario frontend
- [ ] Configurar Resend para emails
- [ ] Testing básico

### **Fase 2: Producción (Semana 3)**
- [ ] Implementar rate limiting y seguridad
- [ ] Crear dashboard admin básico
- [ ] Configurar monitoreo y logs
- [ ] Testing exhaustivo
- [ ] Deploy a producción

### **Fase 3: Optimización (Semana 4)**
- [ ] Analytics avanzado
- [ ] Automaciones de email
- [ ] Integración CRM externa (opcional)
- [ ] Dashboard avanzado con métricas
- [ ] Optimizaciones de rendimiento

---

## 🔧 Comandos de Instalación

```bash
# Dependencias del proyecto
npm install @supabase/supabase-js resend zod

# Dependencias de desarrollo
npm install -D @types/node

# Para Vercel CLI (opcional)
npm install -g vercel
```

---

## 📝 Checklist de Implementación

### **Backend**
- [ ] Crear proyecto en Supabase
- [ ] Configurar tablas de base de datos
- [ ] Implementar `/api/leads.ts`
- [ ] Configurar Resend para emails
- [ ] Implementar rate limiting
- [ ] Testing de endpoints

### **Frontend**
- [ ] Modificar `FinalCTASection.tsx`
- [ ] Agregar detección de productos
- [ ] Implementar tracking UTM
- [ ] Manejar estados de error
- [ ] Testing de formulario

### **Admin Panel**
- [ ] Crear `/src/pages/Admin.tsx`
- [ ] Implementar dashboard de stats
- [ ] Crear tabla de leads
- [ ] Agregar filtros y búsqueda
- [ ] Sistema de cambio de estados

### **Deploy & Config**
- [ ] Configurar variables de entorno
- [ ] Deploy a Vercel
- [ ] Configurar dominio personalizado
- [ ] Testing en producción
- [ ] Monitoreo y logs

---

## 🎯 Criterios de Éxito

1. **Funcionalidad:** Formulario captura leads exitosamente
2. **Notificaciones:** Emails automáticos funcionando
3. **Dashboard:** Admin puede gestionar leads
4. **Rendimiento:** < 2s respuesta API
5. **Escalabilidad:** Maneja 1K+ leads/mes sin problemas
6. **Seguridad:** Rate limiting y validación implementados

---

## 📞 Siguiente Paso

Una vez creado este documento, el siguiente paso es:

1. **Crear proyecto Supabase** y obtener credenciales
2. **Configurar Resend** para envío de emails
3. **Implementar API endpoint** como primer entregable
4. **Modificar formulario frontend** para integración real
5. **Testing y validación** del flujo completo

**¿Estás listo para comenzar la implementación?**