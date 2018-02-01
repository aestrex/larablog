<?php

namespace App\Http\Controllers;

use DB;
use App\Post;
use App\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('posts')->orderBy('created_at', 'desc')->get();
    }

    public function show($postId)
    {
        $post = Post::find($postId);
        if ($post) 
        {
            $comments = Comment::where('post_id', $postId)->orderBy('created_at', 'desc')->get();

            return response()->json([
                'found' => 1,
                'post' => $post,
                'comments' => $comments
            ]);
        } else {
            return response()->json([
                'found' => 0,
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'body' => 'required'
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'saved' => 0,
                'message' => $validator->errors()
            ]);
        } else {
            $post = new Post();
            $post->title = $request->get('title');
            $post->body = $request->get('body');

            if ($post->save()) 
            {
                return response()->json([
                    'saved' => 1,
                    'post' => $post
                ]);
            }
        }
    }

    public function update(Request $request, $postId)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'body' => 'required'
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'updated' => 0,
                'message' => $validator->errors()
            ]);
        } else {
            $post = Post::find($postId);
            $post->title = $request->get('title');
            $post->body = $request->get('body');

            if ($post->save()) 
            {
                return response()->json([
                    'updated' => 1,
                    'post' => $post
                ]);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy($postId)
    {
        $post = Post::find($postId);

        if ($post->delete())
        {
            return response()->json([
                'deleted' => 1
            ]);
        }
    }
}