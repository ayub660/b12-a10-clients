// src/issues/MyContribution.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
// 1. BASE_URL import korun
import { BASE_URL } from "../api/config";

const formatDate = (iso) => {
    try {
        const d = new Date(iso);
        return d.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    } catch {
        return iso;
    }
};

const formatCurrency = (amt) => {
    if (amt == null) return "-";

    return `$${Number(amt).toLocaleString()}`;
};

const MyContribution = () => {
    const { user } = useAuth();
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContrib = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                // 2. Dynamic URL: localhost/vercel switch auto hobe
                const res = await axios.get(`${BASE_URL}/my-contributions/${user.email}`);

                // Backend theke data structure thikmoto handle kora
                const data = res.data?.data ?? res.data ?? [];
                setContributions(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Fetch Error:", err);
                setError("Failed to load contributions. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchContrib();
    }, [user?.email]);

    const total = contributions.reduce((s, c) => s + Number(c.amount || 0), 0);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-6xl mx-auto p-6 min-h-[80vh]">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">My Contributions</h2>
                    <p className="text-gray-500 mt-1">Track all your support for a cleaner city.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <p className="text-green-700 font-medium">Total Contributed</p>
                    <h3 className="text-2xl font-bold text-green-600">{formatCurrency(total)}</h3>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">
                    {error}
                </div>
            )}

            {contributions.length === 0 ? (
                <div className="bg-white shadow-sm border rounded-2xl p-12 text-center">
                    <div className="text-5xl mb-4">🌱</div>
                    <h3 className="text-xl font-semibold text-gray-700">No contributions yet</h3>
                    <p className="text-gray-500 mt-2">Start supporting local cleanup projects to see them here.</p>
                </div>
            ) : (
                <div className="bg-white shadow-lg rounded-2xl border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
                                <tr>
                                    <th className="p-4">Issue Details</th>
                                    <th className="p-4">Amount</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Contact Info</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {contributions.map((c) => (
                                    <tr key={c._id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-800 text-base">
                                                    {c.title || c.issueTitle || "Untitled Issue"}
                                                </span>
                                                <a
                                                    className="text-xs text-blue-500 font-semibold hover:underline mt-1"
                                                    href={`/issue/${c.issueId}`}
                                                >
                                                    View Project # {c.issueId?.slice(-6)}
                                                </a>
                                            </div>
                                        </td>
                                        <td className="p-4 font-bold text-gray-700">
                                            {formatCurrency(c.amount)}
                                        </td>
                                        <td className="p-4 text-gray-600">
                                            {formatDate(c.date)}
                                        </td>
                                        <td className="p-4">
                                            <div className="text-gray-700 font-medium">{c.name}</div>
                                            <div className="text-xs text-gray-500">{c.phone || "No phone"}</div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => setSelected(c)}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-md"
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal: View Details */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-gray-50 p-6 border-b flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-800">Receipt Details</h3>
                            <button
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                                onClick={() => setSelected(null)}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Issue Title:</span>
                                <span className="font-semibold text-gray-800">{selected.title || selected.issueTitle}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Amount Paid:</span>
                                <span className="font-bold text-green-600">{formatCurrency(selected.amount)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Payment Date:</span>
                                <span className="text-gray-800">{formatDate(selected.date)}</span>
                            </div>
                            <hr />
                            <div className="space-y-1">
                                <p className="text-xs text-gray-400 uppercase font-bold">Contributor Information</p>
                                <p className="text-gray-800"><strong>Name:</strong> {selected.name}</p>
                                <p className="text-gray-800"><strong>Email:</strong> {selected.email}</p>
                                <p className="text-gray-800"><strong>Phone:</strong> {selected.phone || "N/A"}</p>
                                <p className="text-gray-800"><strong>Address:</strong> {selected.address || "N/A"}</p>
                            </div>
                            {selected.additionalInfo && (
                                <div className="bg-blue-50 p-3 rounded-lg mt-2">
                                    <p className="text-xs text-blue-400 uppercase font-bold">Note</p>
                                    <p className="text-sm text-blue-700 italic">"{selected.additionalInfo}"</p>
                                </div>
                            )}
                        </div>

                        <div className="p-6 bg-gray-50 flex gap-3">
                            <button
                                onClick={() => setSelected(null)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-gray-600 font-semibold hover:bg-gray-100 transition"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => window.print()}
                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
                            >
                                Print Receipt
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyContribution;