<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categories;

class CategoriesController extends Controller
{
    public function index()
    {
        try {
            return Categories::all();
        } catch (\Exception $e) {
            return response('Can not get categories list', 500);
        }
    }

    public function categoryProducts($id)
    {
        try {
            return Categories::with('products')->find($id);
        } catch (\Exception $e) {
            return response('Can not get category information', 500);
        }
    }

    public function singleCategory($id)
    {
        try {
            return Categories::find($id);
        } catch (\Exception $e) {
            return response('Can not get category information', 500);
        }
    }

    public function create(Request $request)
    {
        try {
            $data = new Categories;

            $data->name = $request->name;


            $data->save();
            return 'Category successfully created';
        } catch (\Exception $e) {
            return response('Can not save the product', 500);
        }
    }


    public function delete($id)
    {
        try {
            Categories::find($id)->delete();
            return 'Category successfully deleted';
        } catch (\Exception $e) {
            return response('Something went wrong', 500);
        }
    }

    public function edit(Request $request, $id)
    {

        try {
            $data = Categories::find($id);

            $data->name = $request->name;


            $data->save();
            return 'Product successfully updated';
        } catch (\Exception $e) {
            return response('Can not edit this category', 500);
        }
    }
}
