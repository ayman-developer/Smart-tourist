import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Plus, 
  Trash2, 
  X, 
  RefreshCw, 
  TrendingUp, 
  PieChart, 
  Hotel, 
  Utensils, 
  Navigation, 
  Ticket, 
  ShoppingBag 
} from 'lucide-react';

const ExpenseTrackerModal = ({ isOpen, onClose }) => {
  // Currency Converter State
  const [foreignAmount, setForeignAmount] = useState(50);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  // Rates against INR (₹)
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

  // Expenses State (saved in localStorage)
  const [budgetLimit, setBudgetLimit] = useState(() => {
    return parseInt(localStorage.getItem('tourist_budget_limit') || '10000');
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('tourist_expenses');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Hotel Residency Stay', category: 'Hotel', amount: 2400 },
      { id: 2, title: 'Kongu Biryani & Coffee', category: 'Food', amount: 550 },
      { id: 3, title: 'Taxi to Viewpoint', category: 'Transport', amount: 350 }
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
      case 'Hotel': return <Hotel size={13} color="var(--primary)" />;
      case 'Food': return <Utensils size={13} color="#f59e0b" />;
      case 'Transport': return <Navigation size={13} color="#38bdf8" />;
      case 'Tickets': return <Ticket size={13} color="#ec4899" />;
      default: return <ShoppingBag size={13} color="#a855f7" />;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(6, 8, 12, 0.88)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '680px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '28px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'var(--primary)', padding: '6px', borderRadius: '8px', color: '#06080c' }}>
              <DollarSign size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'white' }}>
                Currency & Expense Tracker
              </h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                Live Foreign Exchange & Trip Spending Log
              </span>
            </div>
          </div>
          <button onClick={onClose} className="icon-btn" style={{ width: '32px', height: '32px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Foreign Currency Converter (Idea 10) */}
        <div style={{ background: 'rgba(6, 8, 12, 0.6)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '16px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
            Live Foreign Currency Converter
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '12px', alignItems: 'center' }}>
            <div>
              <input 
                type="number" 
                value={foreignAmount} 
                onChange={(e) => setForeignAmount(parseFloat(e.target.value) || 0)}
                className="glass-input"
                style={{ padding: '8px 12px', fontSize: '0.85rem' }}
              />
            </div>
            <div>
              <select 
                value={selectedCurrency} 
                onChange={(e) => setSelectedCurrency(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(6, 8, 12, 0.7)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '10px',
                  color: 'white',
                  fontSize: '0.82rem',
                  outline: 'none'
                }}
              >
                {Object.keys(exchangeRates).map(cur => (
                  <option key={cur} value={cur} style={{ background: '#06080c' }}>{cur} (1 = ₹{exchangeRates[cur]})</option>
                ))}
              </select>
            </div>
            <div style={{ background: 'rgba(0, 229, 255, 0.08)', border: '1px solid var(--accent-cyan)', borderRadius: '12px', padding: '8px 12px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>Equals INR</span>
              <strong style={{ fontSize: '1rem', color: 'var(--primary)' }}>₹{convertedInr.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* Budget Progress Bar */}
        <div style={{ background: 'rgba(6, 8, 12, 0.6)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Spent</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white', margin: 0 }}>₹{totalSpent.toLocaleString()}</h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Trip Budget Limit</span>
              <input 
                type="number" 
                value={budgetLimit} 
                onChange={(e) => setBudgetLimit(parseInt(e.target.value) || 0)}
                style={{ width: '90px', background: 'none', border: 'none', borderBottom: '1px solid var(--accent-cyan)', color: 'var(--primary)', fontWeight: 800, textAlign: 'right', fontSize: '1rem', outline: 'none' }}
              />
            </div>
          </div>

          {/* Progress track */}
          <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ 
              height: '100%', 
              width: `${budgetPercentage}%`, 
              background: budgetPercentage > 90 ? '#ef4444' : 'var(--primary)',
              borderRadius: '10px',
              transition: 'width 0.3s ease',
              boxShadow: '0 0 10px var(--accent-cyan)'
            }} />
          </div>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
            {budgetPercentage}% of trip budget utilized ({budgetLimit - totalSpent >= 0 ? `₹${(budgetLimit - totalSpent).toLocaleString()} remaining` : `Exceeded by ₹${(totalSpent - budgetLimit).toLocaleString()}`})
          </span>
        </div>

        {/* Add Expense Form */}
        <form onSubmit={handleAddExpense} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '8px' }}>
          <input 
            type="text" 
            placeholder="Expense title..." 
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)}
            className="glass-input"
            style={{ padding: '8px 12px', fontSize: '0.78rem' }}
          />
          <select 
            value={newCategory} 
            onChange={(e) => setNewCategory(e.target.value)}
            style={{
              background: 'rgba(6, 8, 12, 0.7)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '8px',
              color: 'white',
              fontSize: '0.78rem',
              outline: 'none'
            }}
          >
            <option value="Food" style={{ background: '#06080c' }}>Food</option>
            <option value="Hotel" style={{ background: '#06080c' }}>Hotel</option>
            <option value="Transport" style={{ background: '#06080c' }}>Transport</option>
            <option value="Tickets" style={{ background: '#06080c' }}>Tickets</option>
            <option value="Shopping" style={{ background: '#06080c' }}>Shopping</option>
          </select>
          <input 
            type="number" 
            placeholder="Amount ₹" 
            value={newAmount} 
            onChange={(e) => setNewAmount(e.target.value)}
            className="glass-input"
            style={{ padding: '8px 12px', fontSize: '0.78rem' }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '8px 14px' }}>
            <Plus size={16} />
          </button>
        </form>

        {/* Expenses List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
          {expenses.map(item => (
            <div key={item.id} className="glass" style={{ padding: '10px 14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '8px' }}>
                  {getCategoryIcon(item.category)}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 800, color: 'white' }}>{item.title}</h4>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{item.category}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <strong style={{ fontSize: '0.88rem', color: 'var(--primary)' }}>₹{item.amount.toLocaleString()}</strong>
                <button onClick={() => handleDeleteExpense(item.id)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                  <Trash2 size={14} />
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
