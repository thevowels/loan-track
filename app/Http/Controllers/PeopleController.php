<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePeopleRequest;
use App\Models\People;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class PeopleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        // dump(People::all()->toArray());
        return Inertia::render('People/Index',[
            'people'=>People::where('user_id',Auth::user()->id)->with('user:id,name,email')->with('transactions')->get(),
            'transactions' => Transaction::where('user_id', Auth::user()->id)->get(),
            // 'people'=>People::where('user_id',2)->with('user:id,name,email')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePeopleRequest $request)
    {
        //
        // $request->validate()
        // $validated = $request->validate();
        $request->user()->people()->create($request->validated());
        sleep(rand(1,3));
        redirect(route('people.index'));    }

    /**
     * Display the specified resource.
     */
    public function show(People $person)
    {
        return Inertia::render('People/Person', [
            'person' => $person,
            'transactions' => $person->transactions()->get(),
        ]);
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(People $person)
    {
        //
        
        return Inertia::render('People/Edit', [
            'person'=>$person,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePeopleRequest $request, People $person)
    {
        //
        $updatedPerson = People::updateOrCreate(
            ['id'=>$person->id],
            $request->validated()
        );
        // dd($updatedPerson);
        // dump($request->validated());
        // dd($person->id);

        return redirect(route('people.show', $person));    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(People $person)
    {
        //
        // if($people->user_id == Auth::user()->id){
        //     People::find($people->id)->delete();
        // }
        sleep(rand(1,2));
        $person->delete();
        // dump($person);
        return redirect(route('people.index'));    

    }
}
