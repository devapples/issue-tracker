import Issue from "./Issue";

function IssueList({issues, onStatusChange, onDelete}) {
    return (
        <div>
            {issues.map(issue => <Issue
                issue={issue}
                key={issue.id}
                onStatusChange={() => onStatusChange(issue.id)}
                onDelete={() => onDelete(issue.id)}
            />)}
        </div>
    );
}

export default IssueList;
