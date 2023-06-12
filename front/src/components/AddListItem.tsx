export default () => {};

// import Button from "components/common/Button/Button";
// import {FormEventHandler, RefObject, useEffect} from "react";

// interface Props {
//   onSubmit: FormEventHandler;
//   addButtonRef: RefObject<HTMLButtonElement>;
//   formRef: RefObject<HTMLFormElement>;
//   formInputRef: RefObject<HTMLInputElement>;
// }

// export default function AddListItem({
//   onSubmit,
//   addButtonRef,
//   formRef,
//   formInputRef,
// }: Props) {
//   function showForm() {
//     if (
//       addButtonRef.current == null || formRef.current == null ||
//       formInputRef.current == null
//     ) return;
//     addButtonRef.current.classList.add("hidden");
//     formRef.current.classList.remove("hidden");
//     formInputRef.current.focus();
//   }
//   function hideForm() {
//     if (addButtonRef.current == null || formRef.current == null) return;
//     addButtonRef.current.classList.remove("hidden");
//     formRef.current.classList.add("hidden");
//   }
//   useEffect(() => {
//     function click(event: MouseEvent) {
//       if (addButtonRef.current == null || formRef.current == null) return;
//       if (
//         ![...Array.from(formRef.current.children), addButtonRef.current]
//           .includes(event.target as Element) &&
//         !formRef.current.classList.contains("hidden")
//       ) hideForm();
//     }
//     document.addEventListener("click", click);
//     return () => document.removeEventListener("click", click);
//   }, [formRef, addButtonRef]);
//   return (
//     <>
//       <button
//         className="list-add barrel"
//         ref={addButtonRef}
//         onClick={showForm}
//       >
//         <i className="fa-solid fa-plus"></i>Dodaj
//       </button>
//       <form
//         className="flex hidden"
//         ref={formRef}
//         onKeyDown={(e) => (e.key === "Escape" ? hideForm() : undefined)}
//         onSubmit={onSubmit}
//       >
//         <input className="barrel" type="text"  />
//         <Button primary label="dodaj" ref={formInputRef}>Dodaj</Button>
//       </form>
//     </>
//   );
// }
