
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, usePage } from "@inertiajs/react"
import dayjs from "dayjs";
import { useState } from "react";


export default function UserSummary(){
    const transactions:any = usePage().props.transactions;
    const paginated:any = usePage().props.paginated;


    const accumulatedResult = transactions.reduce((a:any,b:any)=> {
        if(b.loan){
            a.loan+=b.amount;
        }else{
            a.repay+=b.amount;
        }
        return a;
    },{loan:0,repay:0});

    const [showAll, setShowAll ] = useState(paginated.current_page != 1);

    return(
        <div>
        <section id="summary" className='overflow-hidden bg-white shadow-sm sm:rounded-md mt-8'>
            <div className="p-6 ">
                <a  href="#summary">User Summary</a>
                <div className="flex max-w-sm justify-between mx-auto text-lg font-semibold font-serif text-center">
                    <div>
                        Total Loan
                        <div className="font-sans text-red-600">
                            {accumulatedResult.loan}
                        </div>
                    </div>
                    <div>
                        Total Return
                        <div className="font-sans text-green-600">
                            {accumulatedResult.repay}
                        </div>
                    </div>
                </div>
                <div className="flex max-w-sm justify-center mx-auto text-lg font-semibold font-serif text-center">
                    <div>
                        Net Loan
                        <div className="font-sans">
                            {accumulatedResult.loan - accumulatedResult.repay}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="transactions" className='overflow-hidden bg-white shadow-sm sm:rounded-md mt-8'>
            <div className="p-6">
            Transactions

            <div className="max-w-lg mx-auto">
                {showAll ?
                        <div className=" flex flex-col h-[350px] justify-between">
                            <div>

                            {paginated.data.map((transaction: any) => 
                                <div className="flex justify-between items-center text-sm font-medium my-2 border-b border-gray-300 " key={transaction.id}>
                                    <div className="w-32">{transaction.people.name}</div> 
                                    <div className="">{transaction.amount}</div>
                                    <div>{dayjs(transaction.created_at).format('DD/MM/YYYY HH:mm')}</div> 
                                </div>)   
                            }
                            </div>    
                            <div className="justify-between flex mx-4 ">
                            <Link href={paginated.prev_page_url} className=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg">Previous</Link>
                            <Link href={paginated.next_page_url} className=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg">Next</Link>
                            </div>
                        </div>
                        :
                        transactions.slice(0,5).map((transaction: any) => 
                            <div className="flex justify-between items-center text-sm font-medium my-2 border-b border-gray-300 " key={transaction.id}>
                                 <div className="w-32">{transaction.people.name}</div> 
                                 <div className="">{transaction.amount}</div>
                                 <div>{dayjs(transaction.created_at).format('DD/MM/YYYY HH:mm')}</div> 
                            </div>)}
                <div className="text-center text-muted text-blue-800 mt-4">
                    {showAll ? 
                        <PrimaryButton onClick={() => setShowAll(false)}>
                            Collapse
                        </PrimaryButton>
                        :
                        <PrimaryButton onClick={ ()=> setShowAll(true)}>
                            Load More
                        </PrimaryButton>
                    }   
                </div>
                </div>
            </div>

        </section>
        </div>
    )
}