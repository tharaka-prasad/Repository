<?php
namespace App\Repositories\All\Products;

use App\Models\Product;
use App\Repositories\All\Products\ProductInterface;
use App\Repositories\Base\BaseRepository;

// repository Class
class ProductRepository extends BaseRepository implements ProductInterface
{
    /**
     * @var Product
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param Product $model
     */
    public function __construct(Product $model)
    {
        $this->model = $model;
    }
    public function getAll()
    {
        return Product::with('category')->get();
    }

    public function getById($id)
    {
        return Product::with('category')->findOrFail($id);
    }
    public function delete($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
    }


}
