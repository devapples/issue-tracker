import {useEffect, useState} from 'react';

import AddIssue from './components/AddIssue';
import IssueList from './components/IssueList';
import Loading from "./components/UI/Loading";

import alias from './config/alias.json';
import eventNames from './config/event-names.json';
import {fetchIssues, updateIssues} from './API/issues.js';
import captcha from "./functions/captcha";
import truncate from './functions/truncate';
import Chance from 'chance';

const {severity: sevAlias} = alias;
const chance = new Chance();

function App() {
    const [issues, setIssues] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function () {
        (async function () {
            try {
                setIssues(await fetchIssues());
            } catch (e) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);
    useEffect(() => updateIssues(issues), [issues]);

    function addIssue(raw) {
        setIssues([...issues, {...raw, id: chance.guid(), closed: false}]);
    }
    function changeIssueStatus(id) {
        setIssues(issues.map(issue => issue.id === id ? {...issue, closed: !issue.closed} : issue));
    }
    function deleteIssue(id) {
        const issue = issues.find(issue => issue.id === id);
        const {body} = document;
        body.classList.add('danger');

        const captchaExpect = ('' + id).slice(0, 8);
        setTimeout(() => captcha({
            captchaExpect,
            captchaGuide:
                `Do you want to delete this issue forever?\n\n` +
                `====================\n` +
                `${issue.description}\n\n` +
                `${truncate(issue.details, 200)}\n` +
                `====================\n\n` +
                `(# ${id})\n\n` +
                `[Status: ${ issue.closed ? 'Closed' : 'Open' }] [Severity: ${ sevAlias.name[issue.severity] }]\n` +
                `[Responsible: ${truncate(issue.responsible, 20)}]\n\n` +
                `====================\n\n` +
                `Type "${captchaExpect}" without quotes to continue:\n `,
            then() {
                window.dispatchEvent(new CustomEvent(eventNames.gonnaDelete, {detail: {id}}));
                setTimeout(() => setIssues(issues.filter(issue => issue.id !== id)), 300);
            },
            final() {
                body.classList.remove('danger');
            }
        }), 100);
    }

    return (
        <div className='container'>
            <h1 className='pt-4 mb-4'>Issue Tracker</h1>
            <section className='jumbotron'>
                <h2 className='mb-4'>Add new issue</h2>
                <AddIssue onAdd={addIssue} />
            </section>
            <section>
                <h2>{
                    isLoading
                        ? <Loading />
                        : error
                            ? 'Error loading issues: ' + error
                            : issues.length ? 'All issues' : 'No issues found'
                }</h2>
                {!!issues.length && <IssueList
                    issues={issues}
                    onStatusChange={changeIssueStatus}
                    onDelete={deleteIssue}
                />}
            </section>
            <p className='mt-4 pb-3 mb-0'>&copy; Somebody, 1970-?</p>
        </div>
    );
}

export default App;
