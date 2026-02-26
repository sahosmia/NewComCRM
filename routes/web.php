<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\FollowUpController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\QuotationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    // // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // // Customers
    Route::resource('customers', CustomerController::class);
    // Route::post('customers/bulk-destroy', [CustomerController::class, 'bulkDestroy'])->name('customers.bulk-destroy');
    // Route::get('customers/export/excel', [CustomerController::class, 'export'])->name('customers.export');
    // Route::post('customers/import/excel', [CustomerController::class, 'import'])->name('customers.import');

    // // Products
    Route::resource('products', ProductController::class);

    // // Follow Ups
    // Route::resource('follow-ups', FollowUpController::class)->except(['create', 'edit']);
    // Route::post('follow-ups/{follow_up}/complete', [FollowUpController::class, 'complete'])->name('follow-ups.complete');

    // // Meetings
    // Route::resource('meetings', MeetingController::class);
    // Route::get('calendar/meetings', [MeetingController::class, 'calendar'])->name('meetings.calendar');

    // // Quotations
    // Route::resource('quotations', QuotationController::class);
    // Route::post('quotations/{quotation}/send', [QuotationController::class, 'send'])->name('quotations.send');
    // Route::get('quotations/{quotation}/download', [QuotationController::class, 'download'])->name('quotations.download');
    // Route::post('quotations/{quotation}/duplicate', [QuotationController::class, 'duplicate'])->name('quotations.duplicate');

    // // Users (Super Admin only)
    // Route::middleware(['role:super_admin'])->group(function () {
    //     Route::resource('users', UserController::class);
    // });

    // // Reports
    // Route::get('reports/follow-ups', [ReportController::class, 'followUps'])->name('reports.follow-ups');
    // Route::get('reports/sales', [ReportController::class, 'sales'])->name('reports.sales');
    // Route::get('reports/customers', [ReportController::class, 'customers'])->name('reports.customers');
});

require __DIR__.'/settings.php';
