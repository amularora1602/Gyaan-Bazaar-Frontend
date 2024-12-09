import React, { useState } from 'react';

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const analyticsData = {
    overview: {
      totalVisitors: 54320,
      bounceRate: 42.5,
      avgSessionDuration: '3m 45s',
      pageViews: 187654
    },
    traffic: {
      direct: 35.6,
      organic: 28.4,
      social: 22.1,
      referral: 13.9
    },
    devices: {
      desktop: 62.3,
      mobile: 34.7,
      tablet: 3
    }
  };

  const renderOverviewCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { 
          title: 'Total Visitors', 
          value: analyticsData.overview.totalVisitors.toLocaleString(),
          icon: '👥',
          color: 'bg-blue-100 text-blue-600'
        },
        { 
          title: 'Bounce Rate', 
          value: `${analyticsData.overview.bounceRate}%`,
          icon: '📉',
          color: 'bg-green-100 text-green-600'
        },
        { 
          title: 'Avg. Session', 
          value: analyticsData.overview.avgSessionDuration,
          icon: '⏱️',
          color: 'bg-purple-100 text-purple-600'
        },
        { 
          title: 'Page Views', 
          value: analyticsData.overview.pageViews.toLocaleString(),
          icon: '🖥️',
          color: 'bg-red-100 text-red-600'
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

  const renderTrafficChart = () => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Traffic Sources</h2>
      <div className="space-y-4">
        {Object.entries(analyticsData.traffic).map(([source, percentage]) => (
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

  const renderDeviceBreakdown = () => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Device Breakdown</h2>
      <div className="flex justify-between items-center">
        {Object.entries(analyticsData.devices).map(([device, percentage]) => (
          <div key={device} className="text-center">
            <div className="text-3xl font-bold text-blue-600">{percentage}%</div>
            <div className="text-sm text-gray-500 capitalize">{device}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-500 mt-2">Real-time insights into your performance</p>
        </header>

        <nav className="mb-8">
          <div className="flex space-x-4">
            {['overview', 'traffic', 'devices'].map((tab) => (
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
              {renderOverviewCards()}
              <div className="grid md:grid-cols-2 gap-6">
                {renderTrafficChart()}
                {renderDeviceBreakdown()}
              </div>
            </div>
          )}
          {activeTab === 'traffic' && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-4">Detailed Traffic Analysis</h2>
              {renderTrafficChart()}
            </div>
          )}
          {activeTab === 'devices' && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-4">Device Usage</h2>
              {renderDeviceBreakdown()}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;