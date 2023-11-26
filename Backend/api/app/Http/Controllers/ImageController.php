<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function index($albumId)
    {
        return Image::where('album_id', $albumId)->get();
    }

    public function show($albumId, $imageId)
    {
        return Image::where('album_id', $albumId)->find($imageId);
    }

    public function store(Request $request, $albumId)
    {
        $request->validate([
            'url' => 'required',
        ]);

        $data = $request->all();
        $data['album_id'] = $albumId;

        $image = Image::create($data);

        return response()->json($image, 201);
    }

    public function update(Request $request, $albumId, $imageId)
    {
        $image = Image::find($imageId);

        if (!$image) {
            return response()->json(['message' => 'Imagem não encontrada'], 404);
        }

        if ($image->album_id != $albumId) {
            return response()->json(['message' => 'A imagem não pertence ao álbum especificado'], 400);
        }

        $image->update($request->all());

        return response()->json($image, 200);
    }

    public function destroy($albumId, $imageId)
    {
        $image = Image::where('album_id', $albumId)->find($imageId);

        if ($image) {
            $image->delete();

            return response()->json(null, 204);
        }

        return response()->json(['message' => 'Imagem não encontrada'], 404);
    }
}
