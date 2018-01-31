    <?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/posts', 'PostController@index');
Route::post('/posts', 'PostController@create');
Route::get('/posts/{postId}', 'PostController@show');
Route::post('/posts/{postId}/update', 'PostController@update');
Route::get('/posts/{postId}/delete', 'PostController@destroy');

Route::get('/comments', 'CommentController@index');
Route::post('/posts/{postId}/comments', 'CommentController@create');