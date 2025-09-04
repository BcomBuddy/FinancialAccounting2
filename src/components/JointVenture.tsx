import React, { useState } from 'react';
import { Calculator, BookOpen } from 'lucide-react';

const JointVenture: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'definition' | 'simulator'>('definition');
  const [simulatorType, setSimulatorType] = useState<'basic' | 'separate' | 'memorandum'>('basic');
  
  // Basic Joint Venture State
  const [partnerAContribution, setPartnerAContribution] = useState<string>('');
  const [partnerBContribution, setPartnerBContribution] = useState<string>('');
  const [totalExpenses, setTotalExpenses] = useState<string>('');
  const [totalSales, setTotalSales] = useState<string>('');
  const [profitRatio, setProfitRatio] = useState<string>('');

  // Separate Books State
  const [purchasesByA, setPurchasesByA] = useState<string>('');
  const [purchasesByB, setPurchasesByB] = useState<string>('');
  const [expensesByA, setExpensesByA] = useState<string>('');
  const [expensesByB, setExpensesByB] = useState<string>('');
  const [salesByA, setSalesByA] = useState<string>('');
  const [salesByB, setSalesByB] = useState<string>('');

  // Memorandum Method State
  const [memoGoodsContributed, setMemoGoodsContributed] = useState<string>('');
  const [memoExpensesPaid, setMemoExpensesPaid] = useState<string>('');
  const [memoSalesMade, setMemoSalesMade] = useState<string>('');
  const [memoCoVenturerShare, setMemoCoVenturerShare] = useState<string>('');
  const [memoProfitRatio, setMemoProfitRatio] = useState<string>('');

  const calculateBasicJV = () => {
    const contribA = parseFloat(partnerAContribution) || 0;
    const contribB = parseFloat(partnerBContribution) || 0;
    const expenses = parseFloat(totalExpenses) || 0;
    const sales = parseFloat(totalSales) || 0;
    const ratio = parseFloat(profitRatio) || 50;

    const totalContribution = contribA + contribB;
    const totalCost = totalContribution + expenses;
    const profit = sales - totalCost;
    const partnerAShare = (profit * ratio) / 100;
    const partnerBShare = profit - partnerAShare;

    return {
      totalContribution: totalContribution.toFixed(2),
      totalCost: totalCost.toFixed(2),
      profit: profit.toFixed(2),
      partnerAShare: partnerAShare.toFixed(2),
      partnerBShare: partnerBShare.toFixed(2)
    };
  };

  const calculateSeparateBooks = () => {
    const purchA = parseFloat(purchasesByA) || 0;
    const purchB = parseFloat(purchasesByB) || 0;
    const expA = parseFloat(expensesByA) || 0;
    const expB = parseFloat(expensesByB) || 0;
    const saleA = parseFloat(salesByA) || 0;
    const saleB = parseFloat(salesByB) || 0;

    const totalPurchases = purchA + purchB;
    const totalExpenses = expA + expB;
    const totalSales = saleA + saleB;
    const totalCost = totalPurchases + totalExpenses;
    const profit = totalSales - totalCost;

    return {
      totalPurchases: totalPurchases.toFixed(2),
      totalExpenses: totalExpenses.toFixed(2),
      totalSales: totalSales.toFixed(2),
      totalCost: totalCost.toFixed(2),
      profit: profit.toFixed(2)
    };
  };

  const calculateMemorandum = () => {
    const goods = parseFloat(memoGoodsContributed) || 0;
    const expenses = parseFloat(memoExpensesPaid) || 0;
    const sales = parseFloat(memoSalesMade) || 0;
    const coVenturerShare = parseFloat(memoCoVenturerShare) || 0;
    const ratio = parseFloat(memoProfitRatio) || 50;

    const totalCost = goods + expenses;
    const totalProfit = sales - totalCost;
    const ownProfitShare = (totalProfit * ratio) / 100;
    const coVenturerProfitShare = totalProfit - ownProfitShare;
    const netAmount = ownProfitShare - coVenturerShare;

    return {
      totalCost: totalCost.toFixed(2),
      totalProfit: totalProfit.toFixed(2),
      ownProfitShare: ownProfitShare.toFixed(2),
      coVenturerProfitShare: coVenturerProfitShare.toFixed(2),
      netAmount: netAmount.toFixed(2)
    };
  };

  const basicResults = calculateBasicJV();
  const separateResults = calculateSeparateBooks();
  const memoResults = calculateMemorandum();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Section Tabs */}
      <div className="flex mb-8 bg-white rounded-lg shadow-sm">
        <button
          onClick={() => setActiveSection('definition')}
          className={`flex-1 py-4 px-6 rounded-l-lg font-semibold transition-all ${
            activeSection === 'definition'
              ? 'bg-purple-600 text-white'
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
              ? 'bg-purple-600 text-white'
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Joint Venture - Key Concepts</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-3">Definition</h3>
                <p className="text-gray-700 leading-relaxed">
                  A Joint Venture is a business arrangement between two or more parties (co-venturers) 
                  who agree to pool their resources for the purpose of accomplishing a specific task 
                  or project. It is a temporary partnership for a particular venture.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-3">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">✓ Temporary Nature</h4>
                    <p className="text-sm text-gray-700">Limited to specific project/venture</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">✓ Profit/Loss Sharing</h4>
                    <p className="text-sm text-gray-700">Shared in agreed ratio</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">✓ Joint Control</h4>
                    <p className="text-sm text-gray-700">All parties have control rights</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">✓ No Separate Entity</h4>
                    <p className="text-sm text-gray-700">Not a separate legal entity</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-3">Joint Venture vs Consignment</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-3 text-left">Basis</th>
                        <th className="border border-gray-300 p-3 text-left">Joint Venture</th>
                        <th className="border border-gray-300 p-3 text-left">Consignment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Relationship</td>
                        <td className="border border-gray-300 p-3">Partnership relation</td>
                        <td className="border border-gray-300 p-3">Principal-Agent relation</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Risk</td>
                        <td className="border border-gray-300 p-3">Shared by all parties</td>
                        <td className="border border-gray-300 p-3">Borne by consignor only</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Profit/Loss</td>
                        <td className="border border-gray-300 p-3">Shared in agreed ratio</td>
                        <td className="border border-gray-300 p-3">Belongs to consignor</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Decision Making</td>
                        <td className="border border-gray-300 p-3">Joint decisions</td>
                        <td className="border border-gray-300 p-3">Consignor's decisions</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-3">Methods of Maintaining Records</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-800">1. No Books Method</h4>
                    <p className="text-sm text-gray-600">
                      Each co-venturer maintains their own records. Final settlement done at the end.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-800">2. Separate Books Method</h4>
                    <p className="text-sm text-gray-600">
                      Joint Venture maintains separate set of books. All transactions recorded in JV books.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-800">3. Joint Bank Account Method</h4>
                    <p className="text-sm text-gray-600">
                      Common bank account opened. All receipts and payments through this account.
                    </p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-gray-800">4. Memorandum Joint Venture Method</h4>
                    <p className="text-sm text-gray-600">
                      Each party maintains own books plus memorandum JV account for complete picture.
                    </p>
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
                onClick={() => setSimulatorType('basic')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  simulatorType === 'basic'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Basic Joint Venture
              </button>
              <button
                onClick={() => setSimulatorType('separate')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  simulatorType === 'separate'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Separate Books Method
              </button>
              <button
                onClick={() => setSimulatorType('memorandum')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  simulatorType === 'memorandum'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Memorandum Method
              </button>
            </div>
          </div>

          {simulatorType === 'basic' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Basic Joint Venture Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Partner A Contribution (₹)
                    </label>
                    <input
                      type="number"
                      value={partnerAContribution}
                      onChange={(e) => setPartnerAContribution(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter Partner A contribution"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Partner B Contribution (₹)
                    </label>
                    <input
                      type="number"
                      value={partnerBContribution}
                      onChange={(e) => setPartnerBContribution(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter Partner B contribution"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Expenses (₹)
                    </label>
                    <input
                      type="number"
                      value={totalExpenses}
                      onChange={(e) => setTotalExpenses(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter total expenses"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Sales (₹)
                    </label>
                    <input
                      type="number"
                      value={totalSales}
                      onChange={(e) => setTotalSales(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter total sales"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Partner A's Profit Share (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={profitRatio}
                      onChange={(e) => setProfitRatio(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter profit sharing ratio"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Step-by-Step Calculation</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">1. Total Investment</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Partner A + Partner B
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = {partnerAContribution} + {partnerBContribution}
                    </p>
                    <p className="text-lg font-semibold">₹{basicResults.totalContribution}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">2. Total Cost</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Total Investment + Total Expenses
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = {basicResults.totalContribution} + {totalExpenses}
                    </p>
                    <p className="text-lg font-semibold">₹{basicResults.totalCost}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">3. Total Profit</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Total Sales - Total Cost
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = {totalSales} - {basicResults.totalCost}
                    </p>
                    <p className="text-lg font-semibold">₹{basicResults.profit}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">4. Profit Distribution</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      Partner A ({profitRatio}%): ₹{basicResults.partnerAShare}
                    </p>
                    <p className="text-sm text-gray-600">
                      Partner B ({100 - parseFloat(profitRatio || '0')}%): ₹{basicResults.partnerBShare}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {simulatorType === 'separate' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Separate Books Method</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purchases by A (₹)
                      </label>
                      <input
                        type="number"
                        value={purchasesByA}
                        onChange={(e) => setPurchasesByA(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter purchases by A"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purchases by B (₹)
                      </label>
                      <input
                        type="number"
                        value={purchasesByB}
                        onChange={(e) => setPurchasesByB(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter purchases by B"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expenses by A (₹)
                      </label>
                      <input
                        type="number"
                        value={expensesByA}
                        onChange={(e) => setExpensesByA(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter expenses by A"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expenses by B (₹)
                      </label>
                      <input
                        type="number"
                        value={expensesByB}
                        onChange={(e) => setExpensesByB(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter expenses by B"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sales by A (₹)
                      </label>
                      <input
                        type="number"
                        value={salesByA}
                        onChange={(e) => setSalesByA(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter sales by A"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sales by B (₹)
                      </label>
                      <input
                        type="number"
                        value={salesByB}
                        onChange={(e) => setSalesByB(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter sales by B"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Joint Venture Account Summary</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Total Purchases</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Purchases by A + Purchases by B
                    </p>
                    <p className="text-lg font-semibold">₹{separateResults.totalPurchases}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Total Expenses</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Expenses by A + Expenses by B
                    </p>
                    <p className="text-lg font-semibold">₹{separateResults.totalExpenses}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Total Sales</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Sales by A + Sales by B
                    </p>
                    <p className="text-lg font-semibold">₹{separateResults.totalSales}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Joint Venture Profit</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Total Sales - (Total Purchases + Total Expenses)
                    </p>
                    <p className="text-xl font-bold">₹{separateResults.profit}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {simulatorType === 'memorandum' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Memorandum JV Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Goods Contributed by You (₹)
                    </label>
                    <input
                      type="number"
                      value={memoGoodsContributed}
                      onChange={(e) => setMemoGoodsContributed(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter goods contributed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expenses Paid by You (₹)
                    </label>
                    <input
                      type="number"
                      value={memoExpensesPaid}
                      onChange={(e) => setMemoExpensesPaid(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter expenses paid"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sales Made by You (₹)
                    </label>
                    <input
                      type="number"
                      value={memoSalesMade}
                      onChange={(e) => setMemoSalesMade(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter sales made"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Co-venturer's Share Received (₹)
                    </label>
                    <input
                      type="number"
                      value={memoCoVenturerShare}
                      onChange={(e) => setMemoCoVenturerShare(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter co-venturer's share"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Profit Share (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={memoProfitRatio}
                      onChange={(e) => setMemoProfitRatio(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your profit share percentage"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Memorandum JV Account</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">1. Total Cost</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Goods Contributed + Expenses Paid
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = {memoGoodsContributed} + {memoExpensesPaid}
                    </p>
                    <p className="text-lg font-semibold">₹{memoResults.totalCost}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">2. Total Profit</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Sales Made - Total Cost
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = {memoSalesMade} - {memoResults.totalCost}
                    </p>
                    <p className="text-lg font-semibold">₹{memoResults.totalProfit}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">3. Your Profit Share</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Total Profit × Your Share%
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = {memoResults.totalProfit} × {memoProfitRatio}%
                    </p>
                    <p className="text-lg font-semibold">₹{memoResults.ownProfitShare}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">4. Co-venturer's Profit Share</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Total Profit - Your Share
                    </p>
                    <p className="text-lg font-semibold">₹{memoResults.coVenturerProfitShare}</p>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-teal-800 mb-2">5. Net Settlement</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Your Profit Share - Co-venturer's Share Received
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = {memoResults.ownProfitShare} - {memoCoVenturerShare}
                    </p>
                    <p className="text-xl font-bold">
                      {parseFloat(memoResults.netAmount) >= 0 ? 'Receivable' : 'Payable'}: ₹{Math.abs(parseFloat(memoResults.netAmount)).toFixed(2)}
                    </p>
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

export default JointVenture;