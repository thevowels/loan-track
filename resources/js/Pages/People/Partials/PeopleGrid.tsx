import { usePage } from "@inertiajs/react";
import PeopleCard from "./PeopleCard";

export default function PeopleGrid(){
    
    const peoples:any = usePage().props.people;

    console.log('log form people grid', peoples);
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {peoples.map((x:any)=><PeopleCard key={x.id} person={x}/>)}
        </div>
    )
}