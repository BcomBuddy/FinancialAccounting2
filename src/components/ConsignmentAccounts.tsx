import React, { useState } from 'react';
import { Calculator, BookOpen } from 'lucide-react';

const ConsignmentAccounts: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'definition' | 'simulator'>('definition');
  const [simulatorType, setSimulatorType] = useState<'basic' | 'losses' | 'valuation'>('basic');
  
  // Basic Consignment State
  const [goodsSent, setGoodsSent] = useState<string>('');
  const [expenses, setExpenses] = useState<string>('');
  const [unitsSold, setUnitsSold] = useState<string>('');
  const [sellingPrice, setSellingPrice] = useState<string>('');
  const [commission, setCommission] = useState<string>('');
  const [delCredereRate, setDelCredereRate] = useState<string>('');

  // Loss Calculation State
  const [totalUnits, setTotalUnits] = useState<string>('');
  const [normalLossPercent, setNormalLossPercent] = useState<string>('');
  const [abnormalLoss, setAbnormalLoss] = useState<string>('');
  const [costPerUnit, setCostPerUnit] = useState<string>('');

  // Stock Valuation State
  const [totalUnitsSent, setTotalUnitsSent] = useState<string>('');
  const [unitsSoldStock, setUnitsSoldStock] = useState<string>('');
  const [costPricePerUnit, setCostPricePerUnit] = useState<string>('');
  const [nonRecurringExpenses, setNonRecurringExpenses] = useState<string>('');
  const [loadingPercentage, setLoadingPercentage] = useState<string>('');
  const [invoicePricePerUnit, setInvoicePricePerUnit] = useState<string>('');

  const calculateBasicConsignment = () => {
    const goods = parseFloat(goodsSent) || 0;
    const exp = parseFloat(expenses) || 0;
    const sold = parseFloat(unitsSold) || 0;
    const price = parseFloat(sellingPrice) || 0;
    const commissionRate = parseFloat(commission) || 0;
    const delCredere = parseFloat(delCredereRate) || 0;

    const totalCost = goods + exp;
    const sales = sold * price;
    const commissionAmount = (sales * commissionRate) / 100;
    const delCredereCommission = (sales * delCredere) / 100;
    const totalCommission = commissionAmount + delCredereCommission;
    const netSales = sales - totalCommission;
    const grossProfit = netSales - (goods * (sold / 100)); // Assuming goods sent is for 100 units

    return {
      totalCost: totalCost.toFixed(2),
      sales: sales.toFixed(2),
      commissionAmount: commissionAmount.toFixed(2),
      delCredereCommission: delCredereCommission.toFixed(2),
      totalCommission: totalCommission.toFixed(2),
      netSales: netSales.toFixed(2),
      grossProfit: grossProfit.toFixed(2)
    };
  };

  const calculateLosses = () => {
    const total = parseFloat(totalUnits) || 0;
    const normalPercent = parseFloat(normalLossPercent) || 0;
    const abnormal = parseFloat(abnormalLoss) || 0;
    const cost = parseFloat(costPerUnit) || 0;

    const normalLossUnits = (total * normalPercent) / 100;
    const totalLoss = normalLossUnits + abnormal;
    const availableForSale = total - totalLoss;
    const costPerUnitAfterNormalLoss = (total * cost) / availableForSale;
    const abnormalLossValue = abnormal * cost;

    return {
      normalLossUnits: normalLossUnits.toFixed(2),
      totalLoss: totalLoss.toFixed(2),
      availableForSale: availableForSale.toFixed(2),
      costPerUnitAfterNormalLoss: costPerUnitAfterNormalLoss.toFixed(2),
      abnormalLossValue: abnormalLossValue.toFixed(2)
    };
  };

  const calculateStockValuation = () => {
    const totalUnits = parseFloat(totalUnitsSent) || 0;
    const soldUnits = parseFloat(unitsSoldStock) || 0;
    const costPrice = parseFloat(costPricePerUnit) || 0;
    const expenses = parseFloat(nonRecurringExpenses) || 0;
    const loading = parseFloat(loadingPercentage) || 0;
    const invoicePrice = parseFloat(invoicePricePerUnit) || 0;

    const unsoldUnits = totalUnits - soldUnits;
    const proportionateExpenses = (unsoldUnits / totalUnits) * expenses;
    
    // Method 1: Cost Price Method
    const stockValueCostMethod = (unsoldUnits * costPrice) + proportionateExpenses;
    
    // Method 2: Invoice Price Method
    const loadingOnUnsold = (unsoldUnits * invoicePrice * loading) / 100;
    const stockValueInvoiceMethod = (unsoldUnits * invoicePrice) - loadingOnUnsold + proportionateExpenses;

    return {
      unsoldUnits: unsoldUnits.toFixed(0),
      proportionateExpenses: proportionateExpenses.toFixed(2),
      stockValueCostMethod: stockValueCostMethod.toFixed(2),
      loadingOnUnsold: loadingOnUnsold.toFixed(2),
      stockValueInvoiceMethod: stockValueInvoiceMethod.toFixed(2)
    };
  };

  const basicResults = calculateBasicConsignment();
  const lossResults = calculateLosses();
  const stockResults = calculateStockValuation();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Section Tabs */}
      <div className="flex mb-8 bg-white rounded-lg shadow-sm">
        <button
          onClick={() => setActiveSection('definition')}
          className={`flex-1 py-4 px-6 rounded-l-lg font-semibold transition-all ${
            activeSection === 'definition'
              ? 'bg-green-600 text-white'
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
              ? 'bg-green-600 text-white'
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Consignment Accounts - Key Concepts</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-3">Definition</h3>
                <p className="text-gray-700 leading-relaxed">
                  Consignment is a business arrangement where goods are sent by the owner (Consignor) 
                  to another person (Consignee) to be sold on behalf of the consignor. The consignee 
                  acts as an agent and earns commission on sales.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-3">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">✓ No Sale Transaction</h4>
                    <p className="text-sm text-gray-700">Goods sent, not sold to consignee</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">✓ Agency Relationship</h4>
                    <p className="text-sm text-gray-700">Consignee acts as agent</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">✓ Commission Basis</h4>
                    <p className="text-sm text-gray-700">Payment on percentage of sales</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">✓ Risk with Consignor</h4>
                    <p className="text-sm text-gray-700">Consignor bears losses</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-3">Important Documents</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-800">Proforma Invoice</h4>
                    <p className="text-sm text-gray-600">
                      Document showing details of goods sent, not a true invoice as no sale occurred
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-800">Account Sales</h4>
                    <p className="text-sm text-gray-600">
                      Statement prepared by consignee showing sales, expenses, and commission
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-3">Types of Commission</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-3 text-left">Type</th>
                        <th className="border border-gray-300 p-3 text-left">Description</th>
                        <th className="border border-gray-300 p-3 text-left">Calculation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Ordinary Commission</td>
                        <td className="border border-gray-300 p-3">Basic commission on sales</td>
                        <td className="border border-gray-300 p-3">% of gross sales</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Del-Credere Commission</td>
                        <td className="border border-gray-300 p-3">Extra commission for bad debt risk</td>
                        <td className="border border-gray-300 p-3">% of credit sales</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Over-riding Commission</td>
                        <td className="border border-gray-300 p-3">Extra commission for exceeding targets</td>
                        <td className="border border-gray-300 p-3">% of sales above target</td>
                      </tr>
                    </tbody>
                  </table>
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
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Basic Consignment
              </button>
              <button
                onClick={() => setSimulatorType('losses')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  simulatorType === 'losses'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Loss Calculations
              </button>
              <button
                onClick={() => setSimulatorType('valuation')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  simulatorType === 'valuation'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Stock Valuation
              </button>
            </div>
          </div>

          {simulatorType === 'basic' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Basic Consignment Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cost of Goods Sent (₹)
                    </label>
                    <input
                      type="number"
                      value={goodsSent}
                      onChange={(e) => setGoodsSent(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter cost of goods sent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Consignment Expenses (₹)
                    </label>
                    <input
                      type="number"
                      value={expenses}
                      onChange={(e) => setExpenses(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter expenses"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Units Sold
                    </label>
                    <input
                      type="number"
                      value={unitsSold}
                      onChange={(e) => setUnitsSold(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter units sold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selling Price per Unit (₹)
                    </label>
                    <input
                      type="number"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter selling price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Commission Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={commission}
                      onChange={(e) => setCommission(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter commission rate"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Del-Credere Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={delCredereRate}
                      onChange={(e) => setDelCredereRate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter del-credere rate"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Step-by-Step Calculation</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">1. Total Sales</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Units Sold × Selling Price per Unit
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = {unitsSold} × {sellingPrice}
                    </p>
                    <p className="text-lg font-semibold">₹{basicResults.sales}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">2. Commission Calculation</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      Ordinary Commission = {basicResults.sales} × {commission}% = ₹{basicResults.commissionAmount}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      Del-Credere Commission = {basicResults.sales} × {delCredereRate}% = ₹{basicResults.delCredereCommission}
                    </p>
                    <p className="text-lg font-semibold">Total Commission: ₹{basicResults.totalCommission}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">3. Net Sales</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Total Sales - Total Commission
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = {basicResults.sales} - {basicResults.totalCommission}
                    </p>
                    <p className="text-lg font-semibold">₹{basicResults.netSales}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">4. Total Cost</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Goods Sent + Expenses
                    </p>
                    <p className="text-lg font-semibold">₹{basicResults.totalCost}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {simulatorType === 'losses' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Loss Calculation</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Units Sent
                    </label>
                    <input
                      type="number"
                      value={totalUnits}
                      onChange={(e) => setTotalUnits(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter total units"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Normal Loss (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={normalLossPercent}
                      onChange={(e) => setNormalLossPercent(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter normal loss percentage"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Abnormal Loss (Units)
                    </label>
                    <input
                      type="number"
                      value={abnormalLoss}
                      onChange={(e) => setAbnormalLoss(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter abnormal loss units"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cost per Unit (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={costPerUnit}
                      onChange={(e) => setCostPerUnit(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter cost per unit"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Loss Analysis</h3>
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Normal Loss</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = {totalUnits} × {normalLossPercent}% = {lossResults.normalLossUnits} units
                    </p>
                    <p className="text-sm text-gray-600">
                      (Absorbed in cost of remaining goods)
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Abnormal Loss</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = {abnormalLoss} units
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      Value = {abnormalLoss} × {costPerUnit} = ₹{lossResults.abnormalLossValue}
                    </p>
                    <p className="text-sm text-gray-600">
                      (Charged to P&L Account)
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Available for Sale</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Total - Normal Loss - Abnormal Loss
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = {totalUnits} - {lossResults.normalLossUnits} - {abnormalLoss}
                    </p>
                    <p className="text-lg font-semibold">{lossResults.availableForSale} units</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Cost per Unit (After Normal Loss)</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = (Total Units × Original Cost) / Available Units
                    </p>
                    <p className="text-lg font-semibold">₹{lossResults.costPerUnitAfterNormalLoss}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {simulatorType === 'valuation' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Stock Valuation Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Units Sent
                    </label>
                    <input
                      type="number"
                      value={totalUnitsSent}
                      onChange={(e) => setTotalUnitsSent(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter total units sent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Units Sold
                    </label>
                    <input
                      type="number"
                      value={unitsSoldStock}
                      onChange={(e) => setUnitsSoldStock(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter units sold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cost Price per Unit (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={costPricePerUnit}
                      onChange={(e) => setCostPricePerUnit(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter cost price per unit"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Non-recurring Expenses (₹)
                    </label>
                    <input
                      type="number"
                      value={nonRecurringExpenses}
                      onChange={(e) => setNonRecurringExpenses(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter non-recurring expenses"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Invoice Price per Unit (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={invoicePricePerUnit}
                      onChange={(e) => setInvoicePricePerUnit(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter invoice price per unit"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loading Percentage (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={loadingPercentage}
                      onChange={(e) => setLoadingPercentage(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter loading percentage"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Step-by-Step Calculation</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">1. Unsold Units</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Total Units - Units Sold
                    </p>
                    <p className="text-sm">
                      = {totalUnitsSent} - {unitsSoldStock}
                    </p>
                    <p className="text-lg font-semibold">{stockResults.unsoldUnits} units</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">2. Proportionate Expenses</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = (Unsold Units / Total Units) × Total Expenses
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = ({stockResults.unsoldUnits} / {totalUnitsSent}) × {nonRecurringExpenses}
                    </p>
                    <p className="text-lg font-semibold">₹{stockResults.proportionateExpenses}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">3. Method 1: Cost Price Method</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = (Unsold Units × Cost Price) + Proportionate Expenses
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = ({stockResults.unsoldUnits} × {costPricePerUnit}) + {stockResults.proportionateExpenses}
                    </p>
                    <p className="text-lg font-semibold">₹{stockResults.stockValueCostMethod}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">4. Loading on Unsold Stock</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Unsold Units × Invoice Price × Loading%
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = {stockResults.unsoldUnits} × {invoicePricePerUnit} × {loadingPercentage}%
                    </p>
                    <p className="text-lg font-semibold">₹{stockResults.loadingOnUnsold}</p>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-teal-800 mb-2">5. Method 2: Invoice Price Method</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = (Unsold × Invoice Price) - Loading + Expenses
                    </p>
                    <p className="text-xl font-bold">₹{stockResults.stockValueInvoiceMethod}</p>
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

export default ConsignmentAccounts;