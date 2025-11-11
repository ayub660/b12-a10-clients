import { recentIssuesImages } from "../../assets/images";

const dummyIssues = [
    { title: "Garbage on Street", location: "Dhaka" },
    { title: "Broken Road Tiles", location: "Mohakhali" },
    { title: "Illegal Construction", location: "Banani" },
    { title: "Overflowing Dustbin", location: "Gulshan" },
    { title: "Waterlogging Issue", location: "Dhanmondi" },
    { title: "Abandoned House", location: "Uttara" },
];

const RecentIssues = () => {
    return (
        <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">Recent Issues</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dummyIssues.map((issue, i) => (
                    <div key={i} className="border p-4 rounded-lg">
                        <img src={recentIssuesImages[i % recentIssuesImages.length]} alt={issue.title} className="h-40 w-full object-cover rounded" />
                        <h3 className="font-bold mt-2">{issue.title}</h3>
                        <p>{issue.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentIssues;
