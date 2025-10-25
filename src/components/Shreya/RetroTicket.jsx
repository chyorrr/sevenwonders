import React, { useState } from 'react';
import './RetroTicket.css';

export default function RetroTicket({ onSave }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    visitors: 1,
    classType: 'General',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // simple validation
    if (!form.name || !form.email || !form.date) {
      alert('Please fill name, email and date');
      return;
    }
    onSave && onSave(form);
    alert('Ticket saved to preview below');
  };

  return (
    <div className="retro-ticket-wrapper">
      <form className="ticket-form" onSubmit={handleSubmit} aria-label="Ticket booking form">
        <h2 className="ticket-title">Taj Mahal — Vintage Ticket</h2>

        <label className="field">
          <span className="label">Full name</span>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
        </label>

        <label className="field">
          <span className="label">Email</span>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@domain.com" />
        </label>

        <label className="field two-up">
          <span>
            <span className="label">Visit date</span>
            <input name="date" type="date" value={form.date} onChange={handleChange} />
          </span>

          <span>
            <span className="label">Visitors</span>
            <input name="visitors" type="number" min="1" value={form.visitors} onChange={handleChange} />
          </span>
        </label>

        <label className="field">
          <span className="label">Ticket class</span>
          <select name="classType" value={form.classType} onChange={handleChange}>
            <option>General</option>
            <option>Guided</option>
            <option>VIP</option>
          </select>
        </label>

        <label className="field">
          <span className="label">Notes</span>
          <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any special requests" rows={3} />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn-primary">Save Ticket</button>
        </div>
      </form>

      <aside className="ticket-preview" aria-hidden="false">
        <div className="ticket-inner">
          <div className="ticket-left">
            <h3 className="ticket-place">Taj Mahal</h3>
            <p className="ticket-sub">A Monument of Eternal Love</p>
            <div className="ticket-meta">
              <div>
                <div className="meta-label">Name</div>
                <div className="meta-value">{form.name || '—'}</div>
              </div>

              <div>
                <div className="meta-label">Date</div>
                <div className="meta-value">{form.date || '—'}</div>
              </div>
            </div>
          </div>

          <div className="ticket-right">
            <div className="ticket-code">#{(form.name || 'GUEST').slice(0,3).toUpperCase()}-{(form.date || '0000').replace(/-/g, '')}</div>
            <div className="ticket-class">{form.classType}</div>
            <div className="ticket-visitors">{form.visitors} visitor(s)</div>
          </div>
        </div>

        <div className="ticket-footer">{form.notes || 'Have a safe and memorable visit.'}</div>
      </aside>
    </div>
  );
}
