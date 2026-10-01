import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, ShoppingCart, CreditCard, Calendar, Award } from 'lucide-react';

const RestaurantDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Données simulées basées sur votre analyse
  const salesData = [
    { month: 'Jan', sales: 12500, orders: 450 },
    { month: 'Fév', sales: 13200, orders: 480 },
    { month: 'Mar', sales: 14800, orders: 520 },
    { month: 'Avr', sales: 15600, orders: 550 },
    { month: 'Mai', sales: 16200, orders: 580 },
    { month: 'Juin', sales: 17500, orders: 620 },
    { month: 'Juil', sales: 18200, orders: 650 },
    { month: 'Août', sales: 17800, orders: 640 },
    { month: 'Sep', sales: 16500, orders: 590 },
    { month: 'Oct', sales: 15800, orders: 560 },
    { month: 'Nov', sales: 16900, orders: 600 },
    { month: 'Déc', sales: 19500, orders: 700 }
  ];

  const categoryData = [
    { name: 'Appetizers', value: 25000, orders: 850 },
    { name: 'Main Course', value: 45000, orders: 1200 },
    { name: 'Desserts', value: 18000, orders: 920 },
    { name: 'Beverages', value: 22000, orders: 1500 }
  ];

  const paymentData = [
    { name: 'Credit Card', value: 45, count: 1800 },
    { name: 'Cash', value: 30, count: 1200 },
    { name: 'Digital Wallet', value: 25, count: 1000 }
  ];

  const dayData = [
    { day: 'Lun', avg: 850 },
    { day: 'Mar', avg: 920 },
    { day: 'Mer', avg: 1050 },
    { day: 'Jeu', avg: 1150 },
    { day: 'Ven', avg: 1450 },
    { day: 'Sam', avg: 1680 },
    { day: 'Dim', avg: 1520 }
  ];

  const topItems = [
    { name: 'Burger Deluxe', revenue: 8500, qty: 340 },
    { name: 'Pizza Margherita', revenue: 7800, qty: 312 },
    { name: 'Pasta Carbonara', revenue: 7200, qty: 288 },
    { name: 'Salade Caesar', revenue: 6500, qty: 325 },
    { name: 'Steak Frites', revenue: 9200, qty: 230 },
    { name: 'Sushi Platter', revenue: 8900, qty: 178 },
    { name: 'Chocolate Cake', revenue: 5600, qty: 400 },
    { name: 'Tiramisu', revenue: 4800, qty: 320 }
  ];

  const mlMetrics = {
    bestModel: 'Random Forest',
    accuracy: 87.5,
    predictions: 2400,
    correctPredictions: 2100
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const KPICard = ({ title, value, subtitle, icon: Icon, trend }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">{value}</h3>
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-full">
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-green-600 text-sm">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>{trend}</span>
        </div>
      )}
    </div>
  );

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const avgOrder = totalSales / totalOrders;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🍽️ Restaurant Analytics Dashboard
          </h1>
          <p className="text-gray-600">Analyse complète des performances et prédictions ML</p>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex gap-4">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Toute la période</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Toutes catégories</option>
            {categoryData.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard 
            title="Ventes Totales"
            value={`${totalSales.toLocaleString()} €`}
            subtitle="Sur 12 mois"
            icon={DollarSign}
            trend="+12.5% vs année précédente"
          />
          <KPICard 
            title="Nombre de Commandes"
            value={totalOrders.toLocaleString()}
            subtitle="Toutes catégories"
            icon={ShoppingCart}
            trend="+8.3% ce mois"
          />
          <KPICard 
            title="Panier Moyen"
            value={`${avgOrder.toFixed(2)} €`}
            subtitle="Par commande"
            icon={CreditCard}
            trend="+3.7% vs moyenne"
          />
          <KPICard 
            title="Précision ML"
            value={`${mlMetrics.accuracy}%`}
            subtitle={mlMetrics.bestModel}
            icon={Award}
            trend={`${mlMetrics.correctPredictions}/${mlMetrics.predictions} prédictions`}
          />
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Évolution mensuelle */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Évolution Mensuelle des Ventes
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                  formatter={(value) => [`${value.toLocaleString()} €`, 'Ventes']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Ventes (€)"
                  dot={{ fill: '#3b82f6', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Ventes par catégorie */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Ventes par Catégorie
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                  formatter={(value) => `${value.toLocaleString()} €`}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Méthodes de paiement */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Distribution des Paiements
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              {paymentData.map((method, idx) => (
                <div key={method.name} className="p-3 bg-gray-50 rounded-lg">
                  <div 
                    className="w-4 h-4 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: COLORS[idx] }}
                  />
                  <p className="text-sm font-medium text-gray-700">{method.name}</p>
                  <p className="text-xs text-gray-500">{method.count} transactions</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ventes par jour */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Panier Moyen par Jour
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                  formatter={(value) => `${value} €`}
                />
                <Bar dataKey="avg" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Items */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            🏆 Top 8 Items les Plus Rentables
          </h2>
          <div className="space-y-3">
            {topItems.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="text-2xl font-bold text-gray-400 w-8">
                  #{idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.qty} unités vendues</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">
                    {item.revenue.toLocaleString()} €
                  </p>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(item.revenue / topItems[0].revenue) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ML Performance */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">
            🤖 Performance du Machine Learning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{mlMetrics.accuracy}%</div>
              <p className="text-blue-100">Précision Globale</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{mlMetrics.correctPredictions}</div>
              <p className="text-blue-100">Prédictions Correctes</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{mlMetrics.predictions - mlMetrics.correctPredictions}</div>
              <p className="text-blue-100">Erreurs</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{mlMetrics.bestModel}</div>
              <p className="text-blue-100">Meilleur Modèle</p>
            </div>
          </div>
          <div className="mt-6 bg-white/10 rounded-lg p-4">
            <p className="text-sm">
              💡 Le modèle {mlMetrics.bestModel} prédit avec succès la méthode de paiement 
              dans {mlMetrics.accuracy}% des cas, permettant d'optimiser les processus de paiement 
              et d'anticiper les besoins en liquidités.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')} • Données analysées: {totalOrders.toLocaleString()} commandes</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;