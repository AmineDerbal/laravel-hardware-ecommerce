<?php

namespace App\Http\Requests\CartItems;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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

            'id' => 'required|exists:cart_items,id',
             'product_id' => 'required|exists:products,id',
             'cart_id' => 'required|exists:carts,id',
            'quantity' => 'required|integer|min:1',
        ];
    }
}
