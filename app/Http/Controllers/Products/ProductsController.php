<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Product;
use App\Repositories\All\Products\ProductInterface;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    protected $productInterface;

    public function __construct(ProductInterface $productInterface)
    {
        $this->productInterface = $productInterface;
    }

    public function index()
    {
        // Fetch all products with their categories using the repository
        $products = $this->productInterface->getAll();

        // Pass the products data to the Inertia view
        return Inertia::render('products/All/Index', [
            'products' => $products
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        return Inertia::render('products/Create/Index', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
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

        $this->productInterface->create($validated);

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    public function show($id)
    {
        $product = $this->productInterface->getById($id);
        return Inertia::render('products/Show/Index', [
            'product' => $product
        ]);
    }

    public function edit($id)
    {
        $product = $this->productInterface->getById($id);
        $categories = Category::all();

        return Inertia::render('products/Edit/Index', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

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

        $imagePath = $request->file('image')->store('products', 'public');
        $validated['image'] = $imagePath;
    } else {
        $validated['image'] = $product->image;
    }

    $product->update($validated);


    return redirect()->route('products.index')->with('success', 'Product updated successfully.');
}


    public function destroy($id)
    {
        $this->productInterface->delete($id);
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
