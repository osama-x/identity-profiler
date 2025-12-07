import React from 'react';

// Dummy surveillance data for Lahore
const SURVEILLANCE_DATA = [
    {
        date: "2025-12-07",
        sightings: [
            {
                time: "08:15 AM",
                location: "Gulberg III, Main Boulevard",
                details: "Subject spotted entering Café Aylanto",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "High"
            },
            {
                time: "10:30 AM",
                location: "MM Alam Road, Commercial Area",
                details: "Vehicle parked outside Liberty Books for 45 minutes",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "High"
            },
            {
                time: "02:45 PM",
                location: "DHA Phase 5, Y Block",
                details: "Subject met with unidentified male (approx. 35-40 years)",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "Medium"
            },
            {
                time: "06:20 PM",
                location: "Firdous Market Signal",
                details: "Vehicle detected via ANPR camera heading towards Bahria Town",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "High"
            }
        ]
    },
    {
        date: "2025-12-06",
        sightings: [
            {
                time: "07:45 AM",
                location: "Bahria Town, Sector C",
                details: "Subject leaving residential address",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "High"
            },
            {
                time: "09:00 AM",
                location: "Jail Road, Near PU",
                details: "Vehicle spotted in traffic, heading towards Canal Road",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "High"
            },
            {
                time: "11:30 AM",
                location: "Packages Mall, Walton Road",
                details: "Subject entered mall premises, stayed for 2 hours",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "High"
            },
            {
                time: "04:15 PM",
                location: "Thokar Niaz Baig",
                details: "Vehicle detected via ANPR heading towards Ring Road",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "Medium"
            },
            {
                time: "07:30 PM",
                location: "Bahria Town, Sector C",
                details: "Subject returned to residential address",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "High"
            }
        ]
    },
    {
        date: "2025-12-05",
        sightings: [
            {
                time: "08:30 AM",
                location: "Bahria Town, Sector C",
                details: "Subject leaving residential address",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "High"
            },
            {
                time: "09:45 AM",
                location: "Kalma Chowk Underpass",
                details: "Vehicle detected via ANPR camera",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "High"
            },
            {
                time: "10:15 AM",
                location: "Gulberg III, Main Boulevard",
                details: "Subject at business meeting location (confirmed via field agent)",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "High"
            },
            {
                time: "01:00 PM",
                location: "Liberty Market",
                details: "Subject having lunch at Cosa Nostra restaurant",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "Medium"
            },
            {
                time: "03:30 PM",
                location: "Model Town, Link Road",
                details: "Vehicle spotted near residential complex",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "Medium"
            },
            {
                time: "08:00 PM",
                location: "Bahria Town, Sector C",
                details: "Subject returned to residential address",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "High"
            }
        ]
    },
    {
        date: "2025-12-04",
        sightings: [
            {
                time: "07:00 AM",
                location: "Bahria Town, Sector C",
                details: "Subject leaving residential address",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "High"
            },
            {
                time: "08:15 AM",
                location: "Ferozepur Road, Near Expo Center",
                details: "Vehicle detected via ANPR camera",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "High"
            },
            {
                time: "09:30 AM",
                location: "Johar Town, Commercial Market",
                details: "Subject entered office building (stayed 4 hours)",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "High"
            },
            {
                time: "02:00 PM",
                location: "Johar Town, Commercial Market",
                details: "Subject left office building",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "High"
            },
            {
                time: "03:45 PM",
                location: "Canal Road, Near Thokar",
                details: "Vehicle spotted heading towards DHA",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "Medium"
            },
            {
                time: "05:30 PM",
                location: "DHA Phase 6, Main Boulevard",
                details: "Subject at gym facility",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "Medium"
            },
            {
                time: "07:45 PM",
                location: "Bahria Town, Sector C",
                details: "Subject returned to residential address",
                vehicle: "Toyota Yaris (XYZ-789)",
                confidence: "High"
            }
        ]
    }
];

