import React, { useState } from 'react';
import { Calculator, BookOpen } from 'lucide-react';

const NonProfitOrganizations: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'definition' | 'simulator'>('definition');
  const [simulatorType, setSimulatorType] = useState<'receipts' | 'income' | 'balance'>('receipts');
  
  // Receipts & Payments State
  const [openingCash, setOpeningCash] = useState<string>('');
  const [subscriptions, setSubscriptions] = useState<string>('');
  const [donations, setDonations] = useState<string>('');
  const [otherReceipts, setOtherReceipts] = useState<string>('');
  const [salaries, setSalaries] = useState<string>('');
  const [rent, setRent] = useState<string>('');
  const [otherPayments, setOtherPayments] = useState<string>('');

  // Income & Expenditure State
  const [subscriptionIncome, setSubscriptionIncome] = useState<string>('');
  const [donationIncome, setDonationIncome] = useState<string>('');
  const [otherIncome, setOtherIncome] = useState<string>('');
  const [salaryExpense, setSalaryExpense] = useState<string>('');
  const [rentExpense, setRentExpense] = useState<string>('');
  const [otherExpenses, setOtherExpenses] = useState<string>('');

  // Balance Sheet State
  const [fixedAssets, setFixedAssets] = useState<string>('');
  const [currentAssets, setCurrentAssets] = useState<string>('');
  const [currentLiabilities, setCurrentLiabilities] = useState<string>('');
  const [surplus, setSurplus] = useState<string>('');

  const calculateReceiptsPayments = () => {
    const opening = parseFloat(openingCash) || 0;
    const subs = parseFloat(subscriptions) || 0;
    const don = parseFloat(donations) || 0;
    const otherR = parseFloat(otherReceipts) || 0;
    const sal = parseFloat(salaries) || 0;
    const rentP = parseFloat(rent) || 0;
    const otherP = parseFloat(otherPayments) || 0;

    const totalReceipts = opening + subs + don + otherR;
    const totalPayments = sal + rentP + otherP;
    const closingCash = totalReceipts - totalPayments;

    return {
      totalReceipts: totalReceipts.toFixed(2),
      totalPayments: totalPayments.toFixed(2),
      closingCash: closingCash.toFixed(2)
    };
  };

  const calculateIncomeExpenditure = () => {
    const subsInc = parseFloat(subscriptionIncome) || 0;
    const donInc = parseFloat(donationIncome) || 0;
    const otherInc = parseFloat(otherIncome) || 0;
    const salExp = parseFloat(salaryExpense) || 0;
    const rentExp = parseFloat(rentExpense) || 0;
    const otherExp = parseFloat(otherExpenses) || 0;

    const totalIncome = subsInc + donInc + otherInc;
    const totalExpenditure = salExp + rentExp + otherExp;
    const surplusDeficit = totalIncome - totalExpenditure;

    return {
      totalIncome: totalIncome.toFixed(2),
      totalExpenditure: totalExpenditure.toFixed(2),
      surplusDeficit: surplusDeficit.toFixed(2)
    };
  };

  const calculateBalanceSheet = () => {
    const fixed = parseFloat(fixedAssets) || 0;
    const current = parseFloat(currentAssets) || 0;
    const liabilities = parseFloat(currentLiabilities) || 0;
    const surp = parseFloat(surplus) || 0;

    const totalAssets = fixed + current;
    const totalLiabilitiesAndFund = liabilities + surp;

    return {
      totalAssets: totalAssets.toFixed(2),
      totalLiabilitiesAndFund: totalLiabilitiesAndFund.toFixed(2)
    };
  };

  const receiptsResults = calculateReceiptsPayments();
  const incomeResults = calculateIncomeExpenditure();
  const balanceResults = calculateBalanceSheet();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Section Tabs */}
      <div className="flex mb-8 bg-white rounded-lg shadow-sm">
        <button
          onClick={() => setActiveSection('definition')}
          className={`flex-1 py-4 px-6 rounded-l-lg font-semibold transition-all ${
            activeSection === 'definition'
              ? 'bg-teal-600 text-white'
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
              ? 'bg-teal-600 text-white'
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Non-Profit Organizations - Key Concepts</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-teal-600 mb-3">Definition</h3>
                <p className="text-gray-700 leading-relaxed">
                  Non-Profit Organizations (NPOs) are entities formed for the purpose of promoting 
                  art, science, sports, education, research, social welfare, religion, charity, 
                  or any other useful purpose. They are not formed to earn profit and any surplus 
                  generated is used for the welfare of the organization and society.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-teal-600 mb-3">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-teal-800 mb-2">✓ Service Motive</h4>
                    <p className="text-sm text-gray-700">Primary aim is to serve society, not profit</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">✓ Surplus Utilization</h4>
                    <p className="text-sm text-gray-700">Surplus used for organizational purposes</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">✓ Membership Based</h4>
                    <p className="text-sm text-gray-700">Usually have members who contribute</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">✓ Tax Exemptions</h4>
                    <p className="text-sm text-gray-700">Eligible for various tax benefits</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-teal-600 mb-3">Types of Non-Profit Organizations</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Clubs</h4>
                    <p className="text-sm text-gray-600">Sports clubs, social clubs, hobby clubs</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Societies</h4>
                    <p className="text-sm text-gray-600">Educational, cultural, charitable societies</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Trusts</h4>
                    <p className="text-sm text-gray-600">Religious, charitable trusts</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-teal-600 mb-3">Financial Statements</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-teal-500 pl-4">
                    <h4 className="font-semibold text-gray-800">1. Receipts and Payments Account</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      • Summary of cash and bank transactions during the year
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      • Similar to Cash Book, shows opening balance, receipts, payments, and closing balance
                    </p>
                    <p className="text-sm text-gray-600">
                      • Includes both capital and revenue items
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-800">2. Income and Expenditure Account</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      • Similar to Profit & Loss Account of commercial organizations
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      • Shows only revenue items (income and expenses)
                    </p>
                    <p className="text-sm text-gray-600">
                      • Result is surplus (profit) or deficit (loss)
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-800">3. Balance Sheet</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      • Shows financial position on a particular date
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      • Assets side shows fixed assets, current assets, etc.
                    </p>
                    <p className="text-sm text-gray-600">
                      • Liabilities side shows funds, reserves, and liabilities
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-teal-600 mb-3">Key Differences from Commercial Organizations</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-3 text-left">Aspect</th>
                        <th className="border border-gray-300 p-3 text-left">Non-Profit</th>
                        <th className="border border-gray-300 p-3 text-left">Commercial</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Objective</td>
                        <td className="border border-gray-300 p-3">Service to society</td>
                        <td className="border border-gray-300 p-3">Profit maximization</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Result</td>
                        <td className="border border-gray-300 p-3">Surplus or Deficit</td>
                        <td className="border border-gray-300 p-3">Profit or Loss</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Capital</td>
                        <td className="border border-gray-300 p-3">Funds from donations, subscriptions</td>
                        <td className="border border-gray-300 p-3">Paid-up capital from shareholders</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 font-semibold">Main Statement</td>
                        <td className="border border-gray-300 p-3">Income & Expenditure Account</td>
                        <td className="border border-gray-300 p-3">Profit & Loss Account</td>
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
            <h3 className="text-lg font-semibold mb-4">Select Statement Type</h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setSimulatorType('receipts')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  simulatorType === 'receipts'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Receipts & Payments
              </button>
              <button
                onClick={() => setSimulatorType('income')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  simulatorType === 'income'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Income & Expenditure
              </button>
              <button
                onClick={() => setSimulatorType('balance')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  simulatorType === 'balance'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Balance Sheet
              </button>
            </div>
          </div>

          {simulatorType === 'receipts' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Receipts & Payments Account</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opening Cash & Bank (₹)
                    </label>
                    <input
                      type="number"
                      value={openingCash}
                      onChange={(e) => setOpeningCash(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter opening balance"
                    />
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Receipts</h4>
                    <div className="space-y-3">
                      <input
                        type="number"
                        value={subscriptions}
                        onChange={(e) => setSubscriptions(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Subscriptions received"
                      />
                      <input
                        type="number"
                        value={donations}
                        onChange={(e) => setDonations(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Donations received"
                      />
                      <input
                        type="number"
                        value={otherReceipts}
                        onChange={(e) => setOtherReceipts(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Other receipts"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Payments</h4>
                    <div className="space-y-3">
                      <input
                        type="number"
                        value={salaries}
                        onChange={(e) => setSalaries(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Salaries paid"
                      />
                      <input
                        type="number"
                        value={rent}
                        onChange={(e) => setRent(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Rent paid"
                      />
                      <input
                        type="number"
                        value={otherPayments}
                        onChange={(e) => setOtherPayments(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Other payments"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Account Summary</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Total Receipts</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Opening Balance: ₹{openingCash}</p>
                      <p>Subscriptions: ₹{subscriptions}</p>
                      <p>Donations: ₹{donations}</p>
                      <p>Other Receipts: ₹{otherReceipts}</p>
                      <hr className="my-2" />
                      <p className="font-semibold text-lg">Total: ₹{receiptsResults.totalReceipts}</p>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Total Payments</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Salaries: ₹{salaries}</p>
                      <p>Rent: ₹{rent}</p>
                      <p>Other Payments: ₹{otherPayments}</p>
                      <hr className="my-2" />
                      <p className="font-semibold text-lg">Total: ₹{receiptsResults.totalPayments}</p>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Closing Cash & Bank</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Total Receipts - Total Payments
                    </p>
                    <p className="text-xl font-bold">₹{receiptsResults.closingCash}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {simulatorType === 'income' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Income & Expenditure Account</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Income</h4>
                    <div className="space-y-3">
                      <input
                        type="number"
                        value={subscriptionIncome}
                        onChange={(e) => setSubscriptionIncome(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Subscription income"
                      />
                      <input
                        type="number"
                        value={donationIncome}
                        onChange={(e) => setDonationIncome(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Donation income"
                      />
                      <input
                        type="number"
                        value={otherIncome}
                        onChange={(e) => setOtherIncome(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Other income"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Expenditure</h4>
                    <div className="space-y-3">
                      <input
                        type="number"
                        value={salaryExpense}
                        onChange={(e) => setSalaryExpense(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Salary expenses"
                      />
                      <input
                        type="number"
                        value={rentExpense}
                        onChange={(e) => setRentExpense(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Rent expenses"
                      />
                      <input
                        type="number"
                        value={otherExpenses}
                        onChange={(e) => setOtherExpenses(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Other expenses"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Account Summary</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Total Income</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Subscription Income: ₹{subscriptionIncome}</p>
                      <p>Donation Income: ₹{donationIncome}</p>
                      <p>Other Income: ₹{otherIncome}</p>
                      <hr className="my-2" />
                      <p className="font-semibold text-lg">Total: ₹{incomeResults.totalIncome}</p>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Total Expenditure</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Salary Expenses: ₹{salaryExpense}</p>
                      <p>Rent Expenses: ₹{rentExpense}</p>
                      <p>Other Expenses: ₹{otherExpenses}</p>
                      <hr className="my-2" />
                      <p className="font-semibold text-lg">Total: ₹{incomeResults.totalExpenditure}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      {parseFloat(incomeResults.surplusDeficit) >= 0 ? 'Surplus' : 'Deficit'}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">
                      = Total Income - Total Expenditure
                    </p>
                    <p className="text-xl font-bold">
                      ₹{Math.abs(parseFloat(incomeResults.surplusDeficit)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {simulatorType === 'balance' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Balance Sheet Data</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Assets</h4>
                    <div className="space-y-3">
                      <input
                        type="number"
                        value={fixedAssets}
                        onChange={(e) => setFixedAssets(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Fixed assets value"
                      />
                      <input
                        type="number"
                        value={currentAssets}
                        onChange={(e) => setCurrentAssets(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Current assets value"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Liabilities & Fund</h4>
                    <div className="space-y-3">
                      <input
                        type="number"
                        value={currentLiabilities}
                        onChange={(e) => setCurrentLiabilities(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Current liabilities"
                      />
                      <input
                        type="number"
                        value={surplus}
                        onChange={(e) => setSurplus(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Capital fund/surplus"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Balance Sheet</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Assets Side</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Fixed Assets: ₹{fixedAssets}</p>
                      <p>Current Assets: ₹{currentAssets}</p>
                      <hr className="my-2" />
                      <p className="font-semibold text-lg">Total Assets: ₹{balanceResults.totalAssets}</p>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Liabilities & Fund Side</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Capital Fund/Surplus: ₹{surplus}</p>
                      <p>Current Liabilities: ₹{currentLiabilities}</p>
                      <hr className="my-2" />
                      <p className="font-semibold text-lg">Total: ₹{balanceResults.totalLiabilitiesAndFund}</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Balance Check</h4>
                    <p className="text-sm text-gray-600">
                      {balanceResults.totalAssets === balanceResults.totalLiabilitiesAndFund 
                        ? '✅ Balance Sheet is balanced' 
                        : '❌ Balance Sheet is not balanced'}
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

export default NonProfitOrganizations;