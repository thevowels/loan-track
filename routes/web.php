<?php

use App\Models\User;
use App\Models\People;
use App\Models\Transaction;


use App\Http\Controllers\PeopleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function ( Request $request) {
    return Inertia::render('Dashboard',[
        'people'=>People::where('user_id',Auth::user()->id)->with('user:id,name,email')->get(),
        'transactions' => Transaction::with('people:id,name')->where('user_id', Auth::user()->id)->orderBy('created_at', 'desc')->limit(5)->get(),
        'paginated' => Transaction::with('people:id,name')->where('user_id', Auth::user()->id)->orderBy('created_at', 'desc')->paginate(10),
]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/users', function(Request $request){

    $users = User::all();
    dump($users->toArray());
    dump($request->user());
});


Route::resource('people', PeopleController::class)
    ->only(['index','store', 'destroy','show', 'edit', 'update'])
    ->middleware('auth');

Route::resource('people.transactions', TransactionController::class)
    ->only(['index', 'store'])
    ->middleware('auth');

Route::get('/dev',function(){
    return Transaction::paginate(5);
});

require __DIR__.'/auth.php';
