import React, { useState } from 'react';
import { Calculator, FileText, Users, TrendingUp, Building2, Menu, X } from 'lucide-react';
import BillsOfExchange from './components/BillsOfExchange';
import ConsignmentAccounts from './components/ConsignmentAccounts';
import JointVenture from './components/JointVenture';
import IncompleteRecords from './components/IncompleteRecords';
import NonProfitOrganizations from './components/NonProfitOrganizations';

const modules = [
  {
    id: 'bills',
    name: 'Bills of Exchange', 
    icon: FileText,
    description: 'Trade bills, honour/dishonour, renewal & accommodation bills'
  },
  {
    id: 'consignment',
    name: 'Consignment Accounts',
    icon: TrendingUp,
    description: 'Consignor & consignee books, stock valuation & losses'
  },
  {
    id: 'joint-venture',
    name: 'Joint Venture Accounts',
    icon: Users,
    description: 'Co-ventures books, separate accounts & memorandum method'
  },
  {
    id: 'incomplete',
    name: 'Accounts from Incomplete Records',
    icon: Calculator,
    description: 'Single entry system, profit ascertainment & conversion'
  },
  {
    id: 'non-profit',
    name: 'Accounting for Non-Profit Organizations',
    icon: Building2,
    description: 'Receipts & payments, income & expenditure accounts'
  }
];

function App() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'bills':
        return <BillsOfExchange />;
      case 'consignment':
        return <ConsignmentAccounts />;
      case 'joint-venture':
        return <JointVenture />;
      case 'incomplete':
        return <IncompleteRecords />;
      case 'non-profit':
        return <NonProfitOrganizations />;
      default:
        return null;
    }
  };

  if (activeModule) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Modules</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="mt-4 px-4">
            <ul className="space-y-2">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <li key={module.id}>
                    <button
                      onClick={() => {
                        setActiveModule(module.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeModule === module.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {module.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 mr-2"
                >
                  <Menu className="w-5 h-5" />
                </button>
              <button
                onClick={() => setActiveModule(null)}
                className="flex items-center text-blue-600 hover:text-blue-700 font-semibold"
              >
                ← Back to Modules
              </button>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                {modules.find(m => m.id === activeModule)?.name}
              </h1>
            </div>
          </div>
        </header>
        <main>
          {renderActiveModule()}
        </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Modules</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="mt-6 px-3">
          <ul className="space-y-2">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <li key={module.id}>
                  <button
                    onClick={() => {
                      setActiveModule(module.id);
                      setSidebarOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-lg hover:scale-105 group"
                  >
                    <Icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-left leading-tight">{module.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 mr-4"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="text-center flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Financial Accounting-II Simulator
                </h1>
                <p className="text-lg text-blue-100">
                  Interactive learning modules for advanced accounting concepts
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
          {/* Welcome Card */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-blue-100">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calculator className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Your Accounting Journey!</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
                  Master advanced accounting concepts through interactive simulations. Each module provides 
                  comprehensive theory explanations and hands-on calculators to reinforce your learning.
                </p>
                <button 
                  onClick={() => setActiveModule('bills')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Start Exploring
                </button>
              </div>
            </div>

            {/* Module Cards */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Learning Modules</h2>
              <p className="text-gray-600 text-center mb-12 text-lg">Choose a module to begin your interactive learning experience</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <div
                    key={module.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:scale-105 border border-gray-100 hover:border-blue-200"
                    onClick={() => setActiveModule(module.id)}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-6 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300 group-hover:scale-110">
                        <Icon className="w-8 h-8 text-blue-600 group-hover:text-blue-700" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                        {module.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {module.description}
                      </p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModule(module.id);
                        }}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        Go to Module
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;