import React from 'react';

const CDR_DATA = [
    { id: 1, caller: "+923001234567", receiver: "+923219876543", time: "2025-11-28 09:15:22", duration: "12m 30s", tower: "Lahore - Gulberg III", suspicious: false },
    { id: 2, caller: "+923335558888", receiver: "+923001234567", time: "2025-11-28 09:45:10", duration: "02m 15s", tower: "Karachi - Clifton", suspicious: false },
    { id: 3, caller: "+923001234567", receiver: "+923219876543", time: "2025-11-28 10:05:00", duration: "05m 45s", tower: "Lahore - DHA Phase 5", suspicious: false },
    { id: 4, caller: "+923009998877", receiver: "+923001234567", time: "2025-11-28 10:30:45", duration: "00m 50s", tower: "Islamabad - F-10 Markaz", suspicious: true },
    { id: 5, caller: "+923001234567", receiver: "+923335558888", time: "2025-11-28 11:12:33", duration: "45m 10s", tower: "Rawalpindi - Saddar", suspicious: false },
    { id: 6, caller: "+923216669999", receiver: "+923001234567", time: "2025-11-28 11:55:12", duration: "08m 20s", tower: "Peshawar - University Rd", suspicious: false },
    { id: 7, caller: "+923001234567", receiver: "+923219876543", time: "2025-11-28 12:20:05", duration: "03m 05s", tower: "Lahore - Model Town", suspicious: false },
    { id: 8, caller: "+923335558888", receiver: "+923001234567", time: "2025-11-28 13:10:50", duration: "18m 40s", tower: "Quetta - Jinnah Rd", suspicious: false },
    { id: 9, caller: "+923450001122", receiver: "+923001234567", time: "2025-11-28 13:45:30", duration: "01m 15s", tower: "Islamabad - Blue Area", suspicious: true },
    { id: 10, caller: "+923001234567", receiver: "+923335558888", time: "2025-11-28 14:05:15", duration: "06m 55s", tower: "Multan - Cantt", suspicious: false },
    { id: 11, caller: "+923001234567", receiver: "+923219876543", time: "2025-11-28 14:30:00", duration: "09m 10s", tower: "Faisalabad - D Ground", suspicious: false },
    { id: 12, caller: "+923135556677", receiver: "+923001234567", time: "2025-11-28 15:15:45", duration: "04m 25s", tower: "Sialkot - Cantt", suspicious: false },
    { id: 13, caller: "+923001234567", receiver: "+923335558888", time: "2025-11-28 15:50:20", duration: "22m 15s", tower: "Lahore - MM Alam Rd", suspicious: false },
    { id: 14, caller: "+923001234567", receiver: "+923219876543", time: "2025-11-28 16:25:10", duration: "07m 30s", tower: "Hyderabad - Latifabad", suspicious: false },
    { id: 15, caller: "+923214443333", receiver: "+923001234567", time: "2025-11-28 17:00:55", duration: "14m 50s", tower: "Gujranwala - Satellite Town", suspicious: false },
    { id: 16, caller: "+923335558888", receiver: "+923001234567", time: "2025-11-28 17:45:30", duration: "02m 45s", tower: "Bahawalpur - Model Town", suspicious: false },
    { id: 17, caller: "+923001234567", receiver: "+923219876543", time: "2025-11-28 18:20:15", duration: "11m 05s", tower: "Sargodha - University Rd", suspicious: false },
    { id: 18, caller: "+923127778899", receiver: "+923001234567", time: "2025-11-28 19:05:40", duration: "05m 20s", tower: "Abbottabad - Mandian", suspicious: false },
    { id: 19, caller: "+923001234567", receiver: "+923335558888", time: "2025-11-28 19:40:25", duration: "16m 35s", tower: "Sukkur - Military Rd", suspicious: false },
    { id: 20, caller: "+923212223344", receiver: "+923001234567", time: "2025-11-28 20:15:10", duration: "03m 55s", tower: "Mardan - Mall Rd", suspicious: false }
];

const CDRView = () => (
    <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Call Detail Records (CDR)</h3>
            <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">Live Feed</span>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3">Time</th>
                        <th className="px-4 py-3">Caller</th>
                        <th className="px-4 py-3">Receiver</th>
                        <th className="px-4 py-3">Duration</th>
                        <th className="px-4 py-3">Tower Location</th>
                        <th className="px-4 py-3">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 text-gray-300">
                    {CDR_DATA.map((record) => (
                        <tr key={record.id} className={`hover:bg-gray-700/50 transition ${record.suspicious ? 'bg-red-900/20' : ''}`}>
                            <td className="px-4 py-3 font-mono text-gray-500">{record.time}</td>
                            <td className="px-4 py-3 font-mono">{record.caller}</td>
                            <td className="px-4 py-3 font-mono">{record.receiver}</td>
                            <td className="px-4 py-3">{record.duration}</td>
                            <td className="px-4 py-3">{record.tower}</td>
                            <td className="px-4 py-3">
                                {record.suspicious ? (
                                    <span className="bg-red-900 text-red-300 px-2 py-0.5 rounded text-xs font-bold animate-pulse">SUSPICIOUS</span>
                                ) : (
                                    <span className="text-green-500 text-xs">Normal</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default CDRView;
