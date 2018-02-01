<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Comment;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Comment::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request, $postId)
    {
        $validator = Validator::make($request->all(), [
            'body' => 'required'
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'saved' => 0,
                'message' => $validator->errors()
            ]);
        } else {
            $post = Post::find($postId);

            $comment = new Comment();

            $comment->body = $request->get('body');

            // $comment->save();

            $post->comments()->save($comment);

            return response()->json([
                'saved' => 1,
                'post' => $post,
                'comments' => Comment::where('post_id', $postId)->orderBy('created_at', 'desc')->get()
            ]);
        }

        $post = Post::find($postId);

        if ($post)
        {
            $comment = new Comment();

        }
    }
}
