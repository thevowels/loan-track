import PrimaryButton from "@/Components/PrimaryButton";
import { usePage } from "@inertiajs/react"

export default function PersonInfo(){

    const person:any = usePage().props.person;
    const transactions:any = usePage().props.transactions;
    const accumulatedResult = transactions.reduce((a:any,b:any)=> {
        if(b.loan){
            a.loan+=b.amount;
        }else{
            a.repay+=b.amount;
        }
        return a;
    },{loan:0,repay:0});
    const netLoan = accumulatedResult.loan - accumulatedResult.repay;

    return(
        <div className="bg-white p-4 max-w-7xl shadow sm:rounded-lg sm:p-8 flex  ">
            <section className='max-w-sm row pt-8'>
                <div className="flex">
                    <div className="min-w-24">
                        Name
                    </div>
                    <div className="">
                        {person.name}
                    </div>
                </div>
                <div className="flex">
                    <div className="min-w-24">
                        Phone
                    </div>
                    <div className="">
                        {person.phone}
                    </div>
                </div>
                <div className="flex">
                    <div className="min-w-24">
                        Address
                    </div>
                    <div className="">
                        {person.picture}
                    </div>
                </div>
                <div className="text-2xl text-red-500 font-extrabold">
                    Net Loan: {netLoan}
                </div>
            </section>
            <section className="ps-8"> 
            <img src="https://dummyjson.com/icon/emilys/128" className="mx-auto"/>

            </section>
        </div>
    )
}