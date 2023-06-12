import React, { Context, FormEvent, ReactNode, createContext, useRef } from "react";
import ListModel from "../models/ListModel";

interface Data {
    selectable?: boolean;
    openable?: boolean;
    editable?: boolean;
    removable?: boolean;
}

interface Props {
    id: string;
    title: string;
    input: {
        name: string;
        placeholder: string;
        value: string;
    };
    data: Data;
    children: ReactNode[];
    items: [ListModel[], React.Dispatch<React.SetStateAction<ListModel[]>>];
}

export const DataContext: Context<Data> = createContext({});

export default function List({ id, title, input, data, items }: Props) {
    const checkbox = useRef<HTMLInputElement>(null);
    const deleteButton = useRef<HTMLButtonElement>(null);
    const addButton = useRef<HTMLButtonElement>(null);
    const form = useRef<HTMLFormElement>(null);
    const formInput = useRef<HTMLInputElement>(null);

    function onFormSubmit(event: FormEvent) {
        // event.preventDefault();
        // if (
        //     formInput.current == null ||
        //     form.current == null ||
        //     addButton.current == null ||
        //     !formInput.current.value.length
        // )
        //     return;
        // form.current.classList.add("hidden");
        // addButton.current.classList.remove("hidden");
        // fetch("http://localhost:3001/api/list", {
        //     method: "POST",
        //     headers: [["Content-Type", "application/json"]],
        //     body: JSON.stringify({ name: formInput.current.value }),
        // }).then(res => res.json())
        //     .then((data: ListModel) => {
        //         const newElement = React.cloneElement(itemSource, {
        //             key: data.list_id,
        //             items: [data.name, data.access_code]
        //         });
        //         children.push(newElement);
        //     });
        // formInput.current.value = "";
    }

    return (
        // <div id={id} className='list flex--column'>
        //     <div className='list-header'>
        //         <h1 className='list-title'>{title}</h1>
        //     </div>
        //     <div className='list-controls flex'>
        //         {data?.selectable && (
        //             <input
        //                 type='checkbox'
        //                 className='list-select'
        //                 disabled={items.length ? false : true}
        //                 ref={checkbox}
        //             />
        //         )}
        //         <div className='list-controls-buttons flex'>
        //             {data?.selectable && (
        //                 <button
        //                     className='list-delete barrel'
        //                     ref={deleteButton}
        //                     disabled
        //                 >
        //                     <i className='fa-regular fa-trash-can'></i>Usuń
        //                 </button>
        //             )}
        //             <AddListItem
        //                 onSubmit={onFormSubmit}
        //                 addButtonRef={addButton}
        //                 formInputRef={formInput}
        //                 formRef={form}
        //             />
        //         </div>
        //     </div>
        //     <div className='list-contents'>
        //         <DataContext.Provider value={data}>
        //             {items.map(item =>
        //                 <div
        //                     className='list-item'
        //                     data-selectable={data.selectable}
        //                     data-openable={data.openable}
        //                     data-editable={data.editable}
        //                     data-removable={data.removable}
        //                 >
        //                     {data?.selectable && (
        //                         <input type='checkbox' className='checkbox list-item-select' />
        //                     )}
        //                     <div className='list-item-contents'>
        //                         {items?.map((item, i) => (
        //                             <div key={i} className='list-item-text'>{item}</div>
        //                         ))}
        //                     </div>
        //                     {children}
        //                 </div>)}
        //         </DataContext.Provider>
        //     </div>
        // </div>
        <></>
    );
}
