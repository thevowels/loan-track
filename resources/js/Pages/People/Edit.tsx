import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AddUserForm from './Partials/AddUserForm';

export default function Edit({person}:{person:any}){
    return(
        <AuthenticatedLayout
            header={
                <div className="text-xl font-semibold leading-tight text-green-800 flex justify-between">
                    <div>
                        Editing
                    </div>
                    <div>
                        {person.name}
                    </div>
                </div>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">

                    <AddUserForm toEdit={person}/>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}