import React from "react";
import useSWRInfinite from "swr/infinite";
import LoadingMaster from "@/components/Atom/LoadingMaster";

const getKey = (index: number) => {
  return `/api/posts?offset=${index * DEFAULT_PAGINATION.offset}&limit=${DEFAULT_PAGINATION.limit}`;
};

export default function Home() {
  const observer = React.useRef<any>(null);

  const { data, size, setSize, isLoading, isValidating } = useSWRInfinite(
    getKey,
    (url) => fetch(url).then((res) => res.json())
  );

  const sizeRef = React.useRef(size);

  const posts = React.useMemo(() => {
    const _data: any[] = data ? [].concat(...data) : [];
    return _data.map((el) => el?.data?.posts)?.flat?.();
  }, [data]);

  const lastItemRef = React.useCallback(
    (node: HTMLDivElement | undefined | null) => {
      if (isLoading) return;
      if (observer.current) observer.current?.disconnect?.();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const _size = sizeRef.current + 1;

          sizeRef.current = _size;
          setSize(_size);
        }
      });

      if (node) observer.current?.observe?.(node);
    },
    [isLoading, setSize]
  );

  return (
    <>
      {(isLoading || isValidating || !posts) && <LoadingMaster />}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {posts &&
          posts.map(({ id, title, body }) => (
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
          ))}
      </div>
    </>
  );
}

const DEFAULT_PAGINATION = {
  limit: 10,
  offset: 10,
};
