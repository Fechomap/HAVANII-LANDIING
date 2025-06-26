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
  // CORS headers
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
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
      products_interest: validatedData.products_interest || ['custom-development'],
      utm_source: validatedData.utm_params?.source,
      utm_medium: validatedData.utm_params?.medium,
      utm_campaign: validatedData.utm_params?.campaign,
      ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      user_agent: req.headers['user-agent'],
      page_url: req.headers.referer || 'direct',
      source: 'landing_form',
      status: 'new',
      priority: 'medium',
      gdpr_consent: true
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

// Rate limiting simple en memoria (para producción usar Redis/Upstash)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

async function checkRateLimit(req: VercelRequest) {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hora
  const maxRequests = 5;
  
  const current = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };
  
  if (now > current.resetTime) {
    current.count = 1;
    current.resetTime = now + windowMs;
  } else {
    current.count++;
  }
  
  rateLimitMap.set(ip, current);
  
  if (current.count > maxRequests) {
    throw new Error('Too many requests. Please try again later.');
  }
}

// Email de confirmación al usuario
async function sendConfirmationEmail(lead: {
  name: string;
  email: string;
  message: string;
  id: string;
}) {
  try {
    await resend.emails.send({
      from: 'noreply@havani.dev',
      to: lead.email,
      subject: '¡Gracias por contactarnos! - Havani',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7B61FF;">¡Hola ${lead.name}!</h2>
          <p>Gracias por contactarnos. Hemos recibido tu mensaje:</p>
          <blockquote style="background: #f5f5f5; padding: 15px; border-left: 3px solid #7B61FF; margin: 15px 0;">
            "${lead.message}"
          </blockquote>
          <p>Te contactaremos en las próximas 24 horas.</p>
          <p>Saludos,<br><strong>Equipo Havani</strong></p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #888;">
            Este email fue enviado automáticamente. No responder a esta dirección.
          </p>
        </div>
      `
    });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

// Email de notificación al equipo
async function sendNotificationToTeam(lead: {
  name: string;
  email: string;
  message: string;
  id: string;
  products_interest?: string[];
  page_url?: string;
  created_at: string;
}) {
  try {
    await resend.emails.send({
      from: 'leads@havani.dev',
      to: 'equipo@havani.dev',
      subject: `🚨 Nuevo Lead: ${lead.name}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Nuevo Lead Capturado</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Nombre</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${lead.email}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Mensaje</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${lead.message}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Productos de Interés</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${lead.products_interest?.join(', ') || 'No especificado'}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Origen</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${lead.page_url}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Fecha</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${new Date(lead.created_at).toLocaleString('es-ES')}</td>
            </tr>
          </table>
          <p style="margin-top: 20px;">
            <a href="${process.env.VERCEL_URL || 'https://havani.dev'}/admin/leads/${lead.id}" 
               style="background: #7B61FF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
               Ver en Dashboard
            </a>
          </p>
        </div>
      `
    });
  } catch (error) {
    console.error('Error sending team notification:', error);
  }
}