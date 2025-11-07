import React, { useState, useEffect } from 'react';
import { Member, MembershipStatus, MealPlan } from '../types';

interface MemberFormProps {
  onSubmit: (member: Omit<Member, 'id' | 'joinDate' | 'avatarUrl'> & { id?: string }) => void;
  onCancel: () => void;
  initialData?: Member | null;
  mealPlans: MealPlan[];
}

const MemberForm: React.FC<MemberFormProps> = ({ onSubmit, onCancel, initialData, mealPlans }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [membershipStatus, setMembershipStatus] = useState<MembershipStatus>(MembershipStatus.Active);
  const [assignedMealPlanId, setAssignedMealPlanId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setMembershipStatus(initialData.membershipStatus);
      setAssignedMealPlanId(initialData.assignedMealPlanId);
    } else {
      setName('');
      setEmail('');
      setMembershipStatus(MembershipStatus.Active);
      setAssignedMealPlanId(undefined);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const memberData: Omit<Member, 'id' | 'joinDate' | 'avatarUrl'> & { id?: string } = { 
        name, 
        email, 
        membershipStatus,
        assignedMealPlanId: assignedMealPlanId === 'none' ? undefined : assignedMealPlanId
    };
    if (initialData?.id) {
        memberData.id = initialData.id;
    }
    onSubmit(memberData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-brand-text-dark mb-2">Full Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-brand-secondary border-brand-secondary text-brand-text-light rounded-md p-3 focus:ring-2 focus:ring-brand-primary focus:outline-none"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-text-dark mb-2">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-brand-secondary border-brand-secondary text-brand-text-light rounded-md p-3 focus:ring-2 focus:ring-brand-primary focus:outline-none"
          required
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-brand-text-dark mb-2">Membership Status</label>
        <select
          id="status"
          value={membershipStatus}
          onChange={(e) => setMembershipStatus(e.target.value as MembershipStatus)}
          className="w-full bg-brand-secondary border-brand-secondary text-brand-text-light rounded-md p-3 focus:ring-2 focus:ring-brand-primary focus:outline-none"
        >
          {Object.values(MembershipStatus).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
       <div>
        <label htmlFor="mealPlan" className="block text-sm font-medium text-brand-text-dark mb-2">Assign Meal Plan</label>
        <select
          id="mealPlan"
          value={assignedMealPlanId || 'none'}
          onChange={(e) => setAssignedMealPlanId(e.target.value)}
          className="w-full bg-brand-secondary border-brand-secondary text-brand-text-light rounded-md p-3 focus:ring-2 focus:ring-brand-primary focus:outline-none"
        >
          <option value="none">None</option>
          {mealPlans.map(plan => (
            <option key={plan.id} value={plan.id}>{plan.name} ({plan.type})</option>
          ))}
        </select>
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onCancel} className="px-6 py-2 rounded-md bg-brand-secondary text-brand-text-light hover:bg-slate-600 transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 rounded-md bg-brand-primary text-white hover:bg-brand-primary-hover transition-colors font-semibold">
          {initialData ? 'Save Changes' : 'Add Member'}
        </button>
      </div>
    </form>
  );
};

export default MemberForm;