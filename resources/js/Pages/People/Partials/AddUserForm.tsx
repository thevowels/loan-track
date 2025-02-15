import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';


export default function AddUserForm({toEdit}:{toEdit?:any}){

    const [addUser, setAddUser] = useState(false);

    const user = usePage().props.auth.user;
    // console.log('Add/Edit form ', toEdit ? true:false);
    const {data, setData, post, put,  errors, processing, reset, recentlySuccessful } = 
            useForm({
                name:toEdit?.name || '',
                phone: toEdit?.phone || '',

            })
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if(toEdit){
            put(route('people.update', toEdit), {onSuccess: () => reset()});
        }else{
            post(route('people.store'),  { onSuccess: () =>{reset(); setAddUser(false);}  });
        }
    }
    return(
        <div className="bg-white p-4 max-w-7xl shadow sm:rounded-lg sm:p-8 flex justify-center">
            {
                addUser ? 
                <section className='max-w-sm'>
                <header>
                    <h2 className="text-lg font-medium text-gray-900">
                        {user.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Update your account's profile information and email address.
                    </p>
                </header>
                <form onSubmit={submit} className='mt-6 space-y-6'>
                    <div>
                        <InputLabel htmlFor='name' value="Name" />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value = {data.name}
                            onChange={(e)=> setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete='name'
                            />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div>
                        <InputLabel htmlFor='phone' value="Phone"/>

                        <TextInput
                            id="phone"
                            className="mt-1 block w-full"
                            value={data.phone}
                            onChange={(e)=> setData('phone', e.target.value)}
                            required
                            autoComplete='phone'
                        />
                        <InputError className="mt-2" message={errors.phone} />

                    </div>

                    <div className='flex items-center gap-4'>
                        <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">
                                Saved.
                            </p>
                        </Transition>
                        
                    </div>
                </form>

            </section>

            :
            <PrimaryButton onClick={()=>setAddUser(true)}>
                Add User
            </PrimaryButton>
    

            }
        </div>
    )
}