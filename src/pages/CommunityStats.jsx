const stats = [
    { title: "Total Users", value: 1240 },
    { title: "Issues Resolved", value: 980 },
    { title: "Pending Issues", value: 260 },
];

const CommunityStats = () => {
    return (
        <div className="flex justify-around my-8 bg-green-100 p-6 rounded-lg">
            {stats.map((stat, i) => (
                <div key={i} className="text-center">
                    <h3 className="text-xl font-bold">{stat.value}</h3>
                    <p>{stat.title}</p>
                </div>
            ))}
        </div>
    );
};

export default CommunityStats;
