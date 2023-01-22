import {useEffect} from 'react';

import Badge from "./UI/Badge";
import Button from "./UI/Button";
import SpcBtwn from "./UI/SpcBtwn";

import alias from '../config/alias.json';
import eventNames from '../config/event-names.json';
import {useState} from "react";
const {severity: sevAlias} = alias;

function Issue({issue, onStatusChange, onDelete}) {
    const [gonnaDelete, setGonnaDelete] = useState(false);

    useEffect(function () {
        const callback = ({detail: event}) => void (event.id === issue.id && setGonnaDelete(true));
        window.addEventListener(eventNames.gonnaDelete, callback);
        return () => window.removeEventListener(eventNames.gonnaDelete, callback);
    }, []);

    return (
        <div className={`x-issue card card-body bg-light mb-3 ${gonnaDelete ? 'x-gonna-delete' : ''}`}>
            <p>
                <Badge
                    icon='hash'
                    excls='x-issue-id-badge border border-dark text-dark'
                >
                    {issue.id}
                </Badge>
                <Button
                    excls='x-issue-id-btn'
                    color='outline-dark'
                    onClick={() => alert(issue.id)}
                >Show Issue ID</Button>
            </p>
            <h3>{issue.description}</h3>
            <p>
                <SpcBtwn>
                    <Badge
                        icon='clock-fill'
                        excls={`bg-${issue.closed ? 'secondary' : 'info'}`}
                    >
                        {issue.closed ? 'Closed' : 'Open'}
                    </Badge>
                    <Badge
                        icon='bar-chart-fill'
                        excls={`bg-${sevAlias.color[issue.severity]}`}
                    >
                        {sevAlias.name[issue.severity]}
                    </Badge>
                    <Badge icon='people-fill' excls='bg-dark'>{issue.responsible}</Badge>
                </SpcBtwn>
            </p>
            <p className="x-pre mt-1">{issue.details}</p>
            <p>
                <SpcBtwn>
                    <Button
                        color={issue.closed ? 'info' : 'warning'}
                        onClick={onStatusChange}
                    >
                        {issue.closed ? 'Reopen' : 'Close'}
                    </Button>
                    <Button color='danger' onClick={onDelete}>Delete</Button>
                </SpcBtwn>
            </p>
        </div>
    );
}

export default Issue;
