import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  Filter, 
  Download, 
  RefreshCw,
  TrendingUp,
  Eye,
  MessageSquare
} from 'lucide-react';

// Cliente Supabase
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  phone?: string;
  status: string;
  priority: string;
  products_interest: string[];
  source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  created_at: string;
  updated_at: string;
  page_url?: string;
}

interface Stats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
  lost: number;
}

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
    lost: 0
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: '30d',
    priority: 'all',
    product: 'all'
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Password simple - cambiar por uno más seguro
    if (password === 'Alpinista1916') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Contraseña incorrecta');
    }
  };

  const statusLabels = {
    new: 'Nuevo',
    contacted: 'Contactado',
    qualified: 'Calificado',
    converted: 'Convertido',
    lost: 'Perdido'
  };

  const priorityLabels = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta'
  };

  const productLabels = {
    'neural-crane': 'Neural Crane',
    'automike': 'AutoMike',
    'telegram-bot': 'Telegram Bot',
    'texml-bot': 'TeXML Bot',
    'conciliador': 'Conciliador',
    'facturapi': 'FacturAPI',
    'custom-development': 'Desarrollo Personalizado'
  };

  useEffect(() => {
    fetchLeads();
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchLeads = async () => {
    try {
      setRefreshing(true);
      let query = supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      // Aplicar filtros
      if (filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      if (filters.priority !== 'all') {
        query = query.eq('priority', filters.priority);
      }

      if (filters.dateRange !== 'all') {
        const days = parseInt(filters.dateRange.replace('d', ''));
        const date = new Date();
        date.setDate(date.getDate() - days);
        query = query.gte('created_at', date.toISOString());
      }

      if (filters.product !== 'all') {
        query = query.contains('products_interest', [filters.product]);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      const leadsData = data || [];
      setLeads(leadsData);
      
      // Calcular estadísticas
      const statsData = leadsData.reduce((acc, lead) => {
        acc.total++;
        acc[lead.status as keyof Stats]++;
        return acc;
      }, {
        total: 0,
        new: 0,
        contacted: 0,
        qualified: 0,
        converted: 0,
        lost: 0
      });
      
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ 
          status: newStatus, 
          updated_at: new Date().toISOString(),
          contacted_at: newStatus === 'contacted' ? new Date().toISOString() : undefined
        })
        .eq('id', leadId);

      if (error) throw error;
      
      // Actualizar estado local
      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));
      
      // Recalcular estadísticas
      fetchLeads();
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Nombre', 'Email', 'Mensaje', 'Estado', 'Productos', 'Fuente', 'Fecha'];
    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        `"${lead.name}"`,
        `"${lead.email}"`,
        `"${lead.message.replace(/"/g, '""')}"`,
        `"${statusLabels[lead.status as keyof typeof statusLabels] || lead.status}"`,
        `"${lead.products_interest?.map(p => productLabels[p as keyof typeof productLabels] || p).join(', ') || 'N/A'}"`,
        `"${lead.source}"`,
        `"${new Date(lead.created_at).toLocaleDateString('es-ES')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads-havani-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Pantalla de autenticación
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09090C] flex items-center justify-center">
        <div className="bg-[#15161B] border border-white/10 rounded-lg p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Dashboard Admin</h1>
            <p className="text-[#BBBBBB]">Acceso restringido - Havani Technologies</p>
          </div>
          
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#BBBBBB] mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#09090C] border border-white/10 rounded-lg text-white placeholder:text-[#7A7A7A] focus:border-[#7B61FF] focus:ring-2 focus:ring-[#7B61FF]/40 transition outline-none"
                placeholder="Ingresa la contraseña"
                required
              />
            </div>
            
            {authError && (
              <div className="text-red-400 text-sm text-center">
                {authError}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-[#7B61FF] hover:bg-[#6B4FE8] text-white font-medium py-3 rounded-lg transition"
            >
              Acceder
            </button>
          </form>
          
          <div className="mt-6 text-center text-xs text-[#7A7A7A]">
            Solo personal autorizado de Havani Technologies
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090C] flex items-center justify-center">
        <div className="text-white text-xl">Cargando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090C] text-white">
      {/* Header */}
      <div className="bg-[#15161B] border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard de Leads</h1>
            <p className="text-[#BBBBBB]">Panel de administración - Havani</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchLeads}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-[#7B61FF] hover:bg-[#6B4FE8] transition rounded-lg disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 transition rounded-lg"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 transition rounded-lg"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <StatsCard 
            icon={<Users className="w-5 h-5" />}
            title="Total" 
            value={stats.total} 
            color="blue" 
          />
          <StatsCard 
            icon={<TrendingUp className="w-5 h-5" />}
            title="Nuevos" 
            value={stats.new} 
            color="green" 
          />
          <StatsCard 
            icon={<Phone className="w-5 h-5" />}
            title="Contactados" 
            value={stats.contacted} 
            color="yellow" 
          />
          <StatsCard 
            icon={<MessageSquare className="w-5 h-5" />}
            title="Calificados" 
            value={stats.qualified} 
            color="orange" 
          />
          <StatsCard 
            icon={<TrendingUp className="w-5 h-5" />}
            title="Convertidos" 
            value={stats.converted} 
            color="purple" 
          />
          <StatsCard 
            icon={<Eye className="w-5 h-5" />}
            title="Perdidos" 
            value={stats.lost} 
            color="red" 
          />
        </div>

        {/* Filters */}
        <div className="bg-[#15161B] rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#7B61FF]" />
            <h3 className="text-lg font-semibold">Filtros</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select 
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="px-4 py-2 bg-[#09090C] border border-white/10 rounded-lg text-white"
            >
              <option value="all">Todos los estados</option>
              {Object.entries(statusLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>

            <select
              value={filters.dateRange}
              onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
              className="px-4 py-2 bg-[#09090C] border border-white/10 rounded-lg text-white"
            >
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
              <option value="90d">Últimos 90 días</option>
              <option value="all">Todo el tiempo</option>
            </select>

            <select
              value={filters.priority}
              onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
              className="px-4 py-2 bg-[#09090C] border border-white/10 rounded-lg text-white"
            >
              <option value="all">Todas las prioridades</option>
              {Object.entries(priorityLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>

            <select
              value={filters.product}
              onChange={(e) => setFilters(prev => ({ ...prev, product: e.target.value }))}
              className="px-4 py-2 bg-[#09090C] border border-white/10 rounded-lg text-white"
            >
              <option value="all">Todos los productos</option>
              {Object.entries(productLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-[#15161B] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#09090C] border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#BBBBBB]">
                    Contacto
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#BBBBBB]">
                    Mensaje
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#BBBBBB]">
                    Productos
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#BBBBBB]">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#BBBBBB]">
                    Fecha
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#BBBBBB]">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {leads.map((lead) => (
                  <motion.tr 
                    key={lead.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-white">{lead.name}</div>
                        <div className="text-sm text-[#BBBBBB] flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="text-sm text-[#BBBBBB] flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {lead.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white max-w-xs">
                        <p className="line-clamp-2">{lead.message}</p>
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="text-[#7B61FF] hover:text-[#6B4FE8] text-xs mt-1"
                        >
                          Ver completo
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {lead.products_interest?.map((product, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-[#7B61FF]/20 text-[#7B61FF] text-xs rounded-full"
                          >
                            {productLabels[product as keyof typeof productLabels] || product}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#BBBBBB] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(lead.created_at).toLocaleDateString('es-ES')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className="text-sm bg-[#09090C] border border-white/10 rounded px-2 py-1 text-white hover:border-[#7B61FF] transition"
                      >
                        {Object.entries(statusLabels).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {leads.length === 0 && (
            <div className="text-center py-12 text-[#BBBBBB]">
              No se encontraron leads con los filtros aplicados.
            </div>
          )}
        </div>
      </div>

      {/* Modal para ver mensaje completo */}
      {selectedLead && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedLead(null)}
        >
          <motion.div 
            className="bg-[#15161B] rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Mensaje completo de {selectedLead.name}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#BBBBBB]">Email:</label>
                <p className="text-white">{selectedLead.email}</p>
              </div>
              <div>
                <label className="text-sm text-[#BBBBBB]">Mensaje:</label>
                <p className="text-white bg-[#09090C] p-4 rounded-lg mt-1">
                  {selectedLead.message}
                </p>
              </div>
              {selectedLead.utm_source && (
                <div>
                  <label className="text-sm text-[#BBBBBB]">UTM Source:</label>
                  <p className="text-white">{selectedLead.utm_source}</p>
                </div>
              )}
              {selectedLead.page_url && (
                <div>
                  <label className="text-sm text-[#BBBBBB]">Página de origen:</label>
                  <p className="text-white text-sm break-all">{selectedLead.page_url}</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSelectedLead(null)}
              className="mt-6 px-4 py-2 bg-[#7B61FF] hover:bg-[#6B4FE8] transition rounded-lg"
            >
              Cerrar
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Componentes auxiliares
const StatsCard = ({ 
  icon, 
  title, 
  value, 
  color 
}: { 
  icon: React.ReactNode;
  title: string; 
  value: number; 
  color: string;
}) => (
  <motion.div 
    className="bg-[#15161B] border border-white/10 p-4 rounded-lg"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg bg-${color}-500/20 text-${color}-400`}>
        {icon}
      </div>
      <div>
        <div className="text-sm text-[#BBBBBB]">{title}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
      </div>
    </div>
  </motion.div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const colors = {
    new: 'bg-green-500/20 text-green-400 border-green-500/30',
    contacted: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    qualified: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    converted: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    lost: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  const statusLabels = {
    new: 'Nuevo',
    contacted: 'Contactado',
    qualified: 'Calificado',
    converted: 'Convertido',
    lost: 'Perdido'
  };

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
      {statusLabels[status as keyof typeof statusLabels] || status}
    </span>
  );
};

export default AdminDashboard;