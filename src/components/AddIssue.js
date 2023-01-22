import {useState} from 'react';
import useValue from '../hooks/useValue';

import Imt from './UI/Imt';
import Input from './UI/Input';
import Dropdown from "./UI/Dropdown";
import Textarea from "./UI/Textarea";
import Button from "./UI/Button";

function AddIssue({onAdd}) {
    const [description, setDescription] = useState('');
    const [severity, setSeverity] = useState('l');
    const [responsible, setResponsible] = useState('');
    const [details, setDetails] = useState('');

    function onSubmit(event) {
        event.preventDefault();
        if (description.length < 10) return alert('Description must be at least 10 characters long');
        onAdd({description, severity, responsible, details});

        setDescription('');
        setSeverity('l');
        setResponsible('');
        setDetails('');
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label>Description <Imt /></label>
                <Input
                    hint='EX: Add event logging'
                    value={description}
                    onChange={useValue(setDescription)}
                />
            </div>
            <div className='form-group'>
                <label>Severity <Imt /></label>
                <Dropdown
                    options={[
                        ['Low', 'l'],
                        ['Medium', 'm'],
                        ['High', 'h']
                    ]}
                    value={severity}
                    onChange={useValue(setSeverity)}
                />
            </div>
            <div className='form-group'>
                <label>Assigned to</label>
                <Input
                    hint='Specify responsible person(s)'
                    value={responsible}
                    onChange={useValue(setResponsible)}
                />
            </div>
            <div className='form-group'>
                <label>Details</label>
                <Textarea
                    rows='5'
                    hint='Detailed description, notes, materials, etc.'
                    value={details}
                    onChange={useValue(setDetails)}
                />
            </div>
            <Button type='submit'>Add</Button>
        </form>
    );
}

export default AddIssue;
