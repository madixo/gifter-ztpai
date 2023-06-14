import {FormEventHandler, useCallback, useContext, useState} from "react";


import {useLists} from "api/useLists";
import Button from "components/common/Button/Button";
import Panel from "components/common/Panel/Panel";
import Table, {TableActionOnClick, TableDataRow, TableOnRowSelect} from "components/common/Table/Table";
import {FaPlus, FaTrash} from "react-icons/fa";
import {UserContext} from "views/DashboardView";

import {useNavigate} from "react-router-dom";
import styles from './DashboardPanel.module.scss';

export default function DashboardPanel() {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const [selectedLists, setSelectedLists] = useState<TableDataRow[]>();
    const [selectedContributions, setSelectedContributions] = useState<TableDataRow[]>();
    const [removeActionBtnDisabledLists, setRemoveActionBtnDisabledLists] = useState(true);
    const [removeActionBtnDisabledContributions, setRemoveActionBtnDisabledContributions] = useState(true);
    const [listsData, listsLoading, listsError] = useLists({id: user.id});
    const [contributionsData, contributionsLoading, contributionsError] = useContributions({id: user.id});

    const removeSelectedLists = async () => {

        try {

            const response = await fetch('http://localhost:3001/api/lists/', {
                method: 'delete',
                credentials: 'include',
                headers: [
                    ['Content-Type', 'application/json']
                ],
                body: JSON.stringify({ids: selectedLists?.map(list => list.id)})
            }).then(r => r.json());

            if(response.status !== 'ok')
                alert(response.message);
            else
                window.location.reload();

        }catch(err) {

            console.error(err);
            alert('Wystapil blad!');

        }

    };

    const addList: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        try {

            const response = await fetch('http://localhost:3001/api/list/', {
                method: 'POST',
                credentials: 'include',
                headers: [
                    ['Content-Type', 'application/json']
                ],
                body: JSON.stringify(Object.fromEntries(formData))
            }).then(r => r.json());

            if(response.status === 'ok'){
                window.location.reload();
            }else
                alert(response.message);

        }catch(err) {
            console.error(err);
            alert('Wystapil blad!');
        }

    };

    const handleListSelect: TableOnRowSelect = useCallback((lists) => {
        setSelectedLists(lists);
        setRemoveActionBtnDisabledLists(lists.length <= 0);
    }, []);

    const handleContributionSelect: TableOnRowSelect = useCallback((contributions) => {
        setSelectedContributions(contributions);
        setRemoveActionBtnDisabledContributions(contributions.length <= 0);
    }, []);

    const listsActions = [
        <Button
            onClick={removeSelectedLists}
            danger
            icon={<FaTrash />}
            iconPlacement="left"
            disabled={removeActionBtnDisabledLists}
            label="Usuń"
            title="Usuń zaznaczone listy przedmiotów"
        >
            Usuń
        </Button>,
        <form className={styles['name-form']} onSubmit={addList}>
            <input placeholder="Nazwa" name="name" />
            <Button
                primary
                icon={<FaPlus />}
                iconPlacement="left"
                label="Dodaj"
                title="Dodaj nową listę"
            >
                Dodaj listę
            </Button>
        </form>,
    ];

    const listsColumns = [
        {
            id: "listName",
            title: "Nazwa",
            key: "name"
        },
        {
            id: "accessCode",
            title: "Kod dostępu",
            key: "accessCode"
        }
    ];

    const editList: TableActionOnClick = (e, row) => {
        console.log("Edit", row);
    };

    const removeList: TableActionOnClick = async (e, row) => {
        try {

            const response = await fetch(`http://localhost:3001/api/list/${row.id}`, {
                method: 'delete',
                credentials: 'include',
                headers: [
                    ['Content-Type', 'application/json']
                ]
            }).then(r => r.json());

            if(response.status !== 'ok')
                alert(response.message);
            else
                window.location.reload();

        }catch(err) {

            console.error(err);
            alert('Wystapil blad!');

        }
    };



    const addContribution: FormEventHandler<HTMLFormElement> = (event) => {

    }

    const removeSelectedContributions = () => {

    }

    const removeContribution = (row) => {

    }

    const contributionsActions = [
        <Button
            onClick={removeSelectedContributions}
            danger
            icon={<FaTrash />}
            iconPlacement="left"
            disabled={removeActionBtnDisabledLists}
            label="Usuń"
            title="Usuń zaznaczone listy przedmiotów"
        >
            Usuń
        </Button>,
        <form className={styles['name-form']} onSubmit={addContribution}>
            <input placeholder="Kod" name="code" />
            <Button
                primary
                icon={<FaPlus />}
                iconPlacement="left"
                label="Dodaj"
                title="Dodaj nową listę"
            >
                Dodaj listę
            </Button>
        </form>,
    ]

    const contributionsColumns = [
        {
            id: "contributionName",
            title: "Nazwa",
            key: "name"
        }
    ]

    return (
        <>
            <Panel title="Moje listy przedmiotów" actions={listsActions}>
                {listsLoading && "Trwa wczytywanie..."}
                {listsError && listsError?.message}
                {
                    listsData && <Table
                        onRowSelect={handleListSelect}
                        className="panel-table"
                        columns={listsColumns}
                        data={listsData}
                        actions={[
                            {
                                id: "view",
                                onClick: (e, row) => navigate(`/list/${row.id}`)
                            },
                            {
                                id: "edit",
                                onClick: editList,
                            },
                            {
                                id: "remove",
                                onClick: removeList,
                            },
                        ]}
                    />
                }
            </Panel>
            <Panel title="Moje listy przedmiotów" actions={contributionsActions}>
                {contributionsLoading && "Trwa wczytywanie..."}
                {contributionsError && contributionsError?.message}
                {
                    contributionsData && <Table
                        onRowSelect={handleContributionSelect}
                        className="panel-table"
                        columns={contributionsColumns}
                        data={contributionsData}
                        actions={[
                            {
                                id: "view",
                                onClick: (e, row) => navigate(`/list/${row.id}`)
                            },
                            {
                                id: "remove",
                                onClick: removeContribution,
                            }
                        ]}
                    />
                }
            </Panel>
        </>
    );
}
