<?php

namespace App\Providers;

use App\Models\Product;
use App\Repositories\All\Categories\CategoryInterface;
use App\Repositories\All\Categories\CategoryRepository;
use App\Repositories\All\Products\ProductInterface;
use App\Repositories\All\Products\ProductRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(CategoryInterface::class,CategoryRepository::class);
        $this->app->bind(ProductInterface::class,ProductRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
