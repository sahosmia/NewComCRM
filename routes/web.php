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
    ReportController
};

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Redirect root to login using named route for better maintenance
Route::get('/', fn() => redirect()->route('login'))->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    // --- Dashboard ---
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // --- Customers ---
    Route::prefix('customers')->name('customers.')->controller(CustomerController::class)->group(function () {
        Route::delete('/bulk-destroy', 'bulkDestroy')->name('bulkDestroy');
        Route::get('/export/excel', 'export')->name('export');
        Route::post('/import/excel', 'import')->name('import');
    });
    Route::resource('customers', CustomerController::class);

    

    // --- Follow Ups ---
    // Define custom member routes BEFORE the resource
    Route::post('follow-ups/{follow_up}/complete', [FollowUpController::class, 'complete'])->name('follow-ups.complete');
    Route::resource('follow-ups', FollowUpController::class);

    // --- Meetings ---
    // Specifically defined before resource to avoid 'calendar' being treated as an {id}
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

    // --- Simple Resources ---
    // Grouping simple CRUD resources saves vertical space
    Route::resources([
        'products'     => ProductController::class,
        'requirements' => RequirementController::class,
    ]);

    // --- Administration ---
    Route::middleware(['role:super_admin'])->group(function () {
        Route::resource('users', UserController::class);
    });
});

require __DIR__.'/settings.php';
