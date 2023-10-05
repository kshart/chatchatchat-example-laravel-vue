<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function create(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'stage' => ['required'],
            'title' => ['required'],
        ]);
        $todo = new Todo($request->all());
        $todo->author_id = $user->id;
        $todo->is_private = !!$request->is_private;
        $todo->save();
        return $todo;
    }

    public function search(Request $request)
    {
        $paginator = Todo::simplePaginate((int) $request->limit)->toArray();
        $userIds = [];
        $meId = $request->user()->id;
        foreach ($paginator['data'] as &$todo) {
            $todo['can_edit'] = $todo['author_id'] === $meId;
            if (!in_array($todo['author_id'], $userIds)) {
                $userIds[] = $todo['author_id'];
            }
        }
        $paginator['users'] = User::whereIn('id', $userIds)->get();
        return $paginator;
    }

    public function update(Request $request, int $id)
    {
        $user = $request->user();
        $todo = Todo::find($id);
        if ($todo->author_id !== $user->id) {
            abort(403);
        }
        $todo->fill($request->all());
        $todo->save();

        return $todo;
    }
}
