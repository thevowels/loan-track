import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link} from '@inertiajs/react';
import PersonInfo from './Partials/PersonInfo';
import PrimaryButton from '@/Components/PrimaryButton';
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js";
import RelatedTRansactions from './Partials/RelatedTransactions';
export default function Person({auth,person, transactions}:{auth:any,person:any,transactions:any}){
    const route = useRoute();
    return(
        <AuthenticatedLayout
            header={
                <div className="text-xl font-semibold leading-tight text-green-800 flex justify-between">
                    <div>
                        Person Detail
                    </div>
                    <Link href={route('people.edit', person)}>
                        Edit
                    </Link>
                </div>
            }
        >
            <Head title={person.name}/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <PersonInfo />
                    
                    <div className="bg-white p-4 max-w-7xl shadow sm:rounded-lg sm:p-8 flex  ">
                        Additional Todos
                    </div>
                    <RelatedTRansactions/>
                </div>
            </div>
            

        </AuthenticatedLayout>
    )
}