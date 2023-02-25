import React from "react";
import { css } from "@emotion/css";
import { keyframes } from '@emotion/react';
import Image from 'next/image';

import LoadingSrc from '../public/Loading.svg';

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`

export function LoadingMaster() {
  return (
    <div
      className={css([
        {
          width: "100vw",
          height: "100vh",
          position: "fixed",
          zIndex: 10,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f2f2f2",
          opacity: 0.7,
          userSelect: "none",
          pointerEvents: "none",
        },
      ])}
    >
      <Image
        alt="loading..."
        src={LoadingSrc}
        className={css([
          {
            width: 36,
            height: 36,
            animation: `${rotate} .4s ease infinite`,
          },
        ])}
      />
    </div>
  );
};

export default function Home({ data = [] }) {
  const [list, setList] = React.useState<any[]>([...data]);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  const observer = React.useRef<any>(null);
  const pagination = React.useRef<{
    limit: number;
    total?: number;
    offset: number;
  }>(DEFAULT_PAGINATION);

  const fetchData = (
    {
      limit = DEFAULT_PAGINATION.limit,
      offset = DEFAULT_PAGINATION.offset,
    }: {
      limit: number | undefined;
      offset: number | undefined;
    }
  ) => {
    setTimeout(() => {
      fetch(
        `${process.env.NEXT_PUBLIC_API}/api/posts?limit=${limit}&offset=${offset}`
      )
        .then((res) => res.json())
        .then(({ data }) => {
          setList((list) => [...list, ...data?.posts]);

          pagination.current = {
            limit: data?.limit,
            total: data?.total,
            offset: data?.offset,
          };

          setLoading(false);
        });
    }, 2000);
  };

  React.useEffect(() => {
    setLoading(true);
    fetchData(DEFAULT_PAGINATION);
  }, []);

  const lastItemRef = React.useCallback(
    (node: HTMLDivElement | undefined | null) => {
      if (observer.current) if (loading) return;
      observer.current?.disconnect?.();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          const _offset = pagination.current.offset + 10;

          if (_offset <= (pagination.current.total || 0)) {
            setLoading(true);
            fetchData({ limit: 10, offset: pagination.current.offset + 10 });
          } else setHasMore(false);
        }
      });

      if (node) observer.current?.observe?.(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      {loading && (
        <LoadingMaster />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {list.map(({ id, title, body }, index) =>
          index === pagination.current?.total ? (
            <div
              key={id}
              style={{
                margin: 8,
                padding: 8,
                width: 500,
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                background: "#fff",
              }}
            >
              <h4>{title}</h4>
              <div>{body}</div>
            </div>
          ) : (
            <div
              key={id}
              ref={lastItemRef}
              style={{
                margin: 8,
                padding: 8,
                width: 500,
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                background: "#fff",
              }}
            >
              <h4>{title}</h4>
              <div>{body}</div>
            </div>
          )
        )}
      </div>
    </>
  );
}

const DEFAULT_PAGINATION = {
  limit: 10,
  offset: 0,
};