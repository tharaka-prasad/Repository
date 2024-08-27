<?php

namespace App\Http\Controllers\products;

use App\Http\Controllers\categories\categoriesController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;

class productsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all products with their categories
        $products = Product::with('category')->get();

        // Pass the products data to the Inertia view
        return Inertia::render('products/All/Index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories=Category::all();
        return Inertia::render('products/Create/Index',
        ['categories'=>$categories]
    );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'status' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:8192',
        ]);
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $validated['image'] = $imagePath;
        }



        // Create the product
        Product::create($validated);

        // Redirect back to the products index with a success message
        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {

        // $product = Product::all();


        return Inertia::render('products/Show/Index', [
            'product' => $product,
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {

        $categories = Category::all();

        return Inertia::render('products/Edit/Index', [
            'product' => $product,
            'categories' =>$categories


        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $product = Product::findOrFail($id);

    // Debugging: Check if the image is being received
    // dd($request->all()); // Uncomment this to see what is being received by the controller

    // Validate the request data
    $validated = $request->validate([
        'name' => 'nullable|string|max:255',
        'description' => 'nullable|string',
        'price' => 'nullable|numeric',
        'category_id' => 'nullable|exists:categories,id',
        'status' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:8192', // Image validation
    ]);

    // Handle the image upload if a new image is provided
    if ($request->hasFile('image')) {
        // Delete the old image if it exists
        if ($product->image) {
            Storage::delete('public/' . $product->image);
        }

        // Store the new image and save the path
        $imagePath = $request->file('image')->store('products', 'public');
        $validated['image'] = $imagePath;
    } else {
        // Keep the existing image if no new image is uploaded
        $validated['image'] = $product->image;
    }

    // Update the product with validated data
    $product->update($validated);

    // Debugging: Check if the product is updated correctly
    // dd($product); // Uncomment this to see the updated product data

    return redirect()->route('products.index')->with('success', 'Product updated successfully.');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Find the category and delete it
        $products = Product::findOrFail($id);
        $products->delete();

        // Redirect to the categories index page
        return redirect()->route('products.index')->with('success', 'product deleted successfully.');
    }


}
