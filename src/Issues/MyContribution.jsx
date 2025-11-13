// src/issues/MyContribution.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

const formatDate = (iso) => {
    try {
        const d = new Date(iso);
        return d.toLocaleString(); // you can change to toLocaleDateString if you prefer
    } catch {
        return iso;
    }
};

const formatCurrency = (amt) => {
    if (amt == null) return "-";
    // change symbol if you use ৳ or $ as needed
    return `৳ ${Number(amt).toLocaleString()}`;
};

const MyContribution = () => {
    const { user } = useAuth();
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null); // for viewing one contribution
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContrib = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:3500/my-contributions/${user.email}`);
                // backend returns { success: true, data: [...] } in your server.js — adapt if different
                const data = res.data?.data ?? res.data ?? [];
                setContributions(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load contributions");
            } finally {
                setLoading(false);
            }
        };
        fetchContrib();
    }, [user]);

    const total = contributions.reduce((s, c) => s + Number(c.amount || 0), 0);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-4">My Contributions</h2>

            <div className="flex items-center justify-between mb-4">
                <p className="text-gray-700">Total contributed: <strong>{formatCurrency(total)}</strong></p>
                <p className="text-sm text-gray-500">{contributions.length} record(s)</p>
            </div>

            {error && <p className="text-red-500 mb-3">{error}</p>}

            {contributions.length === 0 ? (
                <div className="bg-white shadow rounded p-6 text-center text-gray-600">
                    You have not made any contributions yet.
                </div>
            ) : (
                <div className="bg-white shadow rounded overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">Issue</th>
                                <th className="p-3 text-left">Amount</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Contributor</th>
                                <th className="p-3 text-left">Contact</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contributions.map((c) => (
                                <tr key={c._id} className="border-t hover:bg-gray-50">
                                    <td className="p-3">
                                        {/* If you store issue title with contribution it's better to show that */}
                                        {c.issueTitle ? (
                                            <div className="flex flex-col">
                                                <span className="font-medium">{c.issueTitle}</span>
                                                <a
                                                    className="text-xs text-blue-600 hover:underline"
                                                    href={`/issue/${c.issueId}`}
                                                >
                                                    See Issue
                                                </a>
                                            </div>
                                        ) : (
                                            <div>
                                                <span className="font-medium">Issue ID: {c.issueId}</span>
                                                <div>
                                                    <a className="text-xs text-blue-600 hover:underline" href={`/issue/${c.issueId}`}>
                                                        See Issue
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </td>

                                    <td className="p-3">{formatCurrency(c.amount)}</td>
                                    <td className="p-3">{formatDate(c.date)}</td>
                                    <td className="p-3">{c.name || user?.displayName || "-"}</td>
                                    <td className="p-3">
                                        <div className="text-sm">{c.email}</div>
                                        <div className="text-xs text-gray-500">{c.phone || "-"}</div>
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => setSelected(c)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2"
                                        >
                                            View
                                        </button>
                                        {/* optional delete - be careful: normally you might not allow delete of contributions */}
                                        {/* <button className="px-3 py-1 bg-red-500 text-white rounded-md">Delete</button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal: view contribution */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl shadow-2xl w-11/12 max-w-lg p-6">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold">Contribution Details</h3>
                            <button
                                className="text-gray-500 hover:text-gray-800"
                                onClick={() => setSelected(null)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mt-4 space-y-2 text-sm">
                            <div>
                                <strong>Issue:</strong>{" "}
                                {selected.issueTitle ? selected.issueTitle : `ID: ${selected.issueId}`}
                                {" "}
                                <a className="text-blue-600 ml-2" href={`/issue/${selected.issueId}`}>See Issue</a>
                            </div>
                            <div><strong>Amount:</strong> {formatCurrency(selected.amount)}</div>
                            <div><strong>Date:</strong> {formatDate(selected.date)}</div>
                            <div><strong>Name:</strong> {selected.name}</div>
                            <div><strong>Email:</strong> {selected.email}</div>
                            <div><strong>Phone:</strong> {selected.phone || "-"}</div>
                            <div><strong>Address:</strong> {selected.address || "-"}</div>
                            <div><strong>Additional Info:</strong> <div className="mt-1 text-gray-700">{selected.additionalInfo || "-"}</div></div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => setSelected(null)}
                                className="px-4 py-2 bg-gray-200 rounded-md"
                            >
                                Close
                            </button>
                            <a
                                href={`#`} // hook for receipt download or print
                                className="px-4 py-2 bg-green-600 text-white rounded-md"
                            >
                                Download Receipt
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyContribution;
