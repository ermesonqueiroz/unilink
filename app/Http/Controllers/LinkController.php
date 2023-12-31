<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateLinkRequest;
use App\Http\Requests\UpdateLinkRequest;
use App\Http\Resources\LinkResource;
use App\Models\Link;
use Illuminate\Http\Exceptions\HttpResponseException;

class LinkController extends Controller
{
    public static function index(string $userId)
    {
        $links = Link::where('userId', $userId)
            ->simplePaginate(10)
            ->items();

        return LinkResource::collection($links);
    }

    public static function create(CreateLinkRequest $request)
    {
        $link = new Link([
            'userId' => $request['userId'],
            'title' => $request['title'],
            'url' => $request['url'],
            'active' => true,
            'index' => $request['index']
        ]);

        $link->save();

        $linkResource = new LinkResource($link);

        return $linkResource->toArray($request);
    }

    public static function delete(string $id)
    {
        $link = Link::find($id)->delete();

        if (!$link) {
            throw new HttpResponseException(
                response()->json([
                    'error' => 'link not found'
                ], 400)
            );
        }

        return response()->json([], 200);
    }

    public static function update(string $id, UpdateLinkRequest $request)
    {
        $link = Link::find($id)->update([
            'title' => $request['title'],
            'url' => $request['url'],
            'active' => $request['active'],
            'index' => $request['index']
        ]);

        if (!$link) {
            throw new HttpResponseException(
                response()->json([
                    'error' => 'link not found'
                ], 400)
            );
        }

        return response()->json([], 200);
    }
}
