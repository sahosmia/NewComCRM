<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Exports\GeneralExport;
use App\Models\Unit;
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends Controller
{
    public function __construct(
        private ProductService $productService,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Products/Index', [
            'products' => $this->productService->paginateIndex($request->all()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Products/Create', [
            'units' => Unit::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $this->productService->create($request->validated());

        return redirect()->route('products.index')
            ->with('success', 'Product created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('Products/Show', [
            'product' => $product->load('unit'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product,
            'units' => Unit::all(),

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $this->productService->update($product, $request->validated());

        return redirect()->route('products.index')
            ->with('success', 'Product updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $this->productService->delete($product);

        return redirect()->route('products.index')
            ->with('success', 'Product deleted successfully');
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->input('ids', []);
        $this->productService->bulkDelete($ids);

        return back()->with('success', 'Products deleted successfully');
    }

    public function export(Request $request)
    {
        $ids = $request->input('ids', []);

        $query = Product::query();

        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }

        $products = $query->get();

        return Excel::download(new GeneralExport(
            $products,
            ['Name', 'Brand', 'Model', 'Category', 'Stock', 'Price', 'Supplier'],
            function ($product) {
                return [
                    $product->name,
                    $product->brand,
                    $product->model,
                    $product->category,
                    $product->stock_quantity,
                    $product->unit_price,
                    $product->supplier_name,
                ];
            }
        ), 'products.xlsx');
    }

    public function print(Request $request)
    {
        $ids = $request->input('ids', []);
        $query = Product::query();
        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }
        $products = $query->get();

        $data = $products->map(function ($product) {
            return [
                $product->name,
                $product->brand,
                $product->model,
                $product->category,
                $product->stock_quantity,
                $product->unit_price,
                $product->supplier_name,
            ];
        });

        return view('print.general', [
            'title' => 'Product List',
            'headings' => ['Name', 'Brand', 'Model', 'Category', 'Stock', 'Price', 'Supplier'],
            'data' => $data
        ]);
    }
}
