import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Member, MembershipStatus } from '../types';
import Modal from '../components/Modal';
import MemberForm from '../components/MemberForm';
import { PlusIcon } from '../components/icons';

const API_URL = 'http://localhost:5001/api/members';

const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch data from server.');
      }
      const data = await response.json();
      setMembers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);
  
  const handleSubmit = async (memberData: Omit<Member, 'id' | 'joinDate' | 'avatarUrl'> & { id?: string }) => {
    const isUpdating = !!memberData.id;
    const url = isUpdating ? `${API_URL}/${memberData.id}` : API_URL;
    const method = isUpdating ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(memberData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Failed to ${isUpdating ? 'update' : 'add'} member.`);
        }
        
        await fetchMembers(); // Re-fetch all members to get the latest state
        setIsModalOpen(false);
        setEditingMember(null);

    } catch (err: any) {
        alert(`Error: ${err.message}`); // Simple error feedback
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete member.');
            }
            // No need to re-fetch, just remove from local state for faster UI update
            setMembers(members.filter(m => m.id !== id));
        } catch (err: any) {
             alert(`Error: ${err.message}`);
        }
    }
  };

  const openEditModal = (member: Member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const filteredMembers = useMemo(() =>
    members.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [members, searchTerm]
  );
  
  const getStatusChip = (status: MembershipStatus) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
    switch (status) {
      case MembershipStatus.Active: return `${baseClasses} bg-green-500/20 text-green-400`;
      case MembershipStatus.Inactive: return `${baseClasses} bg-gray-500/20 text-gray-400`;
      case MembershipStatus.Frozen: return `${baseClasses} bg-blue-500/20 text-blue-400`;
      default: return "";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-brand-text-light">Members</h1>
          <div className="w-full md:w-auto flex gap-4">
            <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 bg-brand-surface border-brand-secondary text-brand-text-light rounded-md px-4 py-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"
            />
            <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 rounded-md bg-brand-primary text-white hover:bg-brand-primary-hover transition-colors font-semibold shadow">
                <PlusIcon className="w-5 h-5"/>
                <span className="hidden sm:inline">Add Member</span>
            </button>
        </div>
      </div>

      <div className="bg-brand-surface rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-brand-secondary">
            <tr>
              <th className="p-4 text-sm font-semibold text-brand-text-dark">Name</th>
              <th className="p-4 text-sm font-semibold text-brand-text-dark hidden sm:table-cell">Join Date</th>
              <th className="p-4 text-sm font-semibold text-brand-text-dark">Status</th>
              <th className="p-4 text-sm font-semibold text-brand-text-dark">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={4} className="text-center p-6 text-brand-text-dark">Loading members...</td></tr>}
            {error && <tr><td colSpan={4} className="text-center p-6 text-brand-danger">{error}</td></tr>}
            {!loading && !error && filteredMembers.map(member => (
              <tr key={member.id} className="border-b border-brand-secondary hover:bg-brand-secondary/30 transition-colors">
                <td className="p-4 flex items-center">
                  <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full mr-4"/>
                  <div>
                    <p className="font-medium text-brand-text-light">{member.name}</p>
                    <p className="text-sm text-brand-text-dark">{member.email}</p>
                  </div>
                </td>
                <td className="p-4 text-brand-text-light hidden sm:table-cell">{new Date(member.joinDate).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={getStatusChip(member.membershipStatus)}>{member.membershipStatus}</span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(member)} className="text-brand-primary hover:text-brand-primary-hover"><i className="fas fa-pencil-alt"></i></button>
                    <button onClick={() => handleDeleteMember(member.id)} className="text-brand-danger hover:opacity-80"><i className="fas fa-trash-alt"></i></button>
                  </div>
                </td>
              </tr>
            ))}
             {!loading && !error && filteredMembers.length === 0 && (
                <tr>
                    <td colSpan={4} className="text-center p-6 text-brand-text-dark">No members found.</td>
                </tr>
             )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingMember ? 'Edit Member' : 'Add New Member'}>
        <MemberForm onSubmit={handleSubmit} onCancel={() => setIsModalOpen(false)} initialData={editingMember} />
      </Modal>
    </div>
  );
};

export default Members;