import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const MyContributions = () => {
    const { user } = useAuth();
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3500/my-contributions/${user.email}`)
                .then(res => {
                    if (res.data.success) setContributions(res.data.data);
                })
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [user]);

    if (loading) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div className="mt-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">My Contributions</h2>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Issue</th>
                        <th className="p-2">Amount</th>
                        <th className="p-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {contributions.map(c => (
                        <tr key={c._id} className="border-t">
                            <td className="p-2">{c.issueId}</td>
                            <td className="p-2">${c.amount}</td>
                            <td className="p-2">{new Date(c.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyContributions;
