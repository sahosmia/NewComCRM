<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    DashboardController,
    CustomerController,
    ProductController,
    FollowUpController,
    MeetingController,
    QuotationController,
    RequirementController,
    UserController,
    ReportController,
    CompanyController,
    SaleController
};

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Root redirect
Route::get('/', fn() => redirect()->route('login'))->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    // --- Dashboard ---
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // --- Customers ---
    Route::prefix('customers')->name('customers.')->group(function () {
        Route::controller(CustomerController::class)->group(function () {
            Route::delete('bulk-destroy', 'bulkDestroy')->name('bulkDestroy');
            Route::get('export/excel', 'export')->name('export');
            Route::post('import/excel', 'import')->name('import');
        });
        Route::resource('/', CustomerController::class)->parameters(['' => 'customer']);
    });
    Route::resource('customers', CustomerController::class);

    // --- Products ---
    Route::prefix('products')->name('products.')->group(function () {
        Route::controller(ProductController::class)->group(function () {
            Route::delete('bulk-destroy', 'bulkDestroy')->name('bulkDestroy');
            Route::get('export/excel', 'export')->name('export');
            Route::post('import/excel', 'import')->name('import');
        });
    });
    Route::resource('products', ProductController::class);

    // --- Follow Ups ---
    Route::patch('follow-ups/{follow_up}/status', [FollowUpController::class, 'updateStatus'])->name('follow-ups.update-status');
    Route::post('follow-ups/{follow_up}/complete', [FollowUpController::class, 'complete'])->name('follow-ups.complete');
    Route::resource('follow-ups', FollowUpController::class);

    // --- Meetings ---
    Route::get('meetings/calendar', [MeetingController::class, 'calendar'])->name('meetings.calendar');
    Route::resource('meetings', MeetingController::class);

    // --- Quotations ---
    Route::prefix('quotations')->name('quotations.')->controller(QuotationController::class)->group(function () {
        Route::post('{quotation}/send', 'send')->name('send');
        Route::get('{quotation}/download', 'download')->name('download');
        Route::post('{quotation}/duplicate', 'duplicate')->name('duplicate');
    });
    Route::resource('quotations', QuotationController::class);

    // --- Reports ---
    Route::prefix('reports')->name('reports.')->controller(ReportController::class)->group(function () {
        Route::get('follow-ups', 'followUps')->name('follow-ups');
        Route::get('sales', 'sales')->name('sales');
        Route::get('customers', 'customers')->name('customers');
    });

    // --- Other Resources ---
    Route::get('sales', [SaleController::class, 'index'])->name('sales.index');
    Route::patch('requirements/{requirement}/status', [RequirementController::class, 'updateStatus'])->name('requirements.update-status');
    Route::resources([
        'requirements' => RequirementController::class,
        'companies' => CompanyController::class,
    ]);

    // --- Administration ---
    Route::middleware(['role:super_admin'])->group(function () {
        Route::resource('users', UserController::class);
    });
});

require __DIR__.'/settings.php';
