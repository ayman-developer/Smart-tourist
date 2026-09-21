import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Plus, 
  Trash2, 
  X, 
  Hotel, 
  Utensils, 
  Navigation, 
  Ticket, 
  ShoppingBag 
} from 'lucide-react';

const ExpenseTrackerModal = ({ isOpen, onClose }) => {
  const [foreignAmount, setForeignAmount] = useState(50);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const exchangeRates = {
    USD: 83.5,
    EUR: 90.2,
    GBP: 106.1,
    AED: 22.7,
    SGD: 62.4,
    JPY: 0.54,
    CAD: 61.2,
    AUD: 55.3
  };

  const [budgetLimit, setBudgetLimit] = useState(() => {
    return parseInt(localStorage.getItem('tourist_budget_limit') || '10000');
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('tourist_expenses');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'The Residency Suites Stay', category: 'Hotel', amount: 2400 },
      { id: 2, title: 'Annapoorna Ghee Roast & Kaapi', category: 'Food', amount: 450 },
      { id: 3, title: 'Taxi to Marudhamalai Hilltop', category: 'Transport', amount: 350 }
    ];
  });

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Food');
  const [newAmount, setNewAmount] = useState('');

  useEffect(() => {
    localStorage.setItem('tourist_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('tourist_budget_limit', budgetLimit.toString());
  }, [budgetLimit]);

  if (!isOpen) return null;

  const convertedInr = Math.round(foreignAmount * (exchangeRates[selectedCurrency] || 1));
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const budgetPercentage = Math.min(100, Math.round((totalSpent / (budgetLimit || 1)) * 100));

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newTitle || !newAmount) return;
    const item = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      amount: parseFloat(newAmount)
    };
    setExpenses([item, ...expenses]);
    setNewTitle('');
    setNewAmount('');
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Hotel': return <Hotel size={14} color="#F59E0B" />;
      case 'Food': return <Utensils size={14} color="#F43F5E" />;
      case 'Transport': return <Navigation size={14} color="#0EA5E9" />;
      case 'Tickets': return <Ticket size={14} color="#EC4899" />;
      default: return <ShoppingBag size={14} color="#8B5CF6" />;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(8, 12, 20, 0.9)',
      backdropFilter: 'blur(24px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '700px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '30px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'var(--amber-gradient)', padding: '8px', borderRadius: '12px', color: '#080C14' }}>
              <DollarSign size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 900, margin: 0, color: 'white' }}>
                Currency Converter & Expense Tracker
              </h2>
              <span style={{ fontSize: '0.74rem', color: '#FBBF24', fontWeight: 700 }}>
                Live Foreign Exchange & Trip Spending Log
              </span>
            </div>
          </div>
          <button onClick={onClose} className="icon-btn" style={{ width: '34px', height: '34px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Currency Converter */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '18px' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '12px' }}>
            Live Foreign Currency Converter
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '12px', alignItems: 'center' }}>
            <div>
              <input 
                type="number" 
                value={foreignAmount} 
                onChange={(e) => setForeignAmount(parseFloat(e.target.value) || 0)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  color: 'white',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
            <div>
              <select 
                value={selectedCurrency} 
                onChange={(e) => setSelectedCurrency(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  color: 'white',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              >
                {Object.keys(exchangeRates).map(cur => (
                  <option key={cur} value={cur} style={{ background: '#0F172A' }}>{cur} (1 = ₹{exchangeRates[cur]})</option>
                ))}
              </select>
            </div>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #F59E0B', borderRadius: '12px', padding: '10px 14px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Equals INR</span>
              <strong style={{ fontSize: '1.1rem', color: '#FBBF24' }}>₹{convertedInr.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* Budget Progress Bar */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Spent</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'white', margin: 0 }}>₹{totalSpent.toLocaleString()}</h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Trip Budget Limit</span>
              <input 
                type="number" 
                value={budgetLimit} 
                onChange={(e) => setBudgetLimit(parseInt(e.target.value) || 0)}
                style={{ width: '100px', background: 'none', border: 'none', borderBottom: '1px solid #F59E0B', color: '#FBBF24', fontWeight: 800, textAlign: 'right', fontSize: '1.1rem', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ 
              height: '100%', 
              width: `${budgetPercentage}%`, 
              background: budgetPercentage > 90 ? '#F43F5E' : 'var(--amber-gradient)',
              borderRadius: '10px',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '8px' }}>
            {budgetPercentage}% of trip budget utilized ({budgetLimit - totalSpent >= 0 ? `₹${(budgetLimit - totalSpent).toLocaleString()} remaining` : `Exceeded by ₹${(totalSpent - budgetLimit).toLocaleString()}`})
          </span>
        </div>

        {/* Add Expense Form */}
        <form onSubmit={handleAddExpense} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Expense title..." 
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '10px 14px',
              color: 'white',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          />
          <select 
            value={newCategory} 
            onChange={(e) => setNewCategory(e.target.value)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '10px',
              color: 'white',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          >
            <option value="Food" style={{ background: '#0F172A' }}>Food</option>
            <option value="Hotel" style={{ background: '#0F172A' }}>Hotel</option>
            <option value="Transport" style={{ background: '#0F172A' }}>Transport</option>
            <option value="Tickets" style={{ background: '#0F172A' }}>Tickets</option>
            <option value="Shopping" style={{ background: '#0F172A' }}>Shopping</option>
          </select>
          <input 
            type="number" 
            placeholder="Amount ₹" 
            value={newAmount} 
            onChange={(e) => setNewAmount(e.target.value)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '10px 14px',
              color: 'white',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '10px 16px' }}>
            <Plus size={16} />
          </button>
        </form>

        {/* Expenses List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
          {expenses.map(item => (
            <div key={item.id} className="glass" style={{ padding: '12px 16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '7px', borderRadius: '8px' }}>
                  {getCategoryIcon(item.category)}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'white' }}>{item.title}</h4>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.category}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <strong style={{ fontSize: '0.95rem', color: '#FBBF24' }}>₹{item.amount.toLocaleString()}</strong>
                <button onClick={() => handleDeleteExpense(item.id)} style={{ background: 'none', border: 'none', color: '#F43F5E', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ExpenseTrackerModal;
