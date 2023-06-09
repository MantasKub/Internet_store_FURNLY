<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;

class ProductsController extends Controller
{
    public function index()
    {
        $data = Products::with('categories')->get();

        return $data;
    }

    public function singleProduct($id)
    {
        try {
            return Products::with('categories')->find($id);
        } catch (\Exception $e) {
            return response('Can not get product information', 500);
        }
    }

    public function search($keyword)
    {
        try {
            return Products::where('name', 'LIKE', '%' . $keyword . '%')
                ->orWhere(['sku' => $keyword])->get();
        } catch (\Exception $e) {
            return response('Can not find any products', 500);
        }
    }

    public function order($field, $order)
    {
        try {
            return Products::with('categories')->orderBy($field, $order)->get();
        } catch (\Exception $e) {
            return response('Can not get any products', 500);
        }
    }

    public function create(Request $request)
    {
        try {
            $data = new Products;

            $data->name = $request->name;
            $data->sku = $request->sku;
            $data->photo = $request->photo;
            $data->warehouse_qty = $request->warehouse_qty;
            $data->price = $request->price;

            $data->save();

            $data->categories()->attach($request->categories);

            return 'Product successfully created';
        } catch (\Exception $e) {
            return response('Can not save the product', 500);
        }
    }

    public function edit(Request $request, $id)
    {

        try {
            $data = Products::find($id);

            $data->name = $request->name;
            $data->sku = $request->sku;
            $data->photo = $request->photo;
            $data->warehouse_qty = $request->warehouse_qty;
            $data->price = $request->price;

            $data->save();

            $data->categories()->sync($request->categories);

            return 'Product successfully updated';
        } catch (\Exception $e) {
            return response('Can not edit this product', 500);
        }
    }

    public function delete($id)
    {
        try {
            $data = Products::find($id);
            $data->categories()->detach();
            $data->delete();

            return 'Product successfully deleted';
        } catch (\Exception $e) {
            return response('Something went wrong', 500);
        }
    }
}
