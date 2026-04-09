<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(
        private UserService $userService,
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('users/index', ['users' =>$this->userService->paginateIndex()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('users/create', [
            'users' => $this->userService->usersForForm(),
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        $this->userService->create($request->validated());

        return redirect()->route('users.index')
            ->with('success', 'User created successfully');
    }


    public function edit(User $user)
    {
        return Inertia::render('users/edit', [
            'user' => $user,
            'users' => $this->userService->usersForForm(),
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
        $this->userService->delete($user);

        return back();
    }
}
