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
    SaleController,
    UnitController
};
use Illuminate\Support\Facades\Artisan;

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
            Route::patch('{customer}/status', 'updateStatus')->name('update-status');
            Route::delete('bulk-destroy', 'bulkDestroy')->name('bulkDestroy');
            Route::get('export/excel', 'export')->name('export');
            Route::get('print', 'print')->name('print');
            Route::post('import/excel', 'import')->name('import');
        });
    });
    Route::resource('customers', CustomerController::class);

    // --- Products ---
    Route::prefix('products')->name('products.')->group(function () {
        Route::controller(ProductController::class)->group(function () {
            Route::delete('bulk-destroy', 'bulkDestroy')->name('bulkDestroy');
            Route::get('export/excel', 'export')->name('export');
            Route::get('print', 'print')->name('print');
            Route::post('import/excel', 'import')->name('import');
        });
    });
    Route::resource('products', ProductController::class);

    // --- Follow Ups ---
    Route::prefix('follow-ups')->name('follow-ups.')->group(function () {
        Route::get('export/excel', [FollowUpController::class, 'export'])->name('export');
        Route::get('print', [FollowUpController::class, 'print'])->name('print');
        Route::patch('{follow_up}/status', [FollowUpController::class, 'updateStatus'])->name('update-status');
        Route::post('{follow_up}/complete', [FollowUpController::class, 'complete'])->name('complete');
    });
    Route::resource('follow-ups', FollowUpController::class);

    // --- Meetings ---
    Route::prefix('meetings')->name('meetings.')->group(function () {
        Route::get('calendar', [MeetingController::class, 'calendar'])->name('calendar');
        Route::get('export/excel', [MeetingController::class, 'export'])->name('export');
        Route::get('print', [MeetingController::class, 'print'])->name('print');
    });
    Route::resource('meetings', MeetingController::class);

    // --- Quotations ---
    Route::prefix('quotations')->name('quotations.')->controller(QuotationController::class)->group(function () {
        Route::patch('{quotation}/status', 'updateStatus')->name('update-status');
        Route::post('{quotation}/send', 'send')->name('send');
        Route::get('{quotation}/download', 'download')->name('download');
        Route::post('{quotation}/duplicate', 'duplicate')->name('duplicate');
    });
    Route::resource('quotations', QuotationController::class);

    // --- Requirements ---
    Route::prefix('requirements')->name('requirements.')->group(function () {
        Route::get('export/excel', [RequirementController::class, 'export'])->name('export');
        Route::get('print', [RequirementController::class, 'print'])->name('print');
        Route::get('{requirement}/download', [RequirementController::class, 'downloadPdf'])->name('download');
        Route::patch('{requirement}/status', [RequirementController::class, 'updateStatus'])->name('update-status');
    });
    Route::resource('requirements', RequirementController::class);

    // --- Sales & Reports ---
    Route::prefix('reports')->name('reports.')->controller(ReportController::class)->group(function () {
        Route::get('follow-ups', 'followUps')->name('follow-ups');
        Route::get('sales', 'sales')->name('sales');
        Route::get('customers', 'customers')->name('customers');
    });

    Route::prefix('sales')->name('sales.')->controller(SaleController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('export', 'export')->name('export');
        Route::get('print', 'print')->name('print');
    });

    // --- Limited Resources ---
    // Combined these as they use the same 'only' restriction
    Route::resource('companies', CompanyController::class)->except(['show']);
    Route::resource('units', UnitController::class)->except(['show']);

    // --- Administration ---
    Route::middleware(['role:super_admin'])->group(function () {
        Route::resource('users', UserController::class);
    });
});

// Admin Command Utility (Use with caution!)
Route::get('/run-command/{command}', function ($command) {
    Artisan::call($command);
    return Artisan::output();
})->name('run-command.dynamic');

require __DIR__ . '/settings.php';
