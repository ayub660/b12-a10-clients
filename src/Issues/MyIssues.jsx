import React from "react";

const MyIssues = () => {
    const myIssues = [
        { id: 1, title: "Garbage Overflow", category: "Garbage", status: "Ongoing" },
        { id: 2, title: "Broken Road", category: "RoadDamage", status: "Resolved" },
    ];

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">My Issues</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {myIssues.map((issue) => (
                        <tr key={issue.id}>
                            <td>{issue.title}</td>
                            <td>{issue.category}</td>
                            <td>{issue.status}</td>
                            <td>
                                <button className="btn btn-sm btn-primary mr-2">Update</button>
                                <button className="btn btn-sm btn-error">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyIssues;
