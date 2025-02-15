<?php

namespace Database\Factories;

use App\Models\People;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tempP = People::inRandomOrder()->first()?? People::factory();
        return [
            //
            'user_id'=> $tempP->user_id,
            'person_id'=> $tempP->id,
            'loan'=> fake()->boolean(),
            'amount'=>fake()->numberBetween(30000, 100000)
        ];
    }
}
