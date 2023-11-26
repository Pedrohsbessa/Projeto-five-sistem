<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;

class AlbumController extends Controller
{
    public function index()
    {
        return Album::all();
    }

    public function show($id)
    {
        return Album::find($id);
    }

    public function store(Request $request)
    {
        $album = Album::create($request->all());

        return response()->json($album, 201);
    }

    public function update(Request $request, Album $album)
    {
        $album->update($request->all());

        return response()->json($album, 200);
    }

    public function destroy(Album $album)
    {
        $album->delete();

        return response()->json(null, 204);
    }
}
