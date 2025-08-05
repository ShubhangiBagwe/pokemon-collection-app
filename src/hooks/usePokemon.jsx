import { useInfiniteQuery } from '@tanstack/react-query';

export const usePokemon = () => {
  return useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=6`);
      const data = await res.json();
      const detailed = await Promise.all(
        data.results.map((p) => fetch(p.url).then((res) => res.json()))
      );
      return detailed;
    },
    getNextPageParam: (lastPage, allPages) => allPages.length * 6,
  });
};
