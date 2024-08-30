<?php

namespace App\Http\Requests\products;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Product;

class EditRequest extends FormRequest
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
        $product = Product::findOrFail($this->id);
        return [
            'id' => 'required|exists:products,id',
            'name' => 'nullable|string|max:255|unique:products,name,' . $product->id,
            'category_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric|gt:0',
            'stock' => 'nullable|integer|min:0',
        ];
    }
}
