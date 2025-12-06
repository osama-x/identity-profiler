import React, { useState } from 'react';

const INITIAL_SEARCH_HISTORY = [
    {
        id: 1,
        searchedBy: "Zafar Nazeer",
        area: "Lahore Regional Office",
        dateTime: "2025-12-05 14:30",
        remarks: "Routine background check for employment verification"
    },
    {
        id: 2,
        searchedBy: "Ali Ahmed",
        area: "Islamabad HQ",
        dateTime: "2025-12-04 09:15",
        remarks: "Cross-reference with ongoing investigation Case-2025-0089"
    },
    {
        id: 3,
        searchedBy: "Fatima Zahra",
        area: "Karachi Field Office",
        dateTime: "2025-12-02 16:45",
        remarks: "Surveillance report follow-up"
    },
    {
        id: 4,
        searchedBy: "Muhammad Ahmed",
        area: "Lahore Regional Office",
        dateTime: "2025-11-30 11:20",
        remarks: "Asset verification request from legal department"
    }
];

const SearchHistoryView = ({ profileId, profileName, currentUser, onBack }) => {
    const [searchHistory, setSearchHistory] = useState(INITIAL_SEARCH_HISTORY);
    const [showAddRemark, setShowAddRemark] = useState(false);
    const [newRemark, setNewRemark] = useState('');
    const [userArea, setUserArea] = useState('Lahore Regional Office');

    const handleAddRemark = () => {
        if (!newRemark.trim()) return;

        const newEntry = {
            id: searchHistory.length + 1,
            searchedBy: currentUser.name,
            area: userArea,
            dateTime: new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).replace(',', ''),
            remarks: newRemark
        };

        setSearchHistory([newEntry, ...searchHistory]);
        setNewRemark('');
        setUserArea('Lahore Regional Office');
        setShowAddRemark(false);
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Search History
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Profile: <span className="text-white font-medium">{profileName}</span> ({profileId})
                    </p>
                </div>
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white px-4 py-2 rounded-xl border border-gray-700/50 transition-all duration-200"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Profile
                </button>
            </div>

            {/* Add Remark Button */}
            <div className="mb-6">
                {!showAddRemark ? (
                    <button
                        onClick={() => setShowAddRemark(true)}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-105"
                    >
                        + Add Your Remark
                    </button>
                ) : (
                    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-4">Add New Search Remark</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Area/Office</label>
                                <select
                                    value={userArea}
                                    onChange={(e) => setUserArea(e.target.value)}
                                    className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition-all"
                                >
                                    <option>Lahore Regional Office</option>
                                    <option>Islamabad HQ</option>
                                    <option>Karachi Field Office</option>
                                    <option>Peshawar Regional Office</option>
                                    <option>Quetta Field Office</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Remarks</label>
                                <textarea
                                    value={newRemark}
                                    onChange={(e) => setNewRemark(e.target.value)}
                                    placeholder="Enter your remarks about this search..."
                                    rows="3"
                                    className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition-all resize-none"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleAddRemark}
                                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-green-500/30 transition-all duration-200"
                                >
                                    Submit Remark
                                </button>
                                <button
                                    onClick={() => {
                                        setShowAddRemark(false);
                                        setNewRemark('');
                                    }}
                                    className="flex-1 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white px-6 py-3 rounded-xl border border-gray-700/50 transition-all duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Search History Table */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl overflow-hidden">
                <div className="p-5 border-b border-gray-700/50">
                    <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Access Log ({searchHistory.length} entries)
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-900/50 text-gray-400 uppercase text-xs border-b border-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 font-semibold">#</th>
                                <th className="px-6 py-4 font-semibold">Searched By</th>
                                <th className="px-6 py-4 font-semibold">Area/Office</th>
                                <th className="px-6 py-4 font-semibold">Date & Time</th>
                                <th className="px-6 py-4 font-semibold">Remarks</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/50 text-sm text-gray-300">
                            {searchHistory.map((entry, index) => (
                                <tr key={entry.id} className="hover:bg-gray-700/30 transition-colors">
                                    <td className="px-6 py-4 font-mono text-gray-500">{searchHistory.length - index}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-blue-400">{entry.searchedBy}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-block bg-gray-700/50 px-3 py-1 rounded-lg text-xs">
                                            {entry.area}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-gray-400">{entry.dateTime}</td>
                                    <td className="px-6 py-4 text-gray-300">{entry.remarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SearchHistoryView;
