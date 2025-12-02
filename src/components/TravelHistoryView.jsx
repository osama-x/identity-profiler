import React from 'react';

const HOTEL_DATA = [
    { id: 1, name: "Pearl Continental", city: "Lahore", checkIn: "2025-11-10 14:00", checkOut: "2025-11-12 11:00" },
    { id: 2, name: "Serena Hotel", city: "Islamabad", checkIn: "2025-10-05 15:30", checkOut: "2025-10-08 10:00" },
    { id: 3, name: "Movenpick", city: "Karachi", checkIn: "2025-09-20 12:00", checkOut: "2025-09-22 12:00" },
    { id: 4, name: "Avari Towers", city: "Karachi", checkIn: "2025-08-15 14:00", checkOut: "2025-08-16 11:00" },
    { id: 5, name: "Ramada", city: "Multan", checkIn: "2025-07-01 13:00", checkOut: "2025-07-03 11:00" }
];

const TRAVEL_DATA = [
    { id: 1, type: "Flight", carrier: "Emirates (EK623)", route: "LHE -> DXB", date: "2025-11-15 03:30", status: "Completed" },
    { id: 2, type: "Flight", carrier: "PIA (PK303)", route: "LHE -> KHI", date: "2025-09-20 08:00", status: "Completed" },
    { id: 3, type: "Bus", carrier: "Daewoo Express", route: "Lahore -> Islamabad", date: "2025-10-05 09:00", status: "Completed" },
    { id: 4, type: "Flight", carrier: "Qatar Airways (QR620)", route: "DXB -> LHE", date: "2025-11-18 22:15", status: "Completed" },
    { id: 5, type: "Train", carrier: "Green Line", route: "Karachi -> Lahore", date: "2025-09-22 20:00", status: "Completed" }
];

const VEHICLE_HISTORY = [
    { id: 1, plate: "XYZ-789", location: "Kalma Chowk Signal, Lahore", time: "2025-11-28 18:30:00" },
    { id: 2, plate: "XYZ-789", location: "Liberty Roundabout, Lahore", time: "2025-11-28 18:15:00" },
    { id: 3, plate: "ABC-123", location: "Firdous Market, Lahore", time: "2025-11-27 09:45:00" },
    { id: 4, plate: "XYZ-789", location: "DHA Phase 5 Entry, Lahore", time: "2025-11-28 19:00:00" },
    { id: 5, plate: "ABC-123", location: "Mall Road, Lahore", time: "2025-11-26 14:20:00" }
];

const TravelHistoryView = () => (
    <div className="space-y-6">
        {/* Hotel History */}
        <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
            <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-bold text-white">Hotel Check-in/Check-out History</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">Hotel Name</th>
                            <th className="px-4 py-3">City</th>
                            <th className="px-4 py-3">Check-In</th>
                            <th className="px-4 py-3">Check-Out</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 text-gray-300">
                        {HOTEL_DATA.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-700/50 transition">
                                <td className="px-4 py-3 font-medium text-white">{item.name}</td>
                                <td className="px-4 py-3">{item.city}</td>
                                <td className="px-4 py-3 text-blue-300">{item.checkIn}</td>
                                <td className="px-4 py-3 text-blue-300">{item.checkOut}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Travel History */}
        <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
            <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-bold text-white">Travel History (Flights & Local)</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Carrier/Mode</th>
                            <th className="px-4 py-3">Route</th>
                            <th className="px-4 py-3">Date & Time</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 text-gray-300">
                        {TRAVEL_DATA.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-700/50 transition">
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${item.type === 'Flight' ? 'bg-purple-900 text-purple-300' : 'bg-gray-700 text-gray-300'}`}>
                                        {item.type}
                                    </span>
                                </td>
                                <td className="px-4 py-3">{item.carrier}</td>
                                <td className="px-4 py-3 font-mono">{item.route}</td>
                                <td className="px-4 py-3">{item.date}</td>
                                <td className="px-4 py-3 text-green-400">{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Vehicle Location History */}
        <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
            <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-bold text-white">Vehicle Location History (Traffic Cams)</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">Vehicle Plate</th>
                            <th className="px-4 py-3">Location</th>
                            <th className="px-4 py-3">Time Last Seen</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 text-gray-300">
                        {VEHICLE_HISTORY.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-700/50 transition">
                                <td className="px-4 py-3 font-mono text-yellow-400">{item.plate}</td>
                                <td className="px-4 py-3">{item.location}</td>
                                <td className="px-4 py-3 text-gray-400">{item.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

export default TravelHistoryView;