const SurveillanceReportView = ({ profileId, profileName, onBack }) => {
    const getConfidenceBadge = (confidence) => {
        const colors = {
            High: 'bg-green-900/50 text-green-300 border-green-800',
            Medium: 'bg-yellow-900/50 text-yellow-300 border-yellow-800',
            Low: 'bg-red-900/50 text-red-300 border-red-800'
        };
        return colors[confidence] || colors.Medium;
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                        Surveillance Report
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Subject: <span className="text-white font-medium">{profileName}</span> ({profileId})
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                        Surveillance Period: {SURVEILLANCE_DATA[SURVEILLANCE_DATA.length - 1].date} to {SURVEILLANCE_DATA[0].date}
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

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 backdrop-blur-sm border border-blue-700/50 rounded-xl p-4 shadow-lg">
                    <div className="text-3xl font-bold text-blue-300 mb-1">
                        {SURVEILLANCE_DATA.length}
                    </div>
                    <div className="text-xs text-blue-400 uppercase font-semibold">Days Tracked</div>
                </div>
                <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 backdrop-blur-sm border border-green-700/50 rounded-xl p-4 shadow-lg">
                    <div className="text-3xl font-bold text-green-300 mb-1">
                        {SURVEILLANCE_DATA.reduce((acc, day) => acc + day.sightings.length, 0)}
                    </div>
                    <div className="text-xs text-green-400 uppercase font-semibold">Total Sightings</div>
                </div>
                <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 backdrop-blur-sm border border-purple-700/50 rounded-xl p-4 shadow-lg">
                    <div className="text-3xl font-bold text-purple-300 mb-1">
                        {[...new Set(SURVEILLANCE_DATA.flatMap(day => day.sightings.map(s => s.location)))].length}
                    </div>
                    <div className="text-xs text-purple-400 uppercase font-semibold">Unique Locations</div>
                </div>
                <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/40 backdrop-blur-sm border border-orange-700/50 rounded-xl p-4 shadow-lg">
                    <div className="text-3xl font-bold text-orange-300 mb-1">
                        {[...new Set(SURVEILLANCE_DATA.flatMap(day => day.sightings.map(s => s.vehicle)))].length}
                    </div>
                    <div className="text-xs text-orange-400 uppercase font-semibold">Vehicles Tracked</div>
                </div>
            </div>

            {/* Timeline */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl overflow-hidden">
                <div className="p-5 border-b border-gray-700/50">
                    <h3 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                        Movement Timeline
                    </h3>
                </div>
                <div className="p-6">
                    <div className="space-y-8">
                        {SURVEILLANCE_DATA.map((dayData, dayIndex) => (
                            <div key={dayIndex} className="relative">
                                {/* Date Header */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-lg shadow-lg shadow-orange-500/30 font-bold text-sm">
                                        {new Date(dayData.date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
                                </div>

                                {/* Timeline Items */}
                                <div className="relative pl-8 space-y-6">
                                    {/* Vertical Line */}
                                    <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-red-500 to-orange-500"></div>

                                    {dayData.sightings.map((sighting, sightingIndex) => (
                                        <div key={sightingIndex} className="relative">
                                            {/* Timeline Dot */}
                                            <div className="absolute -left-6 top-2 w-4 h-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-full border-4 border-gray-900 shadow-lg shadow-orange-500/50"></div>

                                            {/* Sighting Card */}
                                            <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 hover:bg-gray-700/50 hover:border-gray-600/50 transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/10">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-orange-900/30 text-orange-300 px-3 py-1 rounded-lg text-sm font-bold font-mono">
                                                            {sighting.time}
                                                        </div>
                                                        {/* <div className={`px-3 py-1 rounded-lg text-xs font-bold border ${getConfidenceBadge(sighting.confidence)}`}>
                                                            {sighting.confidence} Confidence
                                                        </div> */}
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-start gap-2">
                                                        <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        <div>
                                                            <div className="text-white font-medium">{sighting.location}</div>
                                                            <div className="text-gray-400 text-sm mt-1">{sighting.details}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                                        </svg>
                                                        <span className="text-gray-500">Vehicle:</span>
                                                        <span className="text-gray-300 font-mono">{sighting.vehicle}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Note */}
            <div className="mt-6 bg-yellow-900/20 border border-yellow-900/50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                        <div className="text-yellow-400 font-semibold text-sm">Surveillance Data Notice</div>
                        <div className="text-yellow-300/80 text-xs mt-1">
                            This report is generated from multiple intelligence sources including ANPR cameras, field agents, and automated tracking systems.
                            All data is classified and should be handled according to security protocols.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveillanceReportView;
