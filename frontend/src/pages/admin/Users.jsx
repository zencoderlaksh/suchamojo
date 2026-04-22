import { useState } from "react";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1-234-567-8901",
    registered: "2024-01-15",
    lastLogin: "2024-07-20",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1-234-567-8902",
    registered: "2024-01-14",
    lastLogin: "2024-07-19",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1-234-567-8903",
    registered: "2024-01-13",
    lastLogin: "2024-07-18",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "+1-234-567-8904",
    registered: "2024-01-12",
    lastLogin: "2024-07-17",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    phone: "+1-234-567-8905",
    registered: "2024-01-11",
    lastLogin: "2024-07-16",
  },
  {
    id: 6,
    name: "Diana Davis",
    email: "diana@example.com",
    phone: "+1-234-567-8906",
    registered: "2024-01-10",
    lastLogin: "2024-07-15",
  },
  {
    id: 7,
    name: "Eve Miller",
    email: "eve@example.com",
    phone: "+1-234-567-8907",
    registered: "2024-01-09",
    lastLogin: "2024-07-14",
  },
  {
    id: 8,
    name: "Frank Garcia",
    email: "frank@example.com",
    phone: "+1-234-567-8908",
    registered: "2024-01-08",
    lastLogin: "2024-07-13",
  },
  {
    id: 9,
    name: "Grace Lee",
    email: "grace@example.com",
    phone: "+1-234-567-8909",
    registered: "2024-01-07",
    lastLogin: "2024-07-12",
  },
  {
    id: 10,
    name: "Henry Taylor",
    email: "henry@example.com",
    phone: "+1-234-567-8910",
    registered: "2024-01-06",
    lastLogin: "2024-07-11",
  },
  // Add more as needed
];

const Users = () => {
  const [filter, setFilter] = useState("");

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase()),
  );

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Registered", "Last Login"];
    const rows = filteredUsers.map((u) => [
      u.name,
      u.email,
      u.phone,
      u.registered,
      u.lastLogin,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "users.csv";
    link.click();
  };

  return (
    <div className="p-6">
      <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-sm tracking-[0.2em] uppercase text-gray-300">
            Users ({filteredUsers.length})
          </h1>
          <div className="flex gap-2">
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search users..."
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-gray-400 w-64 max-w-full"
            />
            <button
              onClick={exportCSV}
              className="text-xs uppercase tracking-[0.15em] bg-white/20 px-4 py-2 rounded-xl hover:bg-white/30"
            >
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs tracking-[0.12em]">
            <thead className="text-gray-400">
              <tr>
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Phone</th>
                <th className="pb-3 pr-4">Registered</th>
                <th className="pb-3">Last Login</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="py-3 pr-4 font-medium">{user.name}</td>
                  <td className="py-3 pr-4">{user.email}</td>
                  <td className="py-3 pr-4">{user.phone}</td>
                  <td className="py-3 pr-4">{user.registered}</td>
                  <td className="py-3">{user.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
