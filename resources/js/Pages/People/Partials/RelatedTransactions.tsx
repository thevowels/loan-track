import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { Switch } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FormEventHandler, useState } from "react";




export default function RelatedTRansactions(){

    const transactions:any = usePage().props.transactions;
    const person:any = usePage().props.person;

    const { data, setData, post, processing, errors, reset } = useForm({
        people_id: person.id,
        amount:"",
        loan: true,
      })
      


    const [addForm, setAddForm ] = useState(false);
    const closeModal = ()=>{
        setAddForm(false);
    }
    const openModal = () =>{
        setAddForm(true);
    }
    const addTransaction:FormEventHandler = (e)=>{
        e.preventDefault();
        console.log('submitted', data);
        post(route('people.transactions.store',person), {onSuccess: () => {reset();closeModal();}});
        
    }
    
    console.log('RElated Transactions', transactions);
    return(
        <div className="bg-white p-4 max-w-7xl shadow sm:rounded-lg sm:p-8">

            Related Transactions
                <div className="max-w-lg mx-auto">
                {transactions && transactions.map((transaction: any) => 
                            <div className="flex justify-between items-center text-sm font-medium my-2 border-b border-gray-300 " key={transaction.id}>
                                 <div className="">{transaction.amount}</div>
                                 <div>{transaction.loan? "Loan":"Return"}</div>
                                 <div>{dayjs(transaction.created_at).format('DD/MM/YYYY HH:mm')}</div> 

                            </div>)}
                <div className="text-right mt-5 mx-4">
                    <PrimaryButton onClick={openModal}>Add</PrimaryButton>
                    <Modal show={addForm} onClose={closeModal} maxWidth="md" >
                        <form onSubmit={addTransaction} className="m-6 space-y-6 ">
                            <h2>{person.name}</h2>
                            <div className="max-w-md">
                                <InputLabel htmlFor="amount" value="Amount"/>
                                <TextInput
                                    id="amount"
                                    className="mt-1 block w-full"
                                    value={data.amount}
                                    onChange={(e)=>setData('amount', e.target.value)}
                                    required
                                    isFocused
                                />
                                <InputError className="mt-2" message={errors.amount}/>
                            </div>
                            <div >
                                <InputLabel htmlFor="loan" value={data.loan? "Loan":"Return"}/>
                                <Switch
                                    checked={data.loan}
                                    onChange={(e:any)=> setData('loan', e)}
                                    className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
                                    >
                                        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                                </Switch>

                            </div>

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={closeModal}>
                                    Cancel
                                </SecondaryButton>

                                <PrimaryButton className="ms-3" type="submit">
                                    Add
                                </PrimaryButton>
                            </div>
                        </form>
                    </Modal>
                </div>
                </div>
            </div>


    )
}