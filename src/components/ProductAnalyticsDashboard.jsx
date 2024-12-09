import React, { useState } from 'react';

const ProductAnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Temporary mock data
  const salesData = {
    totalRevenue: 124567,
    totalSales: 3245,
    topProducts: [
      { 
        name: 'Wireless Headphones', 
        sales: 789, 
        revenue: 45678, 
        profit: 12345,
        image: '/api/placeholder/100/100'
      },
      { 
        name: 'Smart Watch', 
        sales: 456, 
        revenue: 34567, 
        profit: 9876,
        image: '/api/placeholder/100/100'
      },
      { 
        name: 'Bluetooth Speaker', 
        sales: 345, 
        revenue: 23456, 
        profit: 6543,
        image: '/api/placeholder/100/100'
      }
    ],
    trafficSources: {
      direct: 35.6,
      organic: 28.4,
      social: 22.1,
      referral: 13.9
    },
    salesTrend: [
      { month: 'Jan', sales: 15000 },
      { month: 'Feb', sales: 18000 },
      { month: 'Mar', sales: 22000 },
      { month: 'Apr', sales: 25000 },
      { month: 'May', sales: 30000 }
    ]
  };

  const renderSummaryCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { 
          title: 'Total Revenue', 
          value: `$${salesData.totalRevenue.toLocaleString()}`,
          icon: '💰',
          color: 'bg-green-100 text-green-600'
        },
        { 
          title: 'Total Sales', 
          value: salesData.totalSales.toLocaleString(),
          icon: '🛒',
          color: 'bg-blue-100 text-blue-600'
        },
        { 
          title: 'Avg. Order Value', 
          value: `$${Math.round(salesData.totalRevenue / salesData.totalSales)}`,
          icon: '📊',
          color: 'bg-purple-100 text-purple-600'
        }
      ].map((card, index) => (
        <div 
          key={index} 
          className={`${card.color} p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase">{card.title}</h3>
              <p className="text-2xl font-bold mt-2">{card.value}</p>
            </div>
            <span className="text-4xl">{card.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTopProducts = () => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Top Selling Products</h2>
      <div className="space-y-4">
        {salesData.topProducts.map((product, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between hover:bg-gray-50 p-3 rounded-lg transition-all"
          >
            <div className="flex items-center space-x-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.sales} units sold</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">${product.revenue.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Profit: ${product.profit.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTrafficSources = () => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Traffic Sources</h2>
      <div className="space-y-4">
        {Object.entries(salesData.trafficSources).map(([source, percentage]) => (
          <div key={source} className="w-full">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span className="capitalize">{source}</span>
              <span>{percentage}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-500 rounded-full h-2.5" 
                style={{width: `${percentage}%`}}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSalesTrend = () => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Sales Trend</h2>
      <div className="flex justify-between items-end h-40">
        {salesData.salesTrend.map((month, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center justify-end w-full"
          >
            <div 
              className="bg-blue-500 w-10 rounded-t-lg hover:bg-blue-600 transition-all"
              style={{height: `${month.sales / 300}%`}}
            ></div>
            <span className="text-xs text-gray-500 mt-2">{month.month}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Product Sales Dashboard</h1>
          <p className="text-gray-500 mt-2">Comprehensive insights into your product performance</p>
        </header>

        <nav className="mb-8">
          <div className="flex space-x-4">
            {['overview', 'products', 'traffic'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium capitalize
                  ${activeTab === tab 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'}
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </nav>

        <main>
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {renderSummaryCards()}
              <div className="grid md:grid-cols-2 gap-6">
                {renderTopProducts()}
                {renderTrafficSources()}
              </div>
              {renderSalesTrend()}
            </div>
          )}
          
          {activeTab === 'products' && (
            <div className="space-y-6">
              {renderTopProducts()}
            </div>
          )}
          
          {activeTab === 'traffic' && (
            <div className="space-y-6">
              {renderTrafficSources()}
              {renderSalesTrend()}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductAnalyticsDashboard;