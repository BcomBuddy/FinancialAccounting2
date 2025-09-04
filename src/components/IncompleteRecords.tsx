import React, { useState } from 'react';
import { Calculator, BookOpen } from 'lucide-react';

const IncompleteRecords: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'definition' | 'simulator'>('definition');
  const [simulatorType, setSimulatorType] = useState<'statement' | 'conversion' | 'capital'>('statement');
  
  // Statement of Affairs State
  const [openingCapital, setOpeningCapital] = useState<string>('');
  const [closingCapital, setClosingCapital] = useState<string>('');
  const [drawings, setDrawings] = useState<string>('');
  const [additionalCapital, setAdditionalCapital] = useState<string>('');

  // Conversion Method State
  const [totalReceipts, setTotalReceipts] = useState<string>('');
  const [totalPayments, setTotalPayments] = useState<string>('');
  const [openingCash, setOpeningCash] = useState<string>('');
  const [closingCash, setClosingCash] = useState<string>('');

  // Capital Calculation State
  const [assets, setAssets] = useState<string>('');
  const [liabilities, setLiabilities] = useState<string>('');

  const calculateProfitByStatement = () => {
    const opening = parseFloat(openingCapital) || 0;
    const closing = parseFloat(closingCapital) || 0;
    const draw = parseFloat(drawings) || 0;
    const additional = parseFloat(additionalCapital) || 0;

    const profit = closing - opening + draw - additional;

    return {
      openingCapital: opening.toFixed(2),
      closingCapital: closing.toFixed(2),
      drawings: draw.toFixed(2),
      additionalCapital: additional.toFixed(2),
      profit: profit.toFixed(2)
    };
  };

  const calculateProfitByConversion = () => {
    const receipts = parseFloat(totalReceipts) || 0;
    const payments = parseFloat(totalPayments) || 0;
    const openCash = parseFloat(openingCash) || 0;
    const closeCash = parseFloat(closingCash) || 0;

    const netCashFlow = receipts - payments;
    const cashIncrease = closeCash - openCash;
    const profit = netCashFlow - cashIncrease;

    return {
      totalReceipts: receipts.toFixed(2),
      totalPayments: payments.toFixed(2),
      netCashFlow: netCashFlow.toFixed(2),
      cashIncrease: cashIncrease.toFixed(2),
      profit: profit.toFixed(2)
    };
  };

  const calculateCapital = () => {
    const totalAssets = parseFloat(assets) || 0;
    const totalLiabilities = parseFloat(liabilities) || 0;
    const capital = totalAssets - totalLiabilities;

    return {
      assets: totalAssets.toFixed(2),
      liabilities: totalLiabilities.toFixed(2),
      capital: capital.toFixed(2)
    };
  };

  const statementResults = calculateProfitByStatement();
  const conversionResults = calculateProfitByConversion();
  const capitalResults = calculateCapital();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Section Tabs */}
      <div className="flex mb-8 bg-white rounded-lg shadow-sm">
        <button
          onClick={() => setActiveSection('definition')}
          className={`flex-1 py-4 px-6 rounded-l-lg font-semibold transition-all ${
            activeSection === 'definition'
              ? 'bg-orange-600 text-white'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <BookOpen className="inline-block w-5 h-5 mr-2" />
          Definitions
        </button>
        <button
          onClick={() => setActiveSection('simulator')}
          className={`flex-1 py-4 px-6 rounded-r-lg font-semibold transition-all ${
            activeSection === 'simulator'
              ? 'bg-orange-600 text-white'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Calculator className="inline-block w-5 h-5 mr-2" />
          Simulator
        </button>
      </div>

      {activeSection === 'definition' && (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Incomplete Records - Key Concepts</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-orange-600 mb-3">Definition</h3>
                <p className="text-gray-700 leading-relaxed">
                  Incomplete Records or Single Entry System is a method of book-keeping where only 
                  cash transactions and personal accounts are maintained systematically. It is not 
                  a complete double-entry system as it does not maintain all the books of accounts.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-orange-600 mb-3">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">✗ Not Scientific</h4>
                    <p className="text-sm text-gray-700">Does not follow double entry principles</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">✗ No Trial Balance</h4>
                    <p className="text-sm text-gray-700">Cannot prepare trial balance</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">✓ Simple to Maintain</h4>
                    <p className="text-sm text-gray-700">Easy for small businesses</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">✓ Less Expensive</h4>
                    <p className="text-sm text-gray-700">Requires less skilled staff</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-orange-600 mb-3">Single Entry vs Double Entry</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-3 text-left">Basis</th>
                        <th className="border border-gray-300 p-3 text-left">Single Entry</th>
                        <th className="border border-gray-300 p-3 text-left">Double Entry</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Principle</td>
                        <td className="border border-gray-300 p-3">Incomplete recording</td>
                        <td className="border border-gray-300 p-3">Every debit has corresponding credit</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Books Maintained</td>
                        <td className="border border-gray-300 p-3">Cash book, personal accounts only</td>
                        <td className="border border-gray-300 p-3">All books of accounts</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Trial Balance</td>
                        <td className="border border-gray-300 p-3">Cannot be prepared</td>
                        <td className="border border-gray-300 p-3">Can be prepared</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Profit Calculation</td>
                        <td className="border border-gray-300 p-3">By comparison method</td>
                        <td className="border border-gray-300 p-3">By P&L Account</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Accuracy</td>
                        <td className="border border-gray-300 p-3">Less accurate</td>
                        <td className="border border-gray-300 p-3">More accurate</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-orange-600 mb-3">Defects of Single Entry System</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-red-800">• Incomplete Records</p>
                      <p className="text-xs text-gray-600">Not all transactions recorded</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-red-800">• No Trial Balance</p>
                      <p className="text-xs text-gray-600">Cannot check arithmetical accuracy</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-red-800">• Difficulty in Auditing</p>
                      <p className="text-xs text-gray-600">Hard to verify accounts</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-red-800">• No Control</p>
                      <p className="text-xs text-gray-600">Difficult to detect fraud/errors</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-red-800">• Comparative Study Difficult</p>
                      <p className="text-xs text-gray-600">Cannot compare with previous years</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-red-800">• No Profit Analysis</p>
                      <p className="text-xs text-gray-600">Cannot analyze profit properly</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-orange-600 mb-3">Methods of Profit Calculation</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-gray-800">1. Statement of Affairs Method</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Profit = Closing Capital - Opening Capital + Drawings - Additional Capital
                    </p>
                    <div className="bg-gray-50 p-2 rounded text-xs">
                      Also known as Net Worth Method or Balance Sheet Method
                    </div>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-800">2. Conversion Method</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Convert single entry records to double entry and prepare P&L Account
                    </p>
                    <div className="bg-gray-50 p-2 rounded text-xs">
                      More accurate but time-consuming method
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'simulator' && (
        <div className="space-y-6">
          {/* Simulator Type Selection */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Select Calculation Type</h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setSimulatorType('statement')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  simulatorType === 'statement'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Statement of Affairs
              </button>
              <button
                onClick={() => setSimulatorType('conversion')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  simulatorType === 'conversion'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Conversion Method
              </button>
              <button
                onClick={() => setSimulatorType('capital')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  simulatorType === 'capital'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Capital Calculation
              </button>
            </div>
          </div>

          {simulatorType === 'statement' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Statement of Affairs Method</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opening Capital (₹)
                    </label>
                    <input
                      type="number"
                      value={openingCapital}
                      onChange={(e) => setOpeningCapital(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter opening capital"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Closing Capital (₹)
                    </label>
                    <input
                      type="number"
                      value={closingCapital}
                      onChange={(e) => setClosingCapital(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter closing capital"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Drawings (₹)
                    </label>
                    <input
                      type="number"
                      value={drawings}
                      onChange={(e) => setDrawings(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter drawings"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Capital (₹)
                    </label>
                    <input
                      type="number"
                      value={additionalCapital}
                      onChange={(e) => setAdditionalCapital(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter additional capital"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Profit Calculation</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Formula</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Profit = Closing Capital - Opening Capital + Drawings - Additional Capital
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Step-by-Step Calculation</h4>
                    <div className="space-y-2 text-sm">
                      <p>Closing Capital: ₹{statementResults.closingCapital}</p>
                      <p>Less: Opening Capital: ₹{statementResults.openingCapital}</p>
                      <p>Add: Drawings: ₹{statementResults.drawings}</p>
                      <p>Less: Additional Capital: ₹{statementResults.additionalCapital}</p>
                      <hr className="my-2" />
                      <p className="font-semibold">
                        = {closingCapital} - {openingCapital} + {drawings} - {additionalCapital}
                      </p>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Result</h4>
                    <p className="text-2xl font-bold">
                      {parseFloat(statementResults.profit) >= 0 ? 'Profit' : 'Loss'}: ₹{Math.abs(parseFloat(statementResults.profit)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {simulatorType === 'conversion' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Conversion Method Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Receipts (₹)
                    </label>
                    <input
                      type="number"
                      value={totalReceipts}
                      onChange={(e) => setTotalReceipts(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter total receipts"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Payments (₹)
                    </label>
                    <input
                      type="number"
                      value={totalPayments}
                      onChange={(e) => setTotalPayments(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter total payments"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opening Cash (₹)
                    </label>
                    <input
                      type="number"
                      value={openingCash}
                      onChange={(e) => setOpeningCash(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter opening cash"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Closing Cash (₹)
                    </label>
                    <input
                      type="number"
                      value={closingCash}
                      onChange={(e) => setClosingCash(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter closing cash"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Cash Flow Analysis</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Net Cash Flow</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Total Receipts - Total Payments
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = {totalReceipts} - {totalPayments}
                    </p>
                    <p className="text-lg font-semibold">₹{conversionResults.netCashFlow}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Cash Increase</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Closing Cash - Opening Cash
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = {closingCash} - {openingCash}
                    </p>
                    <p className="text-lg font-semibold">₹{conversionResults.cashIncrease}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Profit/Loss</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Net Cash Flow - Cash Increase
                    </p>
                    <p className="text-xl font-bold">₹{conversionResults.profit}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {simulatorType === 'capital' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Capital Calculation</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Assets (₹)
                    </label>
                    <input
                      type="number"
                      value={assets}
                      onChange={(e) => setAssets(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter total assets"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Liabilities (₹)
                    </label>
                    <input
                      type="number"
                      value={liabilities}
                      onChange={(e) => setLiabilities(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter total liabilities"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Capital Calculation</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Formula</h4>
                    <p className="text-sm text-gray-600">
                      Capital = Total Assets - Total Liabilities
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Calculation</h4>
                    <div className="space-y-2 text-sm">
                      <p>Total Assets: ₹{capitalResults.assets}</p>
                      <p>Less: Total Liabilities: ₹{capitalResults.liabilities}</p>
                      <hr className="my-2" />
                      <p className="font-semibold">= {assets} - {liabilities}</p>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Capital</h4>
                    <p className="text-2xl font-bold">₹{capitalResults.capital}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IncompleteRecords;