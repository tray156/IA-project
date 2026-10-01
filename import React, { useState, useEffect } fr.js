import React, { useState, useEffect } from 'react';
import { AlertTriangle, Thermometer, Droplets, Package, Calendar, TrendingUp, CheckCircle, XCircle } from 'lucide-react';

const DashboardLeoni = () => {
  const [bidons, setBidons] = useState([
    { 
      id: 'B001', 
      type: 'Polyol', 
      lot: 'LOT-2024-A', 
      temp: 22.5, 
      humidity: 45, 
      volume: 20, 
      expiration: 45, 
      status: 'Neuf',
      priority: 145
    },
    { 
      id: 'B002', 
      type: 'Isocyanate', 
      lot: 'LOT-2024-B', 
      temp: 27.0, 
      humidity: 55, 
      volume: 8, 
      expiration: 12, 
      status: 'Entamé',
      priority: 485
    },
    { 
      id: 'B003', 
      type: 'Polyol', 
      lot: 'LOT-2023-C', 
      temp: 23.0, 
      humidity: 48, 
      volume: 15, 
      expiration: 3, 
      status: 'Neuf',
      priority: 445
    },
    { 
      id: 'B004', 
      type: 'Isocyanate', 
      lot: 'LOT-2024-D', 
      temp: 20.0, 
      humidity: 42, 
      volume: 25, 
      expiration: 90, 
      status: 'Neuf',
      priority: 101
    },
  ]);

  const [alertes, setAlertes] = useState([
    { type: 'TEMPERATURE_HORS_LIMITE', bidon: 'B002', severite: 'CRITIQUE', valeur: '27°C' },
    { type: 'HUMIDITE_EXCESSIVE', bidon: 'B002', severite: 'HAUTE', valeur: '55%' },
    { type: 'EXPIRATION_PROCHE', bidon: 'B003', severite: 'HAUTE', jours: 3 },
    { type: 'EXPIRATION_PROCHE', bidon: 'B002', severite: 'MOYENNE', jours: 12 },
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Neuf': return 'bg-green-100 text-green-800';
      case 'Entamé': return 'bg-yellow-100 text-yellow-800';
      case 'Périmé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    if (priority > 400) return 'text-red-600 font-bold';
    if (priority > 200) return 'text-orange-600 font-semibold';
    return 'text-green-600';
  };

  const getSeveriteColor = (severite) => {
    switch(severite) {
      case 'CRITIQUE': return 'bg-red-600';
      case 'HAUTE': return 'bg-orange-500';
      case 'MOYENNE': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const bidonsOrdonnes = [...bidons].sort((a, b) => b.priority - a.priority);

  const stats = {
    total: bidons.length,
    alertes: alertes.filter(a => a.severite === 'CRITIQUE' || a.severite === 'HAUTE').length,
    tempOK: bidons.filter(b => b.temp >= 15 && b.temp <= 25).length,
    expirationProche: bidons.filter(b => b.expiration <= 30).length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Système IoT - Gestion Produits Chimiques
        </h1>
        <p className="text-gray-600">Leoni Tunisie - Foaming Department</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Bidons Total</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <Package className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Alertes Actives</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{stats.alertes}</p>
            </div>
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Température OK</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{stats.tempOK}/{stats.total}</p>
            </div>
            <Thermometer className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Expiration Proche</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">{stats.expirationProche}</p>
            </div>
            <Calendar className="w-12 h-12 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Alertes Section */}
      {alertes.length > 0 && (
        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2 text-red-500" />
            Alertes Actives
          </h2>
          <div className="space-y-3">
            {alertes.map((alerte, idx) => (
              <div key={idx} className="flex items-center border-l-4 pl-4 py-2" 
                   style={{borderColor: getSeveriteColor(alerte.severite) === 'bg-red-600' ? '#dc2626' : 
                                        getSeveriteColor(alerte.severite) === 'bg-orange-500' ? '#f97316' : '#eab308'}}>
                <div className={`w-3 h-3 rounded-full ${getSeveriteColor(alerte.severite)} mr-3`}></div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{alerte.type.replace(/_/g, ' ')}</p>
                  <p className="text-sm text-gray-600">
                    Bidon {alerte.bidon} 
                    {alerte.valeur && ` - Valeur: ${alerte.valeur}`}
                    {alerte.jours !== undefined && ` - ${alerte.jours} jours restants`}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeveriteColor(alerte.severite)} text-white`}>
                  {alerte.severite}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ordre de Priorité */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-blue-500" />
          Ordre de Priorité d'Utilisation
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Bidon</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lot</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Température</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Humidité</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiration</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priorité</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bidonsOrdonnes.map((bidon, idx) => (
                <tr key={bidon.id} className={idx === 0 ? 'bg-yellow-50' : ''}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-lg font-bold text-gray-700">#{idx + 1}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap font-semibold text-gray-900">{bidon.id}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded ${bidon.type === 'Polyol' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                      {bidon.type}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{bidon.lot}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Thermometer className={`w-4 h-4 mr-1 ${bidon.temp >= 15 && bidon.temp <= 25 ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={bidon.temp >= 15 && bidon.temp <= 25 ? 'text-green-600' : 'text-red-600'}>
                        {bidon.temp}°C
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Droplets className={`w-4 h-4 mr-1 ${bidon.humidity <= 50 ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={bidon.humidity <= 50 ? 'text-green-600' : 'text-red-600'}>
                        {bidon.humidity}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{bidon.volume}L</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`font-semibold ${bidon.expiration <= 15 ? 'text-red-600' : bidon.expiration <= 30 ? 'text-orange-600' : 'text-green-600'}`}>
                      {bidon.expiration} jours
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(bidon.status)}`}>
                      {bidon.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`text-lg font-bold ${getPriorityColor(bidon.priority)}`}>
                      {bidon.priority.toFixed(0)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommandation */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow p-6 border-l-4 border-blue-500">
        <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Recommandation Système
        </h3>
        <p className="text-blue-800">
          <span className="font-semibold">Prochain bidon à utiliser : {bidonsOrdonnes[0]?.id}</span> ({bidonsOrdonnes[0]?.type} - Lot {bidonsOrdonnes[0]?.lot})
          <br />
          Raison : {bidonsOrdonnes[0]?.expiration <= 15 ? 'Expiration imminente' : bidonsOrdonnes[0]?.temp > 25 ? 'Température hors limite' : bidonsOrdonnes[0]?.status === 'Entamé' ? 'Bidon déjà entamé' : 'Optimisation stock'}
        </p>
      </div>
    </div>
  );
};

export default DashboardLeoni;