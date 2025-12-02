import React, { useState, useEffect } from 'react';
import CDRView from './components/CDRView';
import TravelHistoryView from './components/TravelHistoryView';

// --- DATA STRUCTURES ---

const USERS = [
  { username: 'aa', password: 'aa', name: 'Muhammad Osama' },
  { username: 'm.daniyal01', password: '123456', name: 'Danish' },
  { username: 'm.akhtar01', password: '123456', name: 'Akhtar Usman' }
];

const PROFILES = {
  "34428645236974": {
    personal: {
      name: "Ijaz Khan",
      dob: "1980-05-20",
      taxPayer: true,
      lastSeenLocation: "Lahore",
      criminalRecord: "Found",
    },
    identity_card_history: {
      issueDate: "2010-01-15",
      renewalDate: "2020-01-15",
      history: [
        { date: "2015-03-01", change: "Address updated (Source: Utility Bill)" },
        { date: "2020-01-15", change: "Biometric renewal" }
      ]
    },
    assets: {
      properties: [
        { type: "Residential Plot", address: "34-4 Main St", status: "Gulberg 3, Gulberg, Lahore" },
        { type: "House", address: "45-B River Block", status: "Bahria Town Lahore" }
      ],
      vehicles: [
        { model: "Toyota Yaris", year: 2022, plate: "XYZ-789", lastSeen: "2 hours ago near Firdous Market Signal" },
        { model: "Honda Civic", year: 2018, plate: "ABC-123", lastSeen: "7 months ago in Bahria Town" }
      ],
      other_assets: ["Stock Portfolio (Value: Rs50K+)", "Private Art Collection"]
    },
    online_presence: {
      isSellingAssetsOnline: true,
      platforms: [
        { platform: "Zameen.com", items: 2, lastActivity: "2025-11-28" },
        { platform: "OLX", items: 1, lastActivity: "2023-10-01" }
      ]
    },
    criminalHistory: [
      { date: "2024-03-10", offense: "Violation of Kite Flying Ban (Punjab Prohibition of Kite Flying Ordinance)", station: "Gulberg PS", status: "Convicted - Fine Paid" }
    ]
  },
  "34428645236976": {
    personal: {
      name: "Maria Ibrahim",
      dob: "1992-08-15",
      taxPayer: false,
      lastSeenLocation: "Karachi",
      criminalRecord: "Found",
    },
    identity_card_history: {
      issueDate: "2012-06-10",
      renewalDate: "2022-06-10",
      history: [
        { date: "2018-11-05", change: "Name change (Marriage)" }
      ]
    },
    assets: {
      properties: [
        { type: "Residential Plot", address: "789 Palm Dr", status: "Karachi" }
      ],
      vehicles: [
        { model: "Toyota Passo", year: 2015, plate: "ELN-456", lastSeen: "10 mins ago at Liberty Station" }
      ],
      other_assets: [""]
    },
    online_presence: {
      isSellingAssetsOnline: false,
      platforms: []
    },
    criminalHistory: []
  },
  "34428645236975": {
    personal: {
      name: "Muhammad Jameel",
      dob: "1975-02-28",
      taxPayer: false,
      lastSeenLocation: "Unknown",
      criminalRecord: "Clear",
    },
    identity_card_history: {
      issueDate: "2005-03-20",
      renewalDate: "Expired",
      history: []
    },
    assets: {
      properties: [],
      vehicles: [],
      other_assets: []
    },
    online_presence: {
      isSellingAssetsOnline: false,
      platforms: []
    },
    criminalHistory: []
  },
  // Generating more dummy profiles...
  ...Array.from({ length: 7 }).reduce((acc, _, i) => {
    const id = (1004 + i).toString();
    acc[id] = {
      personal: {
        name: `Subject ${id}`,
        dob: "1985-01-01",
        taxPayer: true,
        lastSeenLocation: "Various",
        criminalRecord: "Clear",
      },
      identity_card_history: {
        issueDate: "2015-01-01",
        renewalDate: "2025-01-01",
        history: []
      },
      assets: {
        properties: [],
        vehicles: [],
        other_assets: []
      },
      online_presence: {
        isSellingAssetsOnline: false,
        platforms: []
      },
      criminalHistory: []
    };
    return acc;
  }, {})
};

