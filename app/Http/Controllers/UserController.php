<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use App\Services\LookupService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(
        private UserService $userService,
        private LookupService $lookupService,
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('users/index', [
            'users' => $this->userService->paginateIndex($request->all()),
        ]);
    }

    public function create()
    {
        return Inertia::render('users/create', [
            'users' => $this->lookupService->getUsersForSelect(),
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        $this->userService->create($request->validated());

        return redirect()->route('users.index')
            ->with('success', 'User created successfully');
    }

    public function show(User $user)
    {
        return Inertia::render('Users/Show', [
            'user' => $user,
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('users/edit', [
            'user' => $user,
            'users' => $this->lookupService->getUsersForSelect(),
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $this->userService->update($user, $request->validated());

        return redirect()->route('users.index')
            ->with('success', 'User updated successfully');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return back()->with('success', 'User deleted successfully!');
    }

    public function bulkDestroy(Request $request)
    {
        $this->userService->bulkDelete($request->input('ids', []));

        return back()->with('success', 'Users deleted successfully');
    }
}
