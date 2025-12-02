import React, { useState } from 'react';

const NODES = [
    { id: 'main', x: 400, y: 300, label: 'Ijaz Khan', type: '', color: '#3b82f6', details: { role: '', status: 'Under Surveillance', criminalRecord: 'Clear' } },
    { id: 'f1', x: 400, y: 100, label: 'Abdul Rehman', type: 'family', color: '#14b8a6', details: { role: 'Father', status: 'Deceased', criminalRecord: 'Clear' } },
    { id: 'f2', x: 600, y: 300, label: 'Kamran Khan', type: 'family', color: '#14b8a6', details: { role: 'Brother', status: 'Active', criminalRecord: 'Clear' } },
    { id: 'c1', x: 200, y: 300, label: 'Aqeel Zafar ', type: 'contact', color: '#f97316', details: { role: 'Frequent Contact', status: 'Suspicious', criminalRecord: 'Clear' } },
    { id: 'c2', x: 400, y: 500, label: 'Azhar Ud Din', type: 'contact', color: '#f97316', details: { role: 'Recently Contacted', status: 'Active', criminalRecord: 'Found (Fraud)' } },
];

const LINKS = [
    { source: 'main', target: 'f1', label: '' },
    { source: 'main', target: 'f2', label: 'Brother' },
    { source: 'main', target: 'c1', label: 'Frequent Calls' },
    { source: 'main', target: 'c2', label: 'Business' },
];

const AdvancedScanView = () => {
    const [selectedNode, setSelectedNode] = useState(null);

    return (
        <div className="flex gap-6 h-[600px]">
            {/* Graph Area */}
            <div className="flex-1 bg-gray-900 rounded-lg shadow-inner border border-gray-700 relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                    <h3 className="text-lg font-bold text-white">Relationship Graph</h3>
                    <p className="text-xs text-gray-400">Runs extended profiling on relationships of the person. </p>
                </div>

                <svg className="w-full h-full" viewBox="0 0 800 600">
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
                        </marker>
                    </defs>

                    {/* Links */}
                    {LINKS.map((link, i) => {
                        const source = NODES.find(n => n.id === link.source);
                        const target = NODES.find(n => n.id === link.target);
                        return (
                            <g key={i}>
                                <line
                                    x1={source.x} y1={source.y}
                                    x2={target.x} y2={target.y}
                                    stroke="#4b5563"
                                    strokeWidth="2"
                                    markerEnd="url(#arrowhead)"
                                />
                                <text
                                    x={(source.x + target.x) / 2}
                                    y={(source.y + target.y) / 2 - 5}
                                    textAnchor="middle"
                                    fill="#9ca3af"
                                    fontSize="10"
                                    className="bg-gray-900"
                                >
                                    {link.label}
                                </text>
                            </g>
                        );
                    })}

                    {/* Nodes */}
                    {NODES.map((node) => (
                        <g
                            key={node.id}
                            onClick={() => setSelectedNode(node)}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r="30"
                                fill={node.color}
                                stroke={node.details.criminalRecord.includes('Found') ? '#ef4444' : '#22c55e'}
                                strokeWidth="3"
                                className={selectedNode?.id === node.id ? 'filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : ''}
                            />
                            <text
                                x={node.x}
                                y={node.y + 45}
                                textAnchor="middle"
                                fill="white"
                                fontSize="12"
                                fontWeight="bold"
                            >
                                {node.label}
                            </text>
                            <text
                                x={node.x}
                                y={node.y + 60}
                                textAnchor="middle"
                                fill="#9ca3af"
                                fontSize="10"
                            >
                                {node.details.role}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>

            {/* Details Panel */}
            <div className="w-80 bg-gray-800 rounded-lg border border-gray-700 p-6 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Node Details</h3>

                {selectedNode ? (
                    <div className="space-y-6 animate-fadeIn">
                        <div>
                            <label className="text-xs uppercase text-gray-500 font-bold">Name</label>
                            <p className="text-lg text-white font-medium">{selectedNode.label}</p>
                        </div>

                        <div>
                            <label className="text-xs uppercase text-gray-500 font-bold">Relationship</label>
                            <p className="text-gray-300">{selectedNode.details.role}</p>
                        </div>

                        <div>
                            <label className="text-xs uppercase text-gray-500 font-bold">Current Status</label>
                            <p className="text-gray-300">{selectedNode.details.status}</p>
                        </div>

                        <div>
                            <label className="text-xs uppercase text-gray-500 font-bold">Criminal Record</label>
                            <div className={`mt-1 inline-block px-3 py-1 rounded-full text-xs font-bold ${selectedNode.details.criminalRecord.includes('Found') ? 'bg-red-900/50 text-red-300 border border-red-800' : 'bg-green-900/50 text-green-300 border border-green-800'}`}>
                                {selectedNode.details.criminalRecord}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500 text-center">
                        <svg className="w-12 h-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                        <p>Select a node to view intelligence details</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdvancedScanView;
