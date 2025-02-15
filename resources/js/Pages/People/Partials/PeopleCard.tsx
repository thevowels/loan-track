import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Button, Input } from "@headlessui/react";
import { useForm, Link, usePage } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { useRoute } from "../../../../../vendor/tightenco/ziggy/src/js";
export default function PeopleCard({person}:{person:any}){

    const transactions:any = person.transactions;
    const accumulatedResult = transactions.reduce((a:any,b:any)=> {
        if(b.loan){
            a.loan+=b.amount;
        }else{
            a.repay+=b.amount;
        }
        return a;
    },{loan:0,repay:0});
    const netLoan = accumulatedResult.loan - accumulatedResult.repay;
    
    const [confirmDelete, setConfirmDelete] = useState(false);
    const route = useRoute();
    const closeModal = () => {
        setConfirmDelete(false);
    };
    const {delete:destroy}=useForm();

    function detail(){
        route('people.show', person);
    }
    const remove: FormEventHandler = (e) => {
        e.preventDefault();
        console.log('deleting ', person.name);
        console.log(route('people.destroy', person));
        destroy(route('people.destroy', person));
        setConfirmDelete(false);
    }

    return (
        <div className=" bg-slate-100 shadow-md pt-4 pb-8 min-w-72 sm:min-w-none mx-auto sm:mx-0">
            <div className="flex justify-end">
                <DangerButton onClick={()=>setConfirmDelete(true)}>
                    X
                </DangerButton>

            </div>
            <img src="https://dummyjson.com/icon/emilys/128" className="mx-auto"/>
            <div className="text-center text-xl font-bold pt-4">
            {person.name} 
            </div>
            <div className="text-center text-xl font-bold pb-8 ">
             Net Loan <span className="text-red-500">{netLoan}</span> 
            </div>
            <div className="font-semibold text-sm">
                Phone: {person.phone}
            </div>
            {true || person.picture && <div className="font-semibold text-sm">
                {person.picture}
            </div>
            }
            <div className="flex justify-center my-4">
                <Link
                    href={route('people.show', person)}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 bg-neutral-200 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                >
                    Details
                </Link>

            </div>
            <Modal show={confirmDelete} onClose={closeModal}>
                <form onSubmit={remove} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete <span className="font-bold text-red-500">{person.name}</span>?
                    </h2>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ms-3" type="submit">
                            Remove Person
                        </DangerButton>
                    </div>

                </form>
            </Modal>
            
        </div>
    )
}