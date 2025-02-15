<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePeopleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'=> ['required', 'max:30', 'min:5'],
            'phone' => ['required', 'min:6','max:15']
        ];
    }
    public function messages(): array
{
    return [
        'name.required' => 'နာမည်ရိုက်ထည့်ပါ',
        'name.min' => 'နာမည် တိုလွန်းပါသည်',
    ];
}


}
