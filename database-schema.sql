-- ========================================
-- ESQUEMA DE BASE DE DATOS - SISTEMA DE LEADS HAVANI
-- ========================================
-- Este archivo contiene las tablas y configuración necesaria
-- para el sistema de captura y seguimiento de leads

-- Tabla principal de leads
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
CREATE INDEX idx_leads_priority ON leads(priority);
CREATE INDEX idx_leads_source ON leads(source);

-- Tabla de interacciones con leads
CREATE TABLE lead_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- email, call, meeting, note
  content TEXT,
  created_by VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_lead_interactions_lead_id ON lead_interactions(lead_id);
CREATE INDEX idx_lead_interactions_created_at ON lead_interactions(created_at);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at en leads
CREATE TRIGGER update_leads_updated_at 
    BEFORE UPDATE ON leads 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- CONFIGURACIÓN DE SEGURIDAD (RLS)
-- ========================================

-- Habilitar Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_interactions ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserción desde la API pública
CREATE POLICY "Allow public insert" ON leads
    FOR INSERT WITH CHECK (true);

-- Política para permitir lectura solo a usuarios autenticados (admin)
CREATE POLICY "Allow authenticated read" ON leads
    FOR SELECT USING (auth.role() = 'authenticated');

-- Política para permitir actualización solo a usuarios autenticados
CREATE POLICY "Allow authenticated update" ON leads
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Políticas similares para lead_interactions
CREATE POLICY "Allow authenticated all" ON lead_interactions
    FOR ALL USING (auth.role() = 'authenticated');

-- ========================================
-- DATOS DE EJEMPLO (OPCIONAL)
-- ========================================

-- Insertar algunos leads de ejemplo para testing
INSERT INTO leads (name, email, message, products_interest, source, status) VALUES
('Juan Pérez', 'juan@ejemplo.com', 'Necesito automatizar mi proceso de facturación', ARRAY['facturapi'], 'landing_form', 'new'),
('María González', 'maria@empresa.com', 'Estoy interesada en el bot de Telegram para atención al cliente', ARRAY['telegram-bot'], 'landing_form', 'contacted'),
('Carlos Rodríguez', 'carlos@startup.com', 'Quiero implementar IA en mi grúa', ARRAY['neural-crane'], 'landing_form', 'qualified');

-- ========================================
-- VISTAS ÚTILES PARA REPORTES
-- ========================================

-- Vista con estadísticas de leads por estado
CREATE VIEW leads_stats AS
SELECT 
    status,
    COUNT(*) as count,
    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() as percentage
FROM leads 
GROUP BY status;

-- Vista con leads recientes (últimos 30 días)
CREATE VIEW recent_leads AS
SELECT * FROM leads 
WHERE created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- Vista con conversion rate por producto
CREATE VIEW product_conversion AS
SELECT 
    UNNEST(products_interest) as product,
    COUNT(*) as total_leads,
    COUNT(CASE WHEN status = 'converted' THEN 1 END) as converted,
    ROUND(
        COUNT(CASE WHEN status = 'converted' THEN 1 END) * 100.0 / COUNT(*), 2
    ) as conversion_rate
FROM leads 
GROUP BY UNNEST(products_interest);

-- ========================================
-- INSTRUCCIONES DE USO
-- ========================================

/*
1. Ejecutar este script en Supabase SQL Editor
2. Configurar las variables de entorno:
   - SUPABASE_URL: URL de tu proyecto Supabase
   - SUPABASE_ANON_KEY: Clave anónima para inserts públicos
   - SUPABASE_SERVICE_ROLE_KEY: Clave de servicio para admin

3. Para desarrollo local, puedes deshabilitar RLS temporalmente:
   ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
   
4. Para producción, crear un usuario de API con permisos limitados
*/