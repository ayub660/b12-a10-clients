import React from "react";

const MyContribution = () => {
    const contributions = [
        { id: 1, issueTitle: "Garbage Overflow", amount: 50, date: "2025-11-10" },
        { id: 2, issueTitle: "Broken Road", amount: 100, date: "2025-11-11" },
    ];

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">My Contributions</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Issue Title</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {contributions.map((c) => (
                        <tr key={c.id}>
                            <td>{c.issueTitle}</td>
                            <td>${c.amount}</td>
                            <td>{c.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyContribution;