const INITIAL_AUDIT_LOGS = [
  { timestamp: "2025-11-28 10:00", user: "m.osama01", action: "Login successful" },
  { timestamp: "2025-11-28 10:05", user: "m.daniyal01", action: "Searched Profile ID: 34428645236976" },
  { timestamp: "2025-11-28 10:15", user: "m.osama01", action: "Viewed Audit Logs" },
  { timestamp: "2025-11-28 10:30", user: "vieanalystwer", action: "Login successful" },
  { timestamp: "2025-11-28 10:35", user: "m.osama01", action: "Searched Profile ID: 34428645236976" },
  { timestamp: "2025-11-28 11:00", user: "m.osama01", action: "Login successful" },
  { timestamp: "2025-11-28 11:10", user: "m.daniyal01", action: "Searched Profile ID: 0321452364" },
  { timestamp: "2025-11-28 11:20", user: "m.osama01", action: "Exported Report" },
  { timestamp: "2025-11-28 12:00", user: "m.osama01", action: "Daily Backup" },
  { timestamp: "2025-11-28 12:30", user: "admin", action: "Login successful" },
  { timestamp: "2025-11-28 13:00", user: "m.osama01", action: "Searched Profile ID: 34428645236976" },
  { timestamp: "2025-11-28 13:15", user: "m.osama01", action: "Flagged Profile ID: 34428645236976" },
  { timestamp: "2025-11-28 14:00", user: "viewer", action: "Login failed" },
  { timestamp: "2025-11-28 14:05", user: "m.osama01", action: "Login successful" },
];

// --- COMPONENTS ---

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // home, search, audit
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);

  // Login Handler
  const handleLogin = (username, password) => {
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      setCurrentView('home');
      addAuditLog(user.username, "Login successful");
      return true;
    }
    return false;
  };

  // Logout Handler
  const handleLogout = () => {
    addAuditLog(currentUser.username, "Logout");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentView('home');
  };

  // Audit Log Helper
  const addAuditLog = (username, action) => {
    const newLog = {
      timestamp: new Date().toLocaleString(),
      user: username,
      action: action
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar user={currentUser} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-800">
          {currentView === 'home' && <HomeView setView={setCurrentView} />}
          {currentView === 'search' && <SearchView profiles={PROFILES} addLog={(action) => addAuditLog(currentUser.username, action)} />}
          {currentView === 'audit' && <AuditView logs={auditLogs} />}
        </main>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS (Placeholders for now) ---

const LoginPage = ({ onLogin }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Secure Portal Login</h2>
      <LoginForm onLogin={onLogin} />
    </div>
  </div>
);

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onLogin(username, password)) {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
      >
        Login
      </button>
    </form>
  );
};

const Sidebar = ({ currentView, setView }) => (
  <div className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col">
    <div className="p-6">
      <h1 className="text-xl font-bold text-blue-400 tracking-wider">INTEL PORTAL</h1>
    </div>
    <nav className="flex-1 px-4 space-y-2">
      <SidebarLink label="Home" active={currentView === 'home'} onClick={() => setView('home')} />
      <SidebarLink label="Identity Search" active={currentView === 'search'} onClick={() => setView('search')} />
      <SidebarLink label="Audit Logs" active={currentView === 'audit'} onClick={() => setView('audit')} />
    </nav>
  </div>
);

const SidebarLink = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-md transition duration-200 ${active ? 'bg-blue-900/50 text-blue-300 border-l-4 border-blue-500' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
  >
    {label}
  </button>
);

const TopBar = ({ user, onLogout }) => (
  <header className="bg-gray-900 border-b border-gray-700 h-16 flex items-center justify-between px-6">
    <div className="text-gray-400 text-sm">System Status: <span className="text-green-500">Online</span></div>
    <div className="flex items-center space-x-4">
      <div className="text-right">
        <div className="text-sm font-medium text-white">{user.name}</div>
        <div className="text-xs text-gray-500 uppercase">{user.username}</div>
      </div>
      <button
        onClick={onLogout}
        className="bg-red-900/30 hover:bg-red-900/50 text-red-400 px-3 py-1 rounded text-sm border border-red-900 transition"
      >
        Logout
      </button>
    </div>
  </header>
);

