<?php
namespace App\Repositories\All\Categories;

use App\Models\Category;
use App\Repositories\All\Categories\CategoryInterface;
use App\Repositories\Base\BaseRepository;


// repository Class
class CategoryRepository extends BaseRepository implements CategoryInterface
{
    /**
     * @var Category
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param Category $model
     */
    public function __construct(Category $model)
    {
        $this->model = $model;
    }
}
