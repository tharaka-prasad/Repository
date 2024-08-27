<?php
namespace App\Repositories\All\Products;

use App\Repositories\Base\BaseRepositoryInterface;
use App\Repositories\Base\EloquentRepositoryInterface;



// Interface
interface ProductInterface extends BaseRepositoryInterface

    {
        public function getAll();

        public function getById($id);

        public function delete($id);

}
