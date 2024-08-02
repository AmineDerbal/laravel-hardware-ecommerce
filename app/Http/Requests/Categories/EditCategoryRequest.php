<?php

namespace App\Http\Requests\Categories;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Category;

class EditCategoryRequest extends FormRequest
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

        $category = Category::find($this->id);

        return [
            'id' => 'required|exists:categories,id',
            'name' => 'required|unique:categories,name,' .$category->id,
            'parent_id' => [
                'nullable', // Allow null values for parent_id
                'exists:categories,id', // Validate that parent_id exists in the categories table
                'not_in:' . $category->id, // Ensure that parent_id is not the same as the current category ID
            ],
        ];
    }
}
