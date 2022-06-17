import { useEffect } from "react";
export function NotFound() {
  useEffect(() => {
    document.title = "Memories | Not Found";
  }, []);
  return <h1>error 404 Not Found</h1>;
}
