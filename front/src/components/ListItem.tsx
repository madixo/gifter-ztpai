import { ReactNode, useContext } from "react";
import { DataContext } from "./List";

interface Props {
    // data: {
    //     selectable?: boolean;
    //     openable?: boolean;
    //     editable?: boolean;
    //     removable?: boolean;
    // };
    items?: (string | number)[];
    children: ReactNode;
}

export default function ListItem({ items, children }: Props) {
    const data = useContext(DataContext);
    return (
        // <div
        //     className='list-item'
        //     data-selectable={data.selectable}
        //     data-openable={data.openable}
        //     data-editable={data.editable}
        //     data-removable={data.removable}
        // >
        //     {data?.selectable && (
        //         <input type='checkbox' className='checkbox list-item-select' />
        //     )}
        //     <div className='list-item-contents'>
        //         {items?.map((item, i) => (
        //             <div key={i} className='list-item-text'>{item}</div>
        //         ))}
        //     </div>
        //     {children}
        // </div>
        <></>
    );
}
