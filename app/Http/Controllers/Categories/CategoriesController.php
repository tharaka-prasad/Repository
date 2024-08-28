<?php

namespace App\Http\Controllers\categories;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Repositories\All\Categories\CategoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class categoriesController extends Controller
{

    public function __construct(protected CategoryInterface $categoryInterface){

    }

    /**
     * Display a listing of the resource.
     *
     */


    public function index()
    {
        $categories = $this->categoryInterface->all(); //$this->categoryInterface->all();

        // $categories = Category::all();
        return Inertia::render('categories/All/Index', [
            'categories' => $categories
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = $this->categoryInterface->all();
        return Inertia::render('categories/Create/Index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'description' => 'nullable|string',
        ]);

        $this->categoryInterface->create($request->all());

        return redirect()->route('categories.index')->with('success', 'Category created successfully.');
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $category = $this->categoryInterface->findById($id);
        return Inertia::render('categories/Show/Index', [
            'category' => $category
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $category = $this->categoryInterface->findById($id);

        return Inertia::render('categories/Edit/Index', [
            'category' => $category,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $this->categoryInterface->update($id, $request->all());

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
        {
        // Find the category and delete it
        $this->categoryInterface->deleteById($id);

        // Redirect to the categories index page
        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }
    public function autoGenerate()
{
    // Generate a random category name
    $categoryName = 'Category ' . rand(1, 1000);

    // Create the category
    $category = Category::create([
        'name' => $categoryName,
        'description' => 'Auto-generated category',
    ]);

    // Redirect back with a success message
    return redirect()->route('categories.index')->with('success', 'Category "' . $category->name . '" auto-generated successfully.');
}

}
