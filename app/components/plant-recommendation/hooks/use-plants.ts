import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function usePlants(zone: number) {
  const { data, error, isLoading } = useSWR(
    zone ? `/api/trefle-request?hardiness_zone=${zone}` : null,
    fetcher
  );

  console.log('API Response:', data);

  return {
    plants: data?.data || [],
    isLoading,
    isError: error,
  };
}

export default usePlants;
