// Función para probar el sistema de leads localmente
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const testLeadSubmission = async (leadData: {
  name: string;
  email: string;
  message: string;
  products_interest?: string[];
}) => {
  try {
    console.log('🧪 Probando envío de lead...', leadData);
    
    // Datos completos para insertar
    const fullLeadData = {
      name: leadData.name,
      email: leadData.email,
      message: leadData.message,
      products_interest: leadData.products_interest || ['custom-development'],
      source: 'landing_form',
      status: 'new',
      priority: 'medium',
      gdpr_consent: true,
      page_url: window.location.href,
      ip_address: '127.0.0.1', // localhost
      user_agent: navigator.userAgent
    };

    // Insertar en Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([fullLeadData])
      .select()
      .single();

    if (error) {
      console.error('❌ Error insertando lead:', error);
      throw error;
    }

    console.log('✅ Lead insertado exitosamente:', data);
    
    // Simular envío de emails (en desarrollo no se envían realmente)
    console.log('📧 Simulando envío de emails...');
    console.log(`📧 Email de confirmación a: ${leadData.email}`);
    console.log('📧 Email de notificación al equipo: equipo@havani.dev');
    
    return {
      success: true,
      message: 'Lead capturado exitosamente (modo desarrollo)',
      id: data.id,
      data: data
    };
    
  } catch (error) {
    console.error('❌ Error en testLeadSubmission:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
};

export const getAllLeads = async () => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    console.log('📊 Leads en la base de datos:', data);
    return data;
  } catch (error) {
    console.error('❌ Error obteniendo leads:', error);
    return [];
  }
};