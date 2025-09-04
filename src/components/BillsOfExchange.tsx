import React, { useState } from 'react';
import { Calculator, BookOpen } from 'lucide-react';

interface TradeBookEntry {
  date: string;
  particulars: string;
  amount: number;
}

const BillsOfExchange: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'definition' | 'simulator'>('definition');
  const [simulatorType, setSimulatorType] = useState<'trade-bills' | 'renewal' | 'accommodation'>('trade-bills');
  
  // Trade Bills Simulator State
  const [billAmount, setBillAmount] = useState<string>('');
  const [billPeriod, setBillPeriod] = useState<string>('');
  const [discountRate, setDiscountRate] = useState<string>('');
  const [commission, setCommission] = useState<string>('');

  // Renewal Simulator State
  const [originalAmount, setOriginalAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [renewalPeriod, setRenewalPeriod] = useState<string>('');
  const [cashPaid, setCashPaid] = useState<string>('');

  // Accommodation Bills State
  const [accommodationAmount, setAccommodationAmount] = useState<string>('');
  const [accommodationPeriod, setAccommodationPeriod] = useState<string>('');
  const [accommodationRate, setAccommodationRate] = useState<string>('');
  const [accommodationExpenses, setAccommodationExpenses] = useState<string>('');

  const calculateTradeBills = () => {
    const amount = parseFloat(billAmount) || 0;
    const period = parseFloat(billPeriod) || 0;
    const rate = parseFloat(discountRate) || 0;
    const comm = parseFloat(commission) || 0;

    const discountAmount = (amount * rate * period) / (100 * 365);
    const commissionAmount = (amount * comm) / 100;
    const netAmount = amount - discountAmount - commissionAmount;

    return {
      billAmount: amount,
      discountAmount: discountAmount.toFixed(2),
      commissionAmount: commissionAmount.toFixed(2),
      netAmount: netAmount.toFixed(2)
    };
  };

  const calculateRenewal = () => {
    const original = parseFloat(originalAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    const period = parseFloat(renewalPeriod) || 0;
    const cash = parseFloat(cashPaid) || 0;

    const interest = (original * rate * period) / (100 * 12);
    const newBillAmount = original + interest - cash;

    return {
      originalAmount: original,
      interest: interest.toFixed(2),
      cashPaid: cash,
      newBillAmount: newBillAmount.toFixed(2)
    };
  };

  const calculateAccommodation = () => {
    const amount = parseFloat(accommodationAmount) || 0;
    const period = parseFloat(accommodationPeriod) || 0;
    const rate = parseFloat(accommodationRate) || 0;
    const expenses = parseFloat(accommodationExpenses) || 0;

    const discountAmount = (amount * rate * period) / (100 * 365);
    const netCashReceived = amount - discountAmount - expenses;
    const totalCost = discountAmount + expenses;

    return {
      billAmount: amount,
      discountAmount: discountAmount.toFixed(2),
      expenses: expenses.toFixed(2),
      totalCost: totalCost.toFixed(2),
      netCashReceived: netCashReceived.toFixed(2)
    };
  };

  const tradeResults = calculateTradeBills();
  const renewalResults = calculateRenewal();
  const accommodationResults = calculateAccommodation();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Section Tabs */}
      <div className="flex mb-8 bg-white rounded-lg shadow-sm">
        <button
          onClick={() => setActiveSection('definition')}
          className={`flex-1 py-4 px-6 rounded-l-lg font-semibold transition-all ${
            activeSection === 'definition'
              ? 'bg-blue-600 text-white'
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
              ? 'bg-blue-600 text-white'
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bills of Exchange - Key Concepts</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-3">Definition</h3>
                <p className="text-gray-700 leading-relaxed">
                  A Bill of Exchange is an unconditional order in writing, addressed by one person to another, 
                  signed by the person giving it, requiring the person to whom it is addressed to pay on demand 
                  or at a fixed or determinable future time, a sum certain in money to or to the order of a 
                  specified person or to bearer.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-3">Distinction: Promissory Note vs Bill of Exchange</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-3 text-left">Basis</th>
                        <th className="border border-gray-300 p-3 text-left">Promissory Note</th>
                        <th className="border border-gray-300 p-3 text-left">Bill of Exchange</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Nature</td>
                        <td className="border border-gray-300 p-3">Promise to pay</td>
                        <td className="border border-gray-300 p-3">Order to pay</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Parties</td>
                        <td className="border border-gray-300 p-3">Two parties (Maker & Payee)</td>
                        <td className="border border-gray-300 p-3">Three parties (Drawer, Drawee & Payee)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Acceptance</td>
                        <td className="border border-gray-300 p-3">Not required</td>
                        <td className="border border-gray-300 p-3">Required (except sight bills)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Liability</td>
                        <td className="border border-gray-300 p-3">Maker primarily liable</td>
                        <td className="border border-gray-300 p-3">Acceptor primarily liable</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-3">Key Terms</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Honour of Bill</h4>
                    <p className="text-sm text-gray-700">Payment of bill on due date by the acceptor</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Dishonour of Bill</h4>
                    <p className="text-sm text-gray-700">Non-payment of bill on due date</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Renewal of Bill</h4>
                    <p className="text-sm text-gray-700">Extension of bill period with interest</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Accommodation Bill</h4>
                    <p className="text-sm text-gray-700">Bill drawn without any trade transaction</p>
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
                onClick={() => setSimulatorType('trade-bills')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  simulatorType === 'trade-bills'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Trade Bills
              </button>
              <button
                onClick={() => setSimulatorType('renewal')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  simulatorType === 'renewal'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Renewal of Bills
              </button>
              <button
                onClick={() => setSimulatorType('accommodation')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  simulatorType === 'accommodation'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Accommodation Bills
              </button>
            </div>
          </div>

          {simulatorType === 'trade-bills' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Trade Bills Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bill Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={billAmount}
                      onChange={(e) => setBillAmount(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter bill amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Period (days)
                    </label>
                    <input
                      type="number"
                      value={billPeriod}
                      onChange={(e) => setBillPeriod(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter period in days"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Rate (% p.a.)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={discountRate}
                      onChange={(e) => setDiscountRate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter discount rate"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter commission rate"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Step-by-Step Calculation</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">1. Bill Amount</h4>
                    <p className="text-lg">₹{tradeResults.billAmount.toLocaleString()}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">2. Discount Calculation</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = (Amount × Rate × Period) / (100 × 365)
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = ({billAmount} × {discountRate} × {billPeriod}) / (100 × 365)
                    </p>
                    <p className="text-lg font-semibold">₹{tradeResults.discountAmount}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">3. Commission</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = (Amount × Commission Rate) / 100
                    </p>
                    <p className="text-lg font-semibold">₹{tradeResults.commissionAmount}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">4. Net Amount Received</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Bill Amount - Discount - Commission
                    </p>
                    <p className="text-xl font-bold">₹{tradeResults.netAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {simulatorType === 'renewal' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Bill Renewal Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Bill Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={originalAmount}
                      onChange={(e) => setOriginalAmount(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter original amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate (% p.a.)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter interest rate"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Renewal Period (months)
                    </label>
                    <input
                      type="number"
                      value={renewalPeriod}
                      onChange={(e) => setRenewalPeriod(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter renewal period"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cash Paid (₹)
                    </label>
                    <input
                      type="number"
                      value={cashPaid}
                      onChange={(e) => setCashPaid(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter cash paid"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Step-by-Step Calculation</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">1. Original Amount</h4>
                    <p className="text-lg">₹{renewalResults.originalAmount.toLocaleString()}</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">2. Interest Calculation</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = (Amount × Rate × Period) / (100 × 12)
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = ({originalAmount} × {interestRate} × {renewalPeriod}) / (100 × 12)
                    </p>
                    <p className="text-lg font-semibold">₹{renewalResults.interest}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">3. Cash Paid</h4>
                    <p className="text-lg">₹{renewalResults.cashPaid.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">4. New Bill Amount</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Original Amount + Interest - Cash Paid
                    </p>
                    <p className="text-xl font-bold">₹{renewalResults.newBillAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {simulatorType === 'accommodation' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Accommodation Bills Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bill Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={accommodationAmount}
                      onChange={(e) => setAccommodationAmount(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter accommodation bill amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Period (days)
                    </label>
                    <input
                      type="number"
                      value={accommodationPeriod}
                      onChange={(e) => setAccommodationPeriod(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter period in days"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Rate (% p.a.)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={accommodationRate}
                      onChange={(e) => setAccommodationRate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter discount rate"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Charges & Expenses (₹)
                    </label>
                    <input
                      type="number"
                      value={accommodationExpenses}
                      onChange={(e) => setAccommodationExpenses(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter bank charges and expenses"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Step-by-Step Calculation</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">1. Bill Amount</h4>
                    <p className="text-lg">₹{accommodationResults.billAmount.toLocaleString()}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">2. Discount Calculation</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = (Amount × Rate × Period) / (100 × 365)
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = ({accommodationAmount} × {accommodationRate} × {accommodationPeriod}) / (100 × 365)
                    </p>
                    <p className="text-lg font-semibold">₹{accommodationResults.discountAmount}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">3. Bank Charges & Expenses</h4>
                    <p className="text-lg font-semibold">₹{accommodationResults.expenses}</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">4. Total Cost</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Discount + Bank Charges & Expenses
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      = {accommodationResults.discountAmount} + {accommodationResults.expenses}
                    </p>
                    <p className="text-lg font-semibold">₹{accommodationResults.totalCost}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">5. Net Cash Received</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Bill Amount - Discount - Expenses
                    </p>
                    <p className="text-xl font-bold">₹{accommodationResults.netCashReceived}</p>
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

export default BillsOfExchange;