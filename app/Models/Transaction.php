<?php

namespace App\Models;

use App\Events\TransactionCreated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transaction extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory;
    
    protected $fillable = [
        'amount',
        'loan',
        'people_id',
    ];

    protected $dispatchesEvents = [
        'created' => TransactionCreated::class,
    ];

    public function people(): BelongsTo
    {
        return $this->belongsTo(People::class,'people_id');
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function getRouteKeyName(): string
    {
        return 'id';
    }

}
