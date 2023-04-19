<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function index()
    {
        try {
            return Order::all();
        } catch (\Exception $e) {
            return response('Can not get categories list', 500);
        }
    }


    public function create(Request $request)
    {
        try {
            $data = new Order;

            $data->first_name = $request->first_name;
            $data->last_name = $request->last_name;
            $data->adress = $request->adress;
            $data->phone = $request->phone;
            $data->email = $request->email;
            $data->payment_method = $request->payment_method;
            $data->shipping_method = $request->shipping_method;
            $data->product_qty = $request->product_qty;
            $data->product_id = $request->product_id;


            $data->save();
            return 'Your order was successfull';
        } catch (\Exception $e) {
            return response('Can not make your order', 500);
        }
    }


    public function edit(Request $request, $id)
    {

        try {
            $data = Order::find($id);

            $data->is_completed = $request->is_completed;


            $data->save();
            return 'Order status successfully updated';
        } catch (\Exception $e) {
            return response('Can not update order status', 500);
        }
    }
}
