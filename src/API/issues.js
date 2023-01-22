// The super-innovative JSON API
// (ROFL). I just don't want to set up a real API backend for this app

const lsKey = 'issues';
const defaultIssues = [
    {
        id: '13d3e1f7-58f8-5436-a5db-88f68751f2b7',
        description: 'Welcome to Issues Tracker App',
        details: 'Written in React',
        severity: 'm',
        responsible: '',
        closed: true
    }
];
export async function fetchIssues() {
    const res = localStorage.getItem('issues');
    return await new Promise(resolve => {
        setTimeout(function () {
            if (res) resolve(JSON.parse(res));
            else resolve(defaultIssues);
        }, 1000);
    });
}
export function updateIssues(issues) {
    localStorage.setItem(lsKey, JSON.stringify(issues));
}
