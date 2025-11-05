const MembershipStatus = {
  Active: 'Active',
  Inactive: 'Inactive',
  Frozen: 'Frozen',
};

const mockMembers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', joinDate: '2023-01-15', membershipStatus: MembershipStatus.Active, avatarUrl: 'https://picsum.photos/seed/1/200' },
  { id: '2', name: 'Bob Williams', email: 'bob@example.com', joinDate: '2023-02-20', membershipStatus: MembershipStatus.Active, avatarUrl: 'https://picsum.photos/seed/2/200' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', joinDate: '2022-11-05', membershipStatus: MembershipStatus.Inactive, avatarUrl: 'https://picsum.photos/seed/3/200' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', joinDate: '2023-03-10', membershipStatus: MembershipStatus.Active, avatarUrl: 'https://picsum.photos/seed/4/200' },
  { id: '5', name: 'Ethan Hunt', email: 'ethan@example.com', joinDate: '2023-05-01', membershipStatus: MembershipStatus.Frozen, avatarUrl: 'https://picsum.photos/seed/5/200' },
  { id: '6', name: 'Fiona Glenanne', email: 'fiona@example.com', joinDate: '2023-06-12', membershipStatus: MembershipStatus.Active, avatarUrl: 'https://picsum.photos/seed/6/200' },
];

module.exports = {
    mockMembers,
    MembershipStatus
};
