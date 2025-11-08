
import React, { useState, useMemo, useEffect } from 'react';
import { Payment } from '../types';
import { api } from '../utils/api';
import Loading from '../components/Loading';

const Billing: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const data = await api.get<Payment[]>('/payments');
        setPayments(data);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const filteredPayments = useMemo(() =>
    payments.filter(payment =>
      payment.memberName.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [payments, searchTerm]
  );
  
  const getStatusChip = (status: Payment['status']) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
    switch (status) {
      case 'Paid': return `${baseClasses} bg-green-500/20 text-green-400`;
      case 'Pending': return `${baseClasses} bg-yellow-500/20 text-yellow-400`;
      case 'Failed': return `${baseClasses} bg-red-500/20 text-red-400`;
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-brand-text-light">Billing</h1>
          <input
              type="text"
              placeholder="Search by member name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 bg-brand-surface border-brand-secondary text-brand-text-light rounded-md px-4 py-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"
          />
      </div>

      <div className="bg-brand-surface rounded-xl shadow-lg overflow-x-auto">
        {loading ? <Loading /> : (
          <table className="w-full text-left">
            <thead className="border-b border-brand-secondary">
              <tr>
                <th className="p-4 text-sm font-semibold text-brand-text-dark">Member Name</th>
                <th className="p-4 text-sm font-semibold text-brand-text-dark hidden sm:table-cell">Payment ID</th>
                <th className="p-4 text-sm font-semibold text-brand-text-dark">Date</th>
                <th className="p-4 text-sm font-semibold text-brand-text-dark">Amount</th>
                <th className="p-4 text-sm font-semibold text-brand-text-dark">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(payment => (
                <tr key={payment.id} className="border-b border-brand-secondary hover:bg-brand-secondary/30 transition-colors">
                  <td className="p-4 font-medium text-brand-text-light">{payment.memberName}</td>
                  <td className="p-4 text-brand-text-dark font-mono hidden sm:table-cell">{payment.id}</td>
                  <td className="p-4 text-brand-text-light">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="p-4 text-brand-text-light">${payment.amount.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={getStatusChip(payment.status)}>{payment.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Billing;