const HomeView = ({ setView }) => (
  <div className="h-full flex flex-col items-center justify-center text-center">
    <h2 className="text-4xl font-bold text-white mb-4">Welcome to the Intelligence Portal</h2>
    <p className="text-gray-400 max-w-md mb-8">
      Access restricted identity databases and view system audit logs. All actions are monitored.
    </p>
    <button
      onClick={() => setView('search')}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-200"
    >
      Start Identity Search
    </button>
  </div>
);

const SearchView = ({ profiles, addLog }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [searchMode, setSearchMode] = useState('identity'); // 'identity' or 'cdr'

  const handleSearch = () => {
    if (!query) return;
    setLoading(true);
    setSearched(true);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      const profile = profiles[query];
      setResult(profile || null);
      setLoading(false);
      addLog(`Searched Profile ID: ${query}`);
    }, 1500);
  };


  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter CNIC or Mobile No."
          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-lg disabled:opacity-50 transition"
        >
          {loading ? 'Scanning...' : 'Search'}
        </button>
      </div>

      {!loading && result && (
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSearchMode('identity')}
            className={`flex-1 py-3 rounded-lg font-bold transition ${searchMode === 'identity' ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
          >
            Identity Profile
          </button>
          <button
            onClick={() => setSearchMode('cdr')}
            className={`flex-1 py-3 rounded-lg font-bold transition ${searchMode === 'cdr' ? 'bg-orange-600 text-white shadow-lg ring-2 ring-orange-400' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
          >
            CDR Intel Search
          </button>
          <button
            onClick={() => setSearchMode('travel')}
            className={`flex-1 py-3 rounded-lg font-bold transition ${searchMode === 'travel' ? 'bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-400' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
          >
            Travel History
          </button>
        </div>
      )}

      {searchMode === 'cdr' && <CDRView />}
      {searchMode === 'travel' && <TravelHistoryView />}

      {searchMode === 'identity' && (
        <>
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-blue-400 animate-pulse">Running deep background checks...</p>
            </div>
          )}

          {!loading && searched && !result && (
            <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-8 text-center">
              <h3 className="text-xl text-red-400 font-bold mb-2">Subject Not Found</h3>
              <p className="text-gray-400">No records found for ID: {query}</p>
            </div>
          )}

          {!loading && result && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Identity Overview */}
              <Card title="Identity Overview">
                <div className="space-y-3">
                  <DetailRow label="Full Name" value={result.personal.name} />
                  <DetailRow label="DOB" value={result.personal.dob} />
                  <DetailRow label="Tax Status" value={result.personal.taxPayer ? "Active" : "Inactive"} />
                  <DetailRow label="Last Known Location" value={result.personal.lastSeenLocation} />
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-400">Criminal Record:</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${result.personal.criminalRecord === 'Found' ? 'bg-red-900 text-red-300 animate-pulse' : 'bg-green-900 text-green-300'}`}>
                      {result.personal.criminalRecord === 'Found' ? 'CRIMINAL RECORD FOUND' : 'CLEAR'}
                    </span>
                  </div>
                </div>
              </Card>

              {/* ID History */}
              <Card title="Identity Card History">
                <div className="mb-4">
                  <DetailRow label="Issued" value={result.identity_card_history.issueDate} />
                  <DetailRow label="Renewal" value={result.identity_card_history.renewalDate} />
                </div>
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Change Log</h4>
                <div className="space-y-2">
                  {result.identity_card_history.history.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No history recorded</p>
                  ) : (
                    result.identity_card_history.history.map((h, i) => (
                      <div key={i} className="text-sm bg-gray-700/50 p-2 rounded">
                        <span className="text-blue-400">{h.date}</span>: {h.change}
                      </div>
                    ))
                  )}
                </div>
              </Card>

              {/* Assets Overview */}
              <Card title="Assets Overview">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-700/30 p-4 rounded">
                    <div className="text-2xl font-bold text-white">{result.assets.properties.length}</div>
                    <div className="text-xs text-gray-400 uppercase">Properties</div>
                  </div>
                  <div className="bg-gray-700/30 p-4 rounded">
                    <div className="text-2xl font-bold text-white">{result.assets.vehicles.length}</div>
                    <div className="text-xs text-gray-400 uppercase">Vehicles</div>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Other Assets</h4>
                  <ul className="list-disc list-inside text-sm text-gray-300">
                    {result.assets.other_assets.map((asset, i) => (
                      <li key={i}>{asset}</li>
                    ))}
                  </ul>
                </div>
              </Card>

              {/* Online Presence */}
              <Card title="Online Presence">
                <div className={`p-3 rounded mb-4 text-center ${result.online_presence.isSellingAssetsOnline ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-900/50' : 'bg-green-900/30 text-green-400 border border-green-900/50'}`}>
                  {result.online_presence.isSellingAssetsOnline ? '⚠ Active Seller Activity Detected' : '✓ No Suspicious Activity'}
                </div>
                {result.online_presence.platforms.map((p, i) => (
                  <div key={i} className="flex justify-between items-center text-sm border-b border-gray-700 py-2 last:border-0">
                    <span className="font-medium text-white">{p.platform}</span>
                    <div className="text-right">
                      <div className="text-gray-300">{p.items} items</div>
                      <div className="text-xs text-gray-500">{p.lastActivity}</div>
                    </div>
                  </div>
                ))}
              </Card>

              {/* Detailed Lists (Full Width) */}
              <div className="col-span-1 md:col-span-2">
                <Card title="Property Details">
                  {result.assets.properties.length === 0 ? <p className="text-gray-500 italic">No properties found.</p> : (
                    <table className="w-full text-sm text-left">
                      <thead className="text-gray-500 border-b border-gray-700">
                        <tr>
                          <th className="py-2">Type</th>
                          <th className="py-2">Address</th>
                          <th className="py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        {result.assets.properties.map((p, i) => (
                          <tr key={i} className="border-b border-gray-700/50 last:border-0">
                            <td className="py-2">{p.type}</td>
                            <td className="py-2">{p.address}</td>
                            <td className="py-2"><span className="bg-gray-700 px-2 py-0.5 rounded text-xs">{p.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </Card>
              </div>

              <div className="col-span-1 md:col-span-2">
                <Card title="Criminal History">
                  {(!result.criminalHistory || result.criminalHistory.length === 0) ? <p className="text-gray-500 italic">No criminal history recorded.</p> : (
                    <table className="w-full text-sm text-left">
                      <thead className="text-gray-500 border-b border-gray-700">
                        <tr>
                          <th className="py-2">Date</th>
                          <th className="py-2">Offense</th>
                          <th className="py-2">Police Station</th>
                          <th className="py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        {result.criminalHistory.map((rec, i) => (
                          <tr key={i} className="border-b border-gray-700/50 last:border-0">
                            <td className="py-2 font-mono text-gray-400">{rec.date}</td>
                            <td className="py-2 text-red-300">{rec.offense}</td>
                            <td className="py-2">{rec.station}</td>
                            <td className="py-2"><span className="bg-red-900/40 text-red-200 px-2 py-0.5 rounded text-xs border border-red-900">{rec.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </Card>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const AuditView = ({ logs }) => (
  <div>
    <h2 className="text-2xl font-bold text-white mb-6">System Audit Logs</h2>
    <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
      <table className="w-full text-left">
        <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
          <tr>
            <th className="px-6 py-3">Timestamp</th>
            <th className="px-6 py-3">User</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700 text-sm text-gray-300">
          {logs.map((log, i) => (
            <tr key={i} className="hover:bg-gray-700/50 transition">
              <td className="px-6 py-4 font-mono text-gray-500">{log.timestamp}</td>
              <td className="px-6 py-4 font-medium text-blue-400">{log.user}</td>
              <td className="px-6 py-4">{log.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Card = ({ title, children }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 shadow-lg">
    <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">{title}</h3>
    {children}
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-400">{label}:</span>
    <span className="text-white font-medium text-right">{value}</span>
  </div>
);

export default App;
