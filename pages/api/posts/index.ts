import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { offset = 0, limit = 10 } = req.query;
  const _limit = Number(limit);
  const _offset = Number(offset);

  const _data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const _posts = await _data.json();

  res.status(200).json({
    status: '200',
    message: 'Successful',
    data: {
      posts: _posts.slice(_offset, _limit + _offset),
      limit: _limit,
      offset: _offset,
      total: _posts.length,
    }
  });
};