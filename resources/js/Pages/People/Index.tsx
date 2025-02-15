
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage } from "@inertiajs/react";
import PeopleCard from './Partials/PeopleCard';
import PeopleGrid from './Partials/PeopleGrid';
import AddUserForm from './Partials/AddUserForm';

export default function Index({people, transactions}:{auth:any,people:any,transactions:any})
{

    const user = usePage().props.auth.user;
    console.log(transactions);
    return(
        <AuthenticatedLayout
            header={
                <div className="text-xl font-semibold leading-tight text-green-800 flex justify-between">
                    <div>
                        People
                    </div>
                    <div>
                        {user['name']}
                    </div>
                </div>
            }
        >
            <Head title="People Blah Blah"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                        <AddUserForm/>
                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                            <PeopleGrid/>
                        </div>
                    
                </div>
            </div>


        </AuthenticatedLayout>
    )
